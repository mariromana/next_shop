import { Order } from '@prisma/client';
import { axiosInstance } from './instance';
import { TCheckoutFormValues } from '../constants';

export const postOrder = async (
    values: TCheckoutFormValues
): Promise<Order> => {
    return (await axiosInstance.post('/checkout/order', values)).data;
};
