import { Cart } from '@prisma/client';
import { CartDTO } from '../services/dto/cart.dto';
import { pizzaTypes } from '../constants/pizza';
import { ingredients } from '@/prisma/constans';
import { calcCartItemTotalPrice } from './calc-cart-item-total-price';

export type CartStateItem = {
    id: number;
    quantity: number;
    name: string;
    imageUrl: string;
    price: number;
    disabled?: boolean;
    pizzaSize?: number | null;
    pizzaType?: number | null;
    ingredients: Array<{ name: string; price: number }>;
};

interface ReturnProps {
    items: CartStateItem[];
    totalAmount: number;
}

export const getCartDetails = (data: CartDTO): ReturnProps => {
    const items = data.items.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        name: item.productItem.product.name,
        imageUrl: item.productItem.product.imageUrl,
        disabled: false,
        price: calcCartItemTotalPrice(item),
        pizzaSize: item.productItem.size,
        pizzaType: item.productItem.pizzaType,
        ingredients: item.ingredients.map((ing) => ({
            name: ing.name,
            price: ing.price,
        })),
    })) as CartStateItem[];

    return {
        items,
        totalAmount: data.totalAmount,
    };
};
