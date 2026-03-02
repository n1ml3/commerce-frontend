import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Cart() {
    const { items, updateQuantity, removeFromCart, totalPrice } = useCart();
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Giỏ Hàng</h1>
                <p className="text-gray-500 mb-6">Bạn phải đăng nhập để xem giỏ hàng.</p>
                <Link to="/login" className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-full font-medium transition-colors cursor-pointer">
                    Đăng Nhập Ngay
                </Link>
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Giỏ Hàng</h1>
                <p className="text-gray-500 mb-6">Giỏ hàng của bạn đang trống.</p>
                <Link to="/" className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-full font-medium transition-colors cursor-pointer">
                    Tiếp Tục Mua Sắm
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Giỏ Hàng Của Bạn</h1>
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-2/3">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-100">
                        {items.map((item) => (
                            <div key={item.product._id} className="p-6 flex items-center flex-col sm:flex-row gap-6">
                                <img
                                    src={item.product.images[0] || 'https://via.placeholder.com/150'}
                                    alt={item.product.name}
                                    className="w-24 h-24 object-cover rounded-xl bg-gray-50"
                                />
                                <div className="flex-1 text-center sm:text-left">
                                    <h3 className="text-lg font-bold text-gray-900">{item.product.name}</h3>
                                    <p className="text-primary-600 font-medium">${item.price.toFixed(2)}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200">
                                        <button
                                            onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                                            className="px-3 py-1 hover:bg-gray-100 rounded-l-lg transition-colors cursor-pointer"
                                        >
                                            -
                                        </button>
                                        <span className="px-4 font-medium text-gray-700">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                                            className="px-3 py-1 hover:bg-gray-100 rounded-r-lg transition-colors cursor-pointer"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.product._id)}
                                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                        title="Xoá"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="lg:w-1/3">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Tóm Tắt Đơn Hàng</h2>
                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between text-gray-600">
                                <span>Tạm tính</span>
                                <span>${totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Phí vận chuyển</span>
                                <span>Miễn phí</span>
                            </div>
                            <div className="border-t border-gray-100 pt-4 flex justify-between items-center text-lg font-bold text-gray-900">
                                <span>Tổng cộng</span>
                                <span className="text-primary-600">${totalPrice.toFixed(2)}</span>
                            </div>
                        </div>
                        <button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-full font-bold transition-colors shadow-sm cursor-pointer">
                            Tiến Hành Thanh Toán
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
