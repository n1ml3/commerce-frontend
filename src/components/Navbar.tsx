import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
    const { user, isAuthenticated, logout } = useAuth();
    const { totalItems } = useCart();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="bg-primary-600 shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center gap-6">
                    {/* Brand */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/store" className="text-3xl font-extrabold text-white tracking-tight">
                            CHỢ GIỜI<br />NAM LÊ.
                        </Link>
                    </div>
                    
                    {/* Search Bar (Shopee style) */}
                    <div className="flex-1 max-w-2xl px-4 hidden sm:flex">
                        <div className="relative w-full flex">
                            <input 
                                type="text"
                                placeholder="Tìm kiếm sản phẩm, thương hiệu và hơn thế nữa..."
                                className="w-full px-4 py-3 bg-white text-gray-900 border-none outline-none focus:ring-0 placeholder-gray-500"
                            />
                            <button className="bg-primary-700 hover:bg-primary-800 text-white px-6 py-3 font-medium flex items-center justify-center transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Navigation Links and Cart */}
                    <div className="flex items-center space-x-6 text-white text-sm font-medium">
                        <Link to="/store" className="hover:text-primary-100 transition-colors hidden md:block">Gian Hàng</Link>
                        
                        <Link to="/cart" className="relative cursor-pointer group flex items-center">
                            <div className="p-2 hover:bg-primary-700 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                {totalItems > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-white text-primary-600 text-xs font-bold px-1.5 py-0.5 rounded-full border-2 border-primary-600">
                                        {totalItems}
                                    </span>
                                )}
                            </div>
                        </Link>

                        {isAuthenticated ? (
                            <div className="flex items-center space-x-4">
                                <span className="hidden lg:block">Chào, {user?.name}</span>
                                {user?.role === 'admin' && (
                                    <Link to="/admin" className="bg-metro-orange text-white hover:bg-yellow-600 text-xs font-bold px-3 py-2 transition-colors cursor-pointer">
                                        Admin
                                    </Link>
                                )}
                                <button
                                    onClick={handleLogout}
                                    className="bg-primary-700 hover:bg-primary-800 text-white px-4 py-2 font-medium transition-colors text-sm cursor-pointer"
                                >
                                    Đăng xuất
                                </button>
                            </div>
                        ) : (
                            <Link to="/login" className="bg-white hover:bg-gray-100 text-primary-600 px-5 py-2 font-semibold transition-colors shadow-sm cursor-pointer border border-transparent">
                                Đăng nhập
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
