import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import axios from '../api/axios';
import { useAuth } from './AuthContext';
import type { ProductType } from '../components/ProductCard';

export interface CartItemType {
    product: ProductType;
    quantity: number;
    price: number;
    _id?: string;
}

interface CartContextType {
    items: CartItemType[];
    addToCart: (productId: string) => Promise<void>;
    removeFromCart: (productId: string) => Promise<void>;
    updateQuantity: (productId: string, quantity: number) => Promise<void>;
    totalItems: number;
    totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const { isAuthenticated } = useAuth();
    const [items, setItems] = useState<CartItemType[]>([]);

    useEffect(() => {
        if (isAuthenticated) {
            fetchCart();
        } else {
            setItems([]);
        }
    }, [isAuthenticated]);

    const fetchCart = async () => {
        try {
            const response = await axios.get('/carts');
            setItems(response.data.items || []);
        } catch (error) {
            console.error('Failed to fetch cart', error);
        }
    };

    const addToCart = async (productId: string) => {
        if (!isAuthenticated) {
            alert('Vui lòng đăng nhập để mua hàng!');
            return;
        }
        try {
            const response = await axios.post('/carts/items', { productId, quantity: 1 });
            setItems(response.data.items);
        } catch (error) {
            console.error('Failed to add to cart', error);
        }
    };

    const removeFromCart = async (productId: string) => {
        try {
            const response = await axios.delete(`/carts/items/${productId}`);
            setItems(response.data.items);
        } catch (error) {
            console.error('Failed to remove from cart', error);
        }
    };

    const updateQuantity = async (productId: string, quantity: number) => {
        if (quantity < 1) return;
        try {
            const response = await axios.put(`/carts/items/${productId}`, { quantity });
            setItems(response.data.items);
        } catch (error) {
            console.error('Failed to update quantity', error);
        }
    };

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, totalItems, totalPrice }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
