import { useEffect } from 'react';
import { useCartStore } from '../store';
import { CartItem } from '@prisma/client';
import { CartStateItem } from '../lib/get-cart-details';

interface ReturnProps {
    totalAmount: number;
    items: CartStateItem[];
    loading: boolean;
    updateItemQuantity: (id: number, quantity: number) => void;
    removeCartItem: (id: number) => void;
    addCartItem: (item: CartItem) => void;
}
export const useCart = (): ReturnProps => {
    const cartState = useCartStore((state) => state);

    useEffect(() => {
        cartState.fetchCartItems();
    }, []);

    return cartState;
};
