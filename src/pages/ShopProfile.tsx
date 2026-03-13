import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function ShopProfile() {
    const { id } = useParams<{ id: string }>();
    const [vendor, setVendor] = useState<any>(null);
    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        if(id) {
            fetchVendor();
            fetchVendorProducts();
        }
    }, [id]);

    const fetchVendor = async () => {
        try {
            const res = await fetch(`http://localhost:3000/users/${id}`);
            const data = await res.json();
            setVendor(data);
        } catch (e) { console.error(e); }
    };

    const fetchVendorProducts = async () => {
        try {
            const res = await fetch(`http://localhost:3000/products?vendor=${id}`);
            setProducts(await res.json());
        } catch (e) { console.error(e); }
    };

    if(!vendor) return <div className="p-8 text-center text-gray-500">Đang tải hồ sơ cửa hàng...</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            
            {/* Store Header */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 flex flex-col items-center text-center">
                <div className="h-24 w-24 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 text-3xl font-bold mb-4">
                    {(vendor.shopName || vendor.name).charAt(0)}
                </div>
                <h1 className="text-3xl font-extrabold text-gray-900">{vendor.shopName || `${vendor.name}'s Shop`}</h1>
                <p className="mt-2 text-gray-500 max-w-2xl mx-auto">{vendor.shopDescription || 'Chào mừng đến với cửa hàng của chúng tôi! Mua sắm vui vẻ nhé.'}</p>
                <div className="mt-4 flex gap-4 text-sm text-gray-500">
                    <span>Liên hệ: {vendor.email}</span>
                </div>
            </div>

            {/* Products Grid */}
            <div className="mt-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Sản phẩm từ cửa hàng này</h2>
                {products.length === 0 ? (
                    <p className="text-gray-500">Hiện chưa có sản phẩm nào từ người bán này.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <Link key={product._id} to={`/store/product/${product._id}`} className="group block bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
                                <div className="relative aspect-square">
                                    <div className="absolute inset-0 bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                                        {/* Minimalist placeholder for missing image */}
                                        <div className="text-gray-400 font-medium">Không có ảnh</div>
                                    </div>
                                    {product.images && product.images[0] && (
                                        <img
                                            src={product.images[0]}
                                            alt={product.name}
                                            className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                                        />
                                    )}
                                </div>
                                <div className="p-5">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-primary-600 transition-colors">
                                            {product.name}
                                        </h3>
                                    </div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="text-xl font-bold text-gray-900">${product.finalPrice}</span>
                                        {product.originalPrice > product.finalPrice && (
                                            <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
