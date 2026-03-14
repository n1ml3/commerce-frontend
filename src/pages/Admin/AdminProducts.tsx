import { useState, useEffect } from 'react';

export default function AdminProducts() {
    const [products, setProducts] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [vendors, setVendors] = useState<any[]>([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formData, setFormData] = useState<any>({ name: '', description: '', originalPrice: 0, finalPrice: 0, stockQuantity: 0, category: '', vendor: '' });
    const [editingId, setEditingId] = useState<string | null>(null);

    useEffect(() => {
        fetchProducts();
        fetchCategories();
        fetchVendors();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await fetch('http://localhost:3000/products');
            setProducts(await res.json());
        } catch (e) { console.error(e); }
    };

    const fetchCategories = async () => {
        try {
            const res = await fetch('http://localhost:3000/categories');
            setCategories(await res.json());
        } catch (e) { console.error(e); }
    };

    const fetchVendors = async () => {
        try {
            const res = await fetch('http://localhost:3000/users');
            const data = await res.json();
            setVendors(Array.isArray(data) ? data.filter((u: any) => u.role === 'vendor' || u.role === 'admin') : []);
        } catch (e) { console.error(e); }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Bạn có chắc muốn xóa sản phẩm này?')) return;
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/products/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) {
                const data = await response.json();
                alert(`Xoá thất bại: ${data.message || 'Lỗi không xác định'}`);
                return;
            }
            fetchProducts();
        } catch (error) { console.error(error); }
    };

    const handleEdit = (prod: any) => {
        setFormData({
            name: prod.name || '',
            description: prod.description || '',
            originalPrice: prod.originalPrice || 0,
            finalPrice: prod.finalPrice || 0,
            stockQuantity: prod.stockQuantity || 0,
            category: prod.category?._id || prod.category || '',
            vendor: prod.vendor?._id || prod.vendor || ''
        });
        setEditingId(prod._id);
        setIsFormOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const url = editingId ? `http://localhost:3000/products/${editingId}` : 'http://localhost:3000/products';
        const method = editingId ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({...formData, slug: formData.name.toLowerCase().replace(/ /g, '-') + '-' + Date.now()})
            });
            
            if (!response.ok) {
                const data = await response.json();
                alert(`Lưu thất bại: ${data.message || 'Lỗi không xác định'}`);
                return;
            }
            
            setIsFormOpen(false);
            setEditingId(null);
            fetchProducts();
        } catch (error) { console.error(error); }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Quản Lý Sản Phẩm</h1>
                <button 
                    onClick={() => { setFormData({ name: '', description: '', originalPrice: 0, finalPrice: 0, stockQuantity: 0, category: '', vendor: '' }); setEditingId(null); setIsFormOpen(true); }}
                    className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md font-medium transition-colors shadow-sm"
                >
                    Thêm Sản Phẩm Mới
                </button>
            </div>

            {isFormOpen && (
                <div className="mb-8 bg-white p-6 rounded-lg shadow border border-gray-200">
                    <h2 className="text-xl font-bold mb-4">{editingId ? 'Sửa Sản Phẩm' : 'Thêm Sản Phẩm Mới'}</h2>
                    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Tên Sản Phẩm</label>
                                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Mô tả</label>
                                <textarea rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Giá Gốc</label>
                                <input required type="number" step="0.01" value={formData.originalPrice} onChange={e => setFormData({...formData, originalPrice: parseFloat(e.target.value)})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Giá Bán</label>
                                <input required type="number" step="0.01" value={formData.finalPrice} onChange={e => setFormData({...formData, finalPrice: parseFloat(e.target.value)})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Tồn kho</label>
                                <input required type="number" value={formData.stockQuantity} onChange={e => setFormData({...formData, stockQuantity: parseInt(e.target.value, 10)})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Danh Mục</label>
                                <select required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                                    <option value="">Chọn Danh Mục...</option>
                                    {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Cửa Hàng</label>
                                <select required value={formData.vendor} onChange={e => setFormData({...formData, vendor: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                                    <option value="">Chọn Cửa Hàng...</option>
                                    {vendors.map(v => <option key={v._id} value={v._id}>{v.name} ({v.shopName || 'Chưa có tên CH'})</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="flex space-x-4 pt-4">
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
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thông Tin Sản Phẩm</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giá</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tồn Kho</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Hành Động</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {products.map((prod: any) => (
                            <tr key={prod._id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="text-sm font-medium text-gray-900">{prod.name}</div>
                                    <div className="text-sm text-gray-500 line-clamp-1">{prod.description}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(prod.finalPrice || prod.originalPrice || 0).toLocaleString('vi-VN')} ₫</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                      {prod.stockQuantity}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => handleEdit(prod)} className="text-primary-600 hover:text-primary-900 mr-4">Sửa</button>
                                    <button onClick={() => handleDelete(prod._id)} className="text-red-600 hover:text-red-900">Xóa</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
