import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-slate-50">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/cart" element={<Cart />} />
              </Routes>
            </main>

            {/* Simple Footer */}
            <footer className="bg-white border-t border-gray-200 mt-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center">
                <span className="text-2xl font-bold text-primary-600 mb-4">CHỢ GIỜI NAM LÊ.</span>
                <p className="text-gray-500 text-sm">© 2026 CHỢ GIỜI NAM LÊ. All rights reserved.</p>
              </div>
            </footer>
          </div>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
