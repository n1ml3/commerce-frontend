import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export default function ProductDetail() {
    const { id } = useParams<{ id: string }>();
    const { addToCart } = useCart();
    const { user } = useAuth();
    
    const [product, setProduct] = useState<any>(null);
    const [reviews, setReviews] = useState<any[]>([]);
    const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' });
    const [hoverRating, setHoverRating] = useState(0);

    useEffect(() => {
        if(id) {
            fetchProduct();
            fetchReviews();
        }
    }, [id]);

    const fetchProduct = async () => {
        try {
            const res = await fetch(`${API_URL}/products/${id}`);
            setProduct(await res.json());
        } catch (e) { console.error(e); }
    };

    const fetchReviews = async () => {
        try {
            const res = await fetch(`${API_URL}/reviews?productId=${id}`);
            setReviews(await res.json());
        } catch (e) { console.error(e); }
    };

    const handleAddToCart = () => {
        if(product) {
            addToCart(product._id);
            alert('Đã thêm vào giỏ hàng!');
        }
    };

    const handleToggleLike = async (isDislike = false) => {
        if(!user) return alert('Vui lòng đăng nhập trước');
        const token = localStorage.getItem('token');
        const endpoint = isDislike ? 'dislike' : 'like';
        try {
            await fetch(`${API_URL}/products/${id}/${endpoint}`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            fetchProduct();
        } catch(e) { console.error(e); }
    };

    const submitReview = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!user) return alert('Vui lòng đăng nhập để đánh giá');
        const token = localStorage.getItem('token');
        try {
            await fetch(`${API_URL}/reviews`, {
                method: 'POST',
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({ productId: id, ...reviewForm })
            });
            setReviewForm({ rating: 5, comment: '' });
            fetchReviews();
            fetchProduct(); // maybe averageRating updated
        } catch(e) { console.error(e); }
    };

    if(!product) return <div className="p-8 text-center text-gray-500">Đang tải...</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="md:flex">
                    <div className="md:flex-shrink-0 bg-gray-50 md:w-1/2 flex items-center justify-center p-12">
                        {product.images && product.images.length > 0 ? (
                            <img src={product.images[0]} alt={product.name} className="object-cover h-full w-full rounded-md" />
                        ) : (
                            <div className="text-gray-400">Không có ảnh</div>
                        )}
                    </div>
                    <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center">
                        {product.vendor && (
                            <Link to={`/shop/${product.vendor._id}`} className="text-sm font-semibold text-primary-600 tracking-wide uppercase mb-2 hover:underline">
                                Cửa Hàng: {product.vendor.shopName || product.vendor.name}
                            </Link>
                        )}
                        <h1 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            {product.name}
                        </h1>
                        <div className="mt-4 flex items-center gap-4">
                            <span className="text-3xl font-bold text-gray-900">{product.finalPrice.toLocaleString('vi-VN')} ₫</span>
                            {product.originalPrice > product.finalPrice && (
                                <span className="text-xl text-gray-500 line-through">{product.originalPrice.toLocaleString('vi-VN')} ₫</span>
                            )}
                        </div>
                        <p className="mt-4 text-gray-500 leading-relaxed">
                            {product.description}
                        </p>
                        
                        <div className="mt-6 flex space-x-4 items-center">
                            <button onClick={handleAddToCart} className="flex-1 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-md font-medium transition-colors">
                                Thêm vào Giỏ hàng
                            </button>
                            <button onClick={() => handleToggleLike(false)} className="text-gray-500 hover:text-green-600 px-4 py-2 border rounded-md">
                                👍 {product.likes?.length || 0}
                            </button>
                            <button onClick={() => handleToggleLike(true)} className="text-gray-500 hover:text-red-600 px-4 py-2 border rounded-md">
                                👎 {product.dislikes?.length || 0}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
                
                {user && (
                    <form onSubmit={submitReview} className="mb-8 bg-white p-6 rounded-lg shadow-md max-w-4xl">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Đánh giá sản phẩm</h3>
                        
                        <div className="flex flex-col md:flex-row gap-8 mb-6">
                            <div className="flex-1">
                                <label className="block text-sm font-semibold text-gray-700 mb-3">Đánh giá của bạn</label>
                                <div className="flex items-center space-x-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                                            onMouseEnter={() => setHoverRating(star)}
                                            onMouseLeave={() => setHoverRating(0)}
                                            className="focus:outline-none transition-transform hover:scale-110 cursor-pointer"
                                        >
                                            <svg
                                                className={`w-10 h-10 ${
                                                    star <= (hoverRating || reviewForm.rating)
                                                        ? 'text-yellow-400 drop-shadow-sm'
                                                        : 'text-gray-200'
                                                } transition-colors duration-200`}
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        </button>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="flex-1">
                                <label className="block text-sm font-semibold text-gray-700 mb-3">Bình luận</label>
                                <textarea 
                                    value={reviewForm.comment} 
                                    onChange={e => setReviewForm({...reviewForm, comment: e.target.value})} 
                                    className="block w-full border border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow outline-none resize-y" 
                                    rows={4}
                                    placeholder="Xin mời chia sẻ cảm nhận về sản phẩm..."
                                ></textarea>
                            </div>
                        </div>
                        
                        <div className="flex justify-end">
                            <button type="submit" className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-xl font-bold transition-colors cursor-pointer shadow-sm">Gửi Đánh Giá</button>
                        </div>
                    </form>
                )}

                <div className="space-y-6">
                    {reviews.length === 0 ? (
                        <p className="text-gray-500">Chưa có đánh giá nào.</p>
                    ) : (
                        reviews.map(review => (
                            <div key={review._id} className="bg-white p-6 rounded-lg shadow-md">
                                <div className="flex items-center mb-2">
                                    <span className="font-semibold mr-2">{review.user?.name || 'Khách Vô Danh'}</span>
                                    <span className="text-yellow-500">{'★'.repeat(review.rating)}{'☆'.repeat(5-review.rating)}</span>
                                </div>
                                <p className="text-gray-700">{review.comment}</p>
                                <span className="text-xs text-gray-400 mt-2 block">{new Date(review.createdAt).toLocaleDateString()}</span>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
