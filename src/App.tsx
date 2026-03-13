import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import ProductDetail from './pages/ProductDetail';
import ShopProfile from './pages/ShopProfile';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

import AdminLayout from './pages/Admin/AdminLayout';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminProducts from './pages/Admin/AdminProducts';
import AdminUsers from './pages/Admin/AdminUsers';

const ClientLayout = () => (
    <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex flex-col">
            <Outlet />
        </main>
        <footer className="bg-white border-t border-gray-200 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center">
                <span className="text-2xl font-bold text-primary-600 mb-4">CHỢ GIỜI NAM LÊ.</span>
                <p className="text-gray-500 text-sm">© 2026 CHỢ GIỜI NAM LÊ. All rights reserved.</p>
            </div>
        </footer>
    </div>
);

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-slate-50 text-gray-900 font-sans">
            <Routes>
              {/* Client Routes */}
              <Route element={<ClientLayout />}>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/store" element={<Home />} />
                <Route path="/store/product/:id" element={<ProductDetail />} />
                <Route path="/shop/:id" element={<ShopProfile />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/cart" element={<Cart />} />
              </Route>
              
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="users" element={<AdminUsers />} />
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
