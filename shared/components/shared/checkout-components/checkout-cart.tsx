import React from 'react';
import { WhiteBlock } from '../white-block';
import { CartItemOrder } from '../cart-item-order';
import { getCartItemDetails } from '@/shared/lib';
import { PizzaSize, PizzaType } from '@/shared/constants/pizza';
import { CartStateItem } from '@/shared/lib/get-cart-details';

interface Props {
    className?: string;
    items: CartStateItem[];
    onClickCountButton: (
        id: number,
        quantity: number,
        type: 'plus' | 'minus'
    ) => void;
    removeCartItem: (id: number) => void;
}

export const CheckoutCart: React.FC<Props> = ({
    className,
    items,
    onClickCountButton,
    removeCartItem,
}) => {
    return (
        <WhiteBlock title="1. Cart" className={className}>
            <div className="flex flex-col gap-5">
                {items.map((item) => (
                    <CartItemOrder
                        id={item.id}
                        name={item.name}
                        key={item.id}
                        details={
                            item.pizzaSize && item.pizzaType
                                ? getCartItemDetails(
                                      item.ingredients,
                                      item.pizzaType as PizzaType,
                                      item.pizzaSize as PizzaSize
                                  )
                                : ''
                        }
                        disabled={item.disabled}
                        price={item.price}
                        quantity={item.quantity}
                        imageUrl={item.imageUrl}
                        onClickCountButton={(type) =>
                            onClickCountButton(item.id, item.quantity, type)
                        }
                        onClickRemove={() => removeCartItem(item.id)}
                    />
                ))}
            </div>
        </WhiteBlock>
    );
};
