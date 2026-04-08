import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from '../api/axios';
import ProductCard, { type ProductType } from '../components/ProductCard';
import MetroLoader from '../components/MetroLoader';

export default function Home() {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [categories, setCategories] = useState<{ _id: string, name: string }[]>([]);
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('search');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/categories');
                setCategories(response.data);
            } catch (err) {
                console.error('Failed to load categories', err);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                let url = activeCategory ? `/products?category=${activeCategory}` : '/products';
                if (searchQuery) {
                    url += activeCategory ? `&search=${encodeURIComponent(searchQuery)}` : `?search=${encodeURIComponent(searchQuery)}`;
                }
                const response = await axios.get(url);
                setProducts(response.data);
                setError('');
            } catch (err) {
                console.error(err);
                setError('Kết nối máy chủ bị lỗi. Hãy chắc chắn Backend của bạn đang chạy ở cổng 3000!');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [activeCategory, searchQuery]);

    if (loading && products.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <MetroLoader />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
            {/* Hero Section */}
            <div className="relative bg-slate-900 overflow-hidden mb-6 sm:mb-12 shadow-2xl border-b-4 border-primary-600">
                <div 
                   className="absolute inset-x-0 top-0 bottom-0 bg-cover bg-center opacity-30 sm:opacity-40" 
                   style={{ backgroundImage: `url('https://images.unsplash.com/photo-1550009158-9effb64fda70?q=80&w=2000&auto=format&fit=crop')` }}
                ></div>
                <div className="relative px-4 py-10 sm:px-16 sm:py-24 flex flex-col items-center text-center">
                    <h1 className="text-2xl font-black text-white tracking-tighter sm:text-6xl mb-3 sm:mb-6 drop-shadow-2xl uppercase italic">
                        Thế Giới Công Nghệ
                    </h1>
                    <p className="max-w-xs sm:max-w-xl mx-auto text-sm sm:text-xl text-gray-200 mb-6 sm:mb-8 font-medium drop-shadow-md leading-relaxed">
                        Nơi hội tụ những siêu phẩm điện tử <br className="sm:hidden" /> với giá cực hời.
                    </p>
                    <button 
                        onClick={() => window.scrollTo({ top: document.querySelector('.grid')?.getBoundingClientRect().top! + window.scrollY - 100, behavior: 'smooth' })}
                        className="bg-primary-600 text-white font-bold px-6 py-3 sm:px-8 sm:py-3 hover:bg-primary-700 transition-all shadow-lg transform hover:-translate-y-1 cursor-pointer"
                    >
                        Khám Phá Ngay
                    </button>
                </div>
            </div>

            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                    {searchQuery ? `Kết quả tìm kiếm cho "${searchQuery}"` : 'Sản phẩm nổi bật'}
                </h2>
            </div>

            {categories.length > 0 && (
                <div className="flex overflow-x-auto pb-4 mb-8 gap-3 hide-scrollbar snap-x">
                    <button
                        onClick={() => setActiveCategory(null)}
                        className={`snap-center shrink-0 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer ${!activeCategory ? 'bg-primary-600 text-white shadow-md transform scale-105' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-gray-300'}`}
                    >
                        Tất cả
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat._id}
                            onClick={() => setActiveCategory(cat._id)}
                            className={`snap-center shrink-0 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer ${activeCategory === cat._id ? 'bg-primary-600 text-white shadow-md transform scale-105' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-gray-300'}`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
            )}

            {error ? (
                <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg text-center max-w-2xl mx-auto">
                    {error}
                </div>
            ) : products.length === 0 ? (
                <div className="text-center text-gray-500 py-12 bg-white shadow-md rounded-lg">
                    Không tìm thấy sản phẩm nào. Vui lòng chạy seeder ở Backend!
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
}
