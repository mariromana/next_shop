import { create } from 'zustand';
import { Api } from '../services/api-client';
import { getCartDetails } from '../lib';
import { CartStateItem } from '../lib/get-cart-details';
import { CreateCartItemValues } from '../services/dto/cart.dto';

export interface CartState {
    loading: boolean;
    error: boolean;
    totalAmount: number;
    items: CartStateItem[];
    fetchCartItems: () => Promise<void>;
    updateItemQuantity: (id: number, quantity: number) => Promise<void>;
    addCartItem: (item: any) => Promise<void>;
    removeCartItem: (id: number) => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
    items: [],
    error: false,
    totalAmount: 0,
    loading: true,

    fetchCartItems: async () => {
        try {
            set({ loading: true, error: false });
            const data = await Api.cart.fetchCart();
            set(getCartDetails(data));
        } catch (error) {
            console.log(error);
            set({ error: true });
        } finally {
            set({ loading: false });
        }
    },

    updateItemQuantity: async (id: number, quantity: number) => {
        try {
            set({ loading: true, error: false });
            const data = await Api.cart.fetchUpdateItemQuantity(id, quantity);
            set(getCartDetails(data));
        } catch (error) {
            console.log(error);
            set({ error: true });
        } finally {
            set({ loading: false });
        }
    },
    addCartItem: async (item: CreateCartItemValues) => {
        try {
            set({ loading: true, error: false });
            const data = await Api.cart.addCartItem(item);
            set(getCartDetails(data));
        } catch (error) {
            console.log(error);
            set({ error: true });
        } finally {
            set({ loading: false });
        }
    },
    removeCartItem: async (id) => {
        try {
            set({ loading: true, error: false });
            const data = await Api.cart.fetchDeleteCartItem(id);
            set(getCartDetails(data));
        } catch (error) {
            console.log(error);
            set({ error: true });
        } finally {
            set({ loading: false });
        }
    },
}));
