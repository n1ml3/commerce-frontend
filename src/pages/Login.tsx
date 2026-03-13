import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from '../api/axios';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await axios.post('/auth/login', { email, password });
            login(response.data.user, response.data.access_token);
            navigate('/store');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Đăng nhập thất bại. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex-grow flex bg-white">
            {/* Left Box (Hero Image) */}
            <div className="hidden lg:flex lg:w-1/2 bg-gray-100 relative">
                <img 
                    src="https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
                    alt="Hero" 
                    className="absolute inset-0 w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-primary-600/20 mix-blend-multiply"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center text-white bg-black/50">
                    <h1 className="text-5xl font-extrabold tracking-tight mb-4 text-white drop-shadow-lg">Thế Giới Số</h1>
                    <p className="text-lg font-medium max-w-lg text-gray-200 drop-shadow-md">
                        Chào mừng bạn đến với trung tâm công nghệ hàng đầu. Khám phá ngay các dòng Smartphone, Laptop, và Phụ kiện cao cấp nhất.
                    </p>
                </div>
            </div>

            {/* Right Box (Form) */}
            <div className="w-full lg:w-1/2 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <h2 className="text-center text-4xl font-extrabold text-gray-900 mb-2">
                            Đăng nhập
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Hoặc{' '}
                            <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500 transition-colors">
                                tạo tài khoản mới
                            </Link>
                        </p>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-red-50 text-red-500 p-4 border border-red-100 rounded-none text-sm text-center font-medium">
                                {error}
                            </div>
                        )}
                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">Email</label>
                                <input
                                    type="email"
                                    required
                                    className="appearance-none relative block w-full px-4 py-3 border border-gray-300 bg-gray-50 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-primary-600 focus:bg-white transition-colors sm:text-sm rounded-none"
                                    placeholder="admin@gmail.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">Mật khẩu</label>
                                <input
                                    type="password"
                                    required
                                    className="appearance-none relative block w-full px-4 py-3 border border-gray-300 bg-gray-50 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-primary-600 focus:bg-white transition-colors sm:text-sm rounded-none"
                                    placeholder="admin123"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className={`group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold text-white shadow-sm ${loading ? 'bg-primary-400' : 'bg-primary-600 hover:bg-primary-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors rounded-none cursor-pointer uppercase tracking-wider`}
                            >
                                {loading ? 'Đang xử lý...' : 'Đăng nhập'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
