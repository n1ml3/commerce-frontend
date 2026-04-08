import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useState, useEffect } from 'react';
import axios from '../api/axios';

export default function Navbar() {
    const { user, isAuthenticated, logout } = useAuth();
    const { totalItems } = useCart();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        if (searchTerm.trim().length > 1) {
            const timeoutId = setTimeout(() => {
                axios.get(`/products?search=${encodeURIComponent(searchTerm.trim())}`)
                    .then(res => setSuggestions(res.data.slice(0, 5)))
                    .catch(err => console.error(err));
            }, 300);
            return () => clearTimeout(timeoutId);
        } else {
            setSuggestions([]);
        }
    }, [searchTerm]);

    const handleLogout = () => {
        logout();
        setIsMenuOpen(false);
        navigate('/');
    };

    const handleSearch = () => {
        if (searchTerm.trim()) {
            navigate(`/store?search=${encodeURIComponent(searchTerm.trim())}`);
        } else {
            navigate(`/store`);
        }
        setShowSuggestions(false);
    };

    return (
        <nav className="bg-primary-600 shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 sm:h-20 items-center gap-4">
                    {/* Brand */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/store" className="text-lg sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight drop-shadow-md">
                            <span className="block sm:hidden">CJNL.</span>
                            <span className="hidden sm:block">CHỢ GIỜI<br className="hidden md:block" /> NAM LÊ.</span>
                        </Link>
                    </div>
                    
                    {/* Search Bar (Hidden on Mobile) */}
                    <div className="flex-1 max-w-2xl px-4 hidden sm:flex">
                        <div className="relative w-full flex">
                            <input 
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                onFocus={() => setShowSuggestions(true)}
                                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                                placeholder="Tìm kiếm sản phẩm..."
                                className="w-full px-4 py-2 bg-white text-gray-900 border-none outline-none focus:ring-0 placeholder-gray-500"
                            />
                            <button onClick={handleSearch} className="bg-primary-700 hover:bg-primary-800 text-white px-4 py-2 transition-colors cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                            
                            {/* Autocomplete Dropdown */}
                            {showSuggestions && suggestions.length > 0 && (
                                 <div className="absolute top-full left-0 w-full bg-white text-gray-900 mt-1 shadow-xl z-50 border border-gray-100 divide-y divide-gray-50">
                                      {suggestions.map(s => (
                                          <div key={s._id} className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center gap-3 transition-colors" onClick={() => { setShowSuggestions(false); navigate(`/store/product/${s._id}`); setSearchTerm(''); }}>
                                              <img src={s.images[0]} className="w-10 h-10 object-cover rounded bg-gray-100" alt={s.name} />
                                              <div>
                                                  <p className="text-sm font-bold line-clamp-1">{s.name}</p>
                                                  <p className="text-xs text-primary-600 font-medium">{s.finalPrice ? s.finalPrice.toLocaleString('vi-VN') : s.originalPrice.toLocaleString('vi-VN')} ₫</p>
                                              </div>
                                          </div>
                                      ))}
                                 </div>
                            )}
                        </div>
                    </div>

                    {/* Desktop Actions and Mobile Menu Button */}
                    <div className="flex items-center space-x-2 sm:space-x-6">
                        {/* Cart (Always visible) */}
                        <Link to="/cart" className="relative p-2 text-white hover:bg-primary-700 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-7 sm:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            {totalItems > 0 && (
                                <span className="absolute top-0 right-0 bg-white text-primary-600 text-[10px] sm:text-xs font-bold px-1.5 py-0.5 border-2 border-primary-600">
                                    {totalItems}
                                </span>
                            )}
                        </Link>

                        {/* Desktop Links */}
                        <div className="hidden md:flex items-center space-x-6 text-white text-sm font-medium">
                            <Link to="/store" className="hover:text-primary-100 transition-colors">Gian Hàng</Link>
                            {isAuthenticated ? (
                                <div className="flex items-center space-x-4">
                                    <span className="hidden lg:block text-xs opacity-90">Chào, {user?.name}</span>
                                    {user?.role === 'admin' && (
                                        <Link to="/admin" className="bg-metro-orange text-white hover:bg-yellow-600 text-xs font-bold px-3 py-2 transition-colors">
                                            Admin
                                        </Link>
                                    )}
                                    <button onClick={handleLogout} className="bg-primary-700 hover:bg-primary-800 text-white px-4 py-2 font-medium transition-colors text-sm cursor-pointer border border-primary-500">
                                        Đăng xuất
                                    </button>
                                </div>
                            ) : (
                                <Link to="/login" className="bg-white hover:bg-gray-100 text-primary-600 px-5 py-2 font-semibold transition-colors shadow-sm">
                                    Đăng nhập
                                </Link>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button 
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 text-white hover:bg-primary-700 transition-colors focus:outline-none"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="md:hidden bg-primary-700 border-t border-primary-500 shadow-2xl animate-in slide-in-from-top-4 duration-200">
                    <div className="px-4 pt-2 pb-6 space-y-2">
                        {/* Search on Mobile */}
                        <div className="py-2">
                            <div className="relative flex">
                                <input 
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                    placeholder="Tìm kiếm..."
                                    className="w-full px-4 py-2 bg-white/10 text-white border border-white/20 outline-none focus:bg-white/20 placeholder-white/60"
                                />
                                <button onClick={handleSearch} className="bg-white/20 text-white px-4 py-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <Link 
                            to="/store" 
                            className="block px-4 py-3 text-white font-bold hover:bg-primary-600 transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Gian Hàng
                        </Link>
                        
                        {isAuthenticated ? (
                            <div className="space-y-2 pt-2 border-t border-primary-600">
                                <div className="px-4 py-2 text-white/80 text-sm italic">Chào, {user?.name}</div>
                                {user?.role === 'admin' && (
                                    <Link 
                                        to="/admin" 
                                        className="block px-4 py-3 bg-metro-orange text-white font-bold"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Admin Dashboard
                                    </Link>
                                )}
                                <button 
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-3 text-white font-bold hover:bg-red-600 transition-colors"
                                >
                                    Đăng xuất
                                </button>
                            </div>
                        ) : (
                            <Link 
                                to="/login" 
                                className="block px-4 py-3 bg-white text-primary-700 font-bold text-center"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Đăng nhập
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}

