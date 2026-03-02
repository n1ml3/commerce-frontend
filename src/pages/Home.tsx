import { useEffect, useState } from 'react';
import axios from '../api/axios';
import ProductCard, { type ProductType } from '../components/ProductCard';

export default function Home() {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [categories, setCategories] = useState<{ _id: string, name: string }[]>([]);
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

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
                const url = activeCategory ? `/products?category=${activeCategory}` : '/products';
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
    }, [activeCategory]);

    if (loading && products.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl mb-4">
                    Sản phẩm Mới Nhất
                </h1>
                <p className="max-w-2xl mx-auto text-xl text-gray-500">
                    Khám phá bộ sưu tập sản phẩm cao cấp của chúng tôi.
                </p>
            </div>

            {categories.length > 0 && (
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    <button
                        onClick={() => setActiveCategory(null)}
                        className={`px-5 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${!activeCategory ? 'bg-primary-600 text-white shadow-md' : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'}`}
                    >
                        Tất cả
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat._id}
                            onClick={() => setActiveCategory(cat._id)}
                            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${activeCategory === cat._id ? 'bg-primary-600 text-white shadow-md' : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'}`}
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
                <div className="text-center text-gray-500 py-12 bg-white rounded-2xl border border-gray-100 shadow-sm">
                    No products found. Run the seeder in your backend!
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
