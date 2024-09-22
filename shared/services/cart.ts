import { Cart } from '@prisma/client';
import { axiosInstance } from './instance';
import { CartDTO, CreateCartItemValues } from './dto/cart.dto';

export const fetchCart = async (): Promise<CartDTO> => {
    const { data } = await axiosInstance.get<CartDTO>('/cart');

    return data;
};

export const fetchUpdateItemQuantity = async (
    itemId: number,
    quantity: number
): Promise<CartDTO> => {
    const { data } = await axiosInstance.patch<CartDTO>('/cart/' + itemId, {
        quantity,
    });
    return data;
};

export const fetchDeleteCartItem = async (itemId: number): Promise<CartDTO> => {
    const { data } = await axiosInstance.delete<CartDTO>('/cart/' + itemId);
    return data;
};

export const addCartItem = async (
    values: CreateCartItemValues
): Promise<CartDTO> => {
    return (await axiosInstance.post<CartDTO>('/cart', values)).data;
};
