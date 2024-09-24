'use client';
import React from 'react';
import { cn } from '@/shared/lib/utils';
import { X } from 'lucide-react';
import { CartItemProps } from './cart-item-details/cart-item-details.types';
import * as CartItemDetails from './cart-item-details';
import { Ingredient } from '@prisma/client';

interface Props extends CartItemProps {
    onClickRemove?: () => void;
    onClickCountButton?: (type: 'plus' | 'minus') => void;
    className?: string;
}

export const CartItemOrder: React.FC<Props> = ({
    name,
    price,
    imageUrl,
    quantity,
    className,
    onClickCountButton,
    onClickRemove,
    details,
    disabled,
}) => {
    return (
        <div
            className={cn(
                'flex items-center justify-between',
                {
                    'opacity-50 pointer-events-none bg-gray': disabled,
                },
                className
            )}
        >
            <div className="flex items-center gap-5 flex-1">
                <CartItemDetails.Image src={imageUrl} />
                <CartItemDetails.Info name={name} details={details} />
            </div>

            <CartItemDetails.Price value={price} />

            <div className="flex items-center gap-5 ml-20">
                <CartItemDetails.CountButton
                    onClick={onClickCountButton}
                    value={quantity}
                />
                <button onClick={onClickRemove}>
                    <X
                        size={20}
                        className="text-gray-400 cursor-pointer hover:text-gray-600"
                    />
                </button>
            </div>
        </div>
    );
};
