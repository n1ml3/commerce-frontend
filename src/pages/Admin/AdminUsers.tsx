import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export default function AdminUsers() {
    const [users, setUsers] = useState<any[]>([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formData, setFormData] = useState<any>({ name: '', email: '', role: 'user', password: '' });
    const [editingId, setEditingId] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await fetch(`${API_URL}/users`);
            const data = await res.json();
            setUsers(data);
        } catch (error) {
            console.error('Failed to fetch users', error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Bạn có chắc muốn xóa người dùng này?')) return;
        try {
            // Include Authorization header if needed, assuming admin is logged in
            const token = localStorage.getItem('token');
            await fetch(`${API_URL}/users/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            fetchUsers();
        } catch (error) {
            console.error('Failed to delete user', error);
        }
    };

    const handleEdit = (user: any) => {
        setFormData({ name: user.name, email: user.email, role: user.role, password: '' });
        setEditingId(user._id);
        setIsFormOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const url = editingId ? `${API_URL}/users/${editingId}` : `${API_URL}/auth/register`;
        const method = editingId ? 'PUT' : 'POST';

        const payload = { ...formData };
        if (!payload.password) delete payload.password; // don't send empty pass on edit

        try {
            await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });
            setIsFormOpen(false);
            setEditingId(null);
            fetchUsers();
        } catch (error) {
            console.error('Failed to save user', error);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Quản Lý Người Dùng</h1>
                <button 
                    onClick={() => { setFormData({ name: '', email: '', role: 'user', password: '' }); setEditingId(null); setIsFormOpen(true); }}
                    className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md font-medium transition-colors shadow-sm"
                >
                    Thêm Người Dùng
                </button>
            </div>

            <div className="mb-6 flex flex-col sm:flex-row gap-4">
                <input 
                    type="text" 
                    placeholder="Tìm kiếm theo tên hoặc email..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-md shadow-sm p-2"
                />
                <select 
                    value={roleFilter} 
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="w-full sm:w-48 border border-gray-300 rounded-md shadow-sm p-2"
                >
                    <option value="all">Tất cả vai trò</option>
                    <option value="admin">Quản trị (Admin)</option>
                    <option value="vendor">Cửa hàng (Vendor)</option>
                    <option value="user">Người dùng (User)</option>
                </select>
            </div>

            {isFormOpen && (
                <div className="mb-8 bg-white p-6 rounded-lg shadow border border-gray-200">
                    <h2 className="text-xl font-bold mb-4">{editingId ? 'Sửa Người Dùng' : 'Thêm Người Dùng'}</h2>
                    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Tên</label>
                            <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Mật Khẩu {!editingId && '*'}</label>
                            <input type="password" required={!editingId} value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Vai Trò</label>
                            <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                                <option value="user">Người dùng (User)</option>
                                <option value="vendor">Cửa hàng (Vendor)</option>
                                <option value="admin">Quản trị (Admin)</option>
                            </select>
                        </div>
                        <div className="flex space-x-4">
                            <button type="submit" className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700">Lưu</button>
                            <button type="button" onClick={() => setIsFormOpen(false)} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300">Hủy</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên / Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vai Trò</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Hành Động</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.filter(user => {
                            const matchSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase());
                            const matchRole = roleFilter === 'all' || user.role === roleFilter;
                            return matchSearch && matchRole;
                        }).map((user: any) => (
                            <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                    <div className="text-sm text-gray-500">{user.email}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'admin' ? 'bg-red-100 text-red-800' : user.role === 'vendor' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => handleEdit(user)} className="text-primary-600 hover:text-primary-900 mr-4">Sửa</button>
                                    <button onClick={() => handleDelete(user._id)} className="text-red-600 hover:text-red-900">Xóa</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
