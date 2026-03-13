import { Outlet, Link, useLocation } from 'react-router-dom';

const AdminLayout = () => {
    const location = useLocation();

    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white flex flex-col">
                <div className="p-6">
                    <h2 className="text-2xl font-bold tracking-tight">Cổng Quản Trị</h2>
                </div>
                <nav className="flex-1 px-4 space-y-2">
                    <Link
                        to="/admin"
                        className={`block px-4 py-2 rounded-md transition-colors ${location.pathname === '/admin' ? 'bg-primary-600 text-white' : 'text-gray-300 hover:bg-slate-800 hover:text-white'}`}
                    >
                        Bảng Điều Khiển
                    </Link>
                    <Link
                        to="/admin/products"
                        className={`block px-4 py-2 rounded-md transition-colors ${location.pathname === '/admin/products' ? 'bg-primary-600 text-white' : 'text-gray-300 hover:bg-slate-800 hover:text-white'}`}
                    >
                        Sản Phẩm
                    </Link>
                    <Link
                        to="/admin/users"
                        className={`block px-4 py-2 rounded-md transition-colors ${location.pathname === '/admin/users' ? 'bg-primary-600 text-white' : 'text-gray-300 hover:bg-slate-800 hover:text-white'}`}
                    >
                        Người Dùng
                    </Link>
                    <div className="pt-8">
                        <Link
                            to="/store"
                            className="block px-4 py-2 text-sm text-gray-400 rounded-md hover:bg-slate-800 hover:text-white transition-colors"
                        >
                            &larr; Quay Lại Cửa Hàng
                        </Link>
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
