import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function ProductDetail() {
    const { id } = useParams<{ id: string }>();
    const { addToCart } = useCart();
    const { user } = useAuth();
    
    const [product, setProduct] = useState<any>(null);
    const [reviews, setReviews] = useState<any[]>([]);
    const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' });

    useEffect(() => {
        if(id) {
            fetchProduct();
            fetchReviews();
        }
    }, [id]);

    const fetchProduct = async () => {
        try {
            const res = await fetch(`http://localhost:3000/products/${id}`);
            setProduct(await res.json());
        } catch (e) { console.error(e); }
    };

    const fetchReviews = async () => {
        try {
            const res = await fetch(`http://localhost:3000/reviews?productId=${id}`);
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
            await fetch(`http://localhost:3000/products/${id}/${endpoint}`, {
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
            await fetch(`http://localhost:3000/reviews`, {
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
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
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
                    <form onSubmit={submitReview} className="mb-8 bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-sm max-w-2xl">
                        <h3 className="text-lg font-medium mb-4">Leave a Review</h3>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                            <select value={reviewForm.rating} onChange={e => setReviewForm({...reviewForm, rating: parseInt(e.target.value)})} className="mt-1 block w-24 border border-gray-300 rounded-md shadow-sm p-2">
                                {[5,4,3,2,1].map(r => <option key={r} value={r}>{r} Stars</option>)}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Comment</label>
                            <textarea required rows={3} value={reviewForm.comment} onChange={e => setReviewForm({...reviewForm, comment: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                        </div>
                        <button type="submit" className="bg-slate-900 text-white px-4 py-2 rounded-md hover:bg-slate-800">Submit Review</button>
                    </form>
                )}

                <div className="space-y-6">
                    {reviews.length === 0 ? (
                        <p className="text-gray-500">Chưa có đánh giá nào.</p>
                    ) : (
                        reviews.map(review => (
                            <div key={review._id} className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
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
