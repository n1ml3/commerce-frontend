import { useEffect, useState } from 'react';
import axios from '../api/axios';
import ProductCard, { type ProductType } from '../components/ProductCard';

export default function Home() {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Since we didn't specify endpoints in backend task, we assume GET /products returns an array
                const response = await axios.get('/products');
                setProducts(response.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('Failed to load products. Make sure your NestJS backend is running and has a GET /products endpoint.');
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-12 text-center">
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl mb-4">
                    Latest Arrivals
                </h1>
                <p className="max-w-2xl mx-auto text-xl text-gray-500">
                    Discover our newest collection of premium products, carefully selected for you.
                </p>
            </div>

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
