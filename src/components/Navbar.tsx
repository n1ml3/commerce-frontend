import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="text-2xl font-bold text-primary-600 tracking-tight">
                            CHỢ GIỜI NAM LÊ.
                        </Link>
                    </div>
                    <div className="flex items-center space-x-6">
                        <Link to="/" className="text-gray-600 hover:text-primary-600 transition-colors">Sản phẩm</Link>
                        <div className="relative cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 hover:text-primary-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            <span className="absolute -top-2 -right-2 bg-primary-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                                0
                            </span>
                        </div>
                        <button className="bg-primary-600 hover:bg-primary-700 text-white px-5 py-2 rounded-full font-medium transition-colors shadow-sm cursor-pointer">
                            Sign In
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
