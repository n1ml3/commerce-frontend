import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

const AdminLayout = () => {
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen flex bg-gray-100 overflow-hidden">
            {/* Mobile Sidebar Toggle */}
            <button 
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden fixed bottom-6 right-6 z-50 bg-primary-600 text-white p-4 shadow-2xl active:scale-95 transition-transform"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            {/* Sidebar Overlay */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm transition-opacity"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 w-72 bg-slate-900 text-white flex flex-col z-50 transform transition-transform duration-300 lg:relative lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-8 flex justify-between items-center">
                    <h2 className="text-2xl font-black tracking-tighter uppercase italic text-primary-500">
                        Admin<span className="text-white">Panel</span>
                    </h2>
                    <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                
                <nav className="flex-1 px-4 space-y-1">
                    <Link
                        to="/admin"
                        onClick={() => setIsSidebarOpen(false)}
                        className={`group flex items-center px-4 py-3 text-sm font-bold transition-all border-l-4 ${location.pathname === '/admin' ? 'bg-primary-600/10 border-primary-600 text-primary-500' : 'border-transparent text-gray-400 hover:bg-slate-800 hover:text-white'}`}
                    >
                        BẢNG ĐIỀU KHIỂN
                    </Link>
                    <Link
                        to="/admin/products"
                        onClick={() => setIsSidebarOpen(false)}
                        className={`group flex items-center px-4 py-3 text-sm font-bold transition-all border-l-4 ${location.pathname === '/admin/products' ? 'bg-primary-600/10 border-primary-600 text-primary-500' : 'border-transparent text-gray-400 hover:bg-slate-800 hover:text-white'}`}
                    >
                        QUẢN LÝ SẢN PHẨM
                    </Link>
                    <Link
                        to="/admin/users"
                        onClick={() => setIsSidebarOpen(false)}
                        className={`group flex items-center px-4 py-3 text-sm font-bold transition-all border-l-4 ${location.pathname === '/admin/users' ? 'bg-primary-600/10 border-primary-600 text-primary-500' : 'border-transparent text-gray-400 hover:bg-slate-800 hover:text-white'}`}
                    >
                        NGƯỜI DÙNG
                    </Link>
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <Link
                        to="/store"
                        className="flex items-center justify-center gap-2 px-4 py-3 text-xs font-bold text-gray-500 hover:text-white transition-colors uppercase tracking-widest"
                    >
                        <span>&larr;</span> Quay Lại Cửa Hàng
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 h-screen overflow-y-auto bg-gray-50">
                <div className="p-4 sm:p-8 lg:p-12 max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
