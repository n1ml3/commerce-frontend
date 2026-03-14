import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export interface ProductType {
    _id: string;
    name: string;
    slug: string;
    description: string;
    originalPrice: number;
    finalPrice?: number;
    stockQuantity: number;
    images: string[];
    category: string;
    averageRating: number;
    attributes?: Record<string, string>;
}

interface ProductCardProps {
    product: ProductType;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart();
    const discount = product.finalPrice && product.originalPrice > product.finalPrice
        ? Math.round(((product.originalPrice - product.finalPrice) / product.originalPrice) * 100)
        : 0;

    return (
        <div className="group relative bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col h-full">
            <Link to={`/store/product/${product._id}`} className="relative aspect-square overflow-hidden bg-gray-100 flex-shrink-0 block">
                <img
                    src={product.images[0] || 'https://via.placeholder.com/400'}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {discount > 0 && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm">
                        -{discount}%
                    </div>
                )}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center shadow-sm">
                    <svg className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-xs font-bold text-gray-700">{product.averageRating || 'New'}</span>
                </div>
            </Link>

            <div className="p-5 flex flex-col flex-grow">
                {product.attributes?.Brand && (
                    <span className="text-[10px] font-extrabold text-primary-600 uppercase tracking-widest mb-1 block">
                        {product.attributes.Brand}
                    </span>
                )}
                <Link to={`/store/product/${product._id}`} className="text-lg font-bold text-gray-900 mb-1 line-clamp-1 group-hover:text-primary-600 transition-colors">
                    {product.name}
                </Link>
                <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-grow">
                    {product.description}
                </p>

                <div className="flex items-center justify-between mt-auto">
                    <div className="flex flex-col">
                        {product.finalPrice ? (
                            <>
                                <span className="text-lg font-bold text-gray-900">{product.finalPrice.toLocaleString('vi-VN')} ₫</span>
                                <span className="text-sm text-gray-400 line-through">{product.originalPrice.toLocaleString('vi-VN')} ₫</span>
                            </>
                        ) : (
                            <span className="text-lg font-bold text-gray-900">{product.originalPrice.toLocaleString('vi-VN')} ₫</span>
                        )}
                    </div>

                    <button
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToCart(product._id); }}
                        className="bg-primary-50 hover:bg-primary-600 text-primary-600 hover:text-white p-2.5 rounded-xl transition-colors shrink-0 cursor-pointer"
                        title="Thêm vào giỏ"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
