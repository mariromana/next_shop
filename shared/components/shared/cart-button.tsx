'use client';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import React from 'react';
import { Button } from '../ui';
import { cn } from '@/shared/lib/utils';
import { CartDrawer } from './cart-drawer';
import { useCartStore } from '@/shared/store';

export const CartButton: React.FC<{ className?: string }> = ({ className }) => {
    const totalAmount = useCartStore((s) => s.totalAmount);
    const itemsCount = useCartStore((s) => s.items.length);
    const loading = useCartStore((s) => s.loading);

    return (
        <CartDrawer>
            <Button
                loading={loading}
                className={cn(
                    'group relative',
                    { 'w-[105px]': loading },
                    className
                )}
            >
                <b>{totalAmount} $</b>
                <span className="h-full w-[1px] bg-white/30 mx-3" />
                <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
                    <ShoppingCart
                        size={16}
                        className="relative"
                        strokeWidth={2}
                    />
                    <b>{itemsCount}</b>
                </div>
                <ArrowRight
                    size={20}
                    className="absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                />
            </Button>
        </CartDrawer>
    );
};
