import { CartItemsDTO } from '@/shared/services/dto/cart.dto';
import React from 'react';

interface Props {
    orderId: number;
    items: CartItemsDTO[];
}

export const OrderSuccessTemplate: React.FC<Props> = ({ orderId, items }) => (
    <div>
        <h1>Thank you for your order</h1>
        <p>Your order #{orderId} was paid. Your order:</p>
        <hr />
        <ul>
            {items.map((item) => (
                <li key={item.id}>
                    {item.productItem.product.name} | {item.productItem.price} $
                    x {item.quantity} = {item.productItem.price * item.quantity}{' '}
                    $
                </li>
            ))}
        </ul>
    </div>
);
