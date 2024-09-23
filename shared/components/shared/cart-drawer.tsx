'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter,
    SheetClose,
} from '@/shared/components/ui/sheet';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '../ui';
import Link from 'next/link';
import { CartDrawerItem } from './cart-drawer-item';
import { getCartItemDetails } from '@/shared/lib';
import { useCartStore } from '@/shared/store';
import { PizzaSize, PizzaType } from '@/shared/constants/pizza';
import { Title } from './title';
import emptybox from '../../../public/assets/images/empty-box.png';
import clsx from 'clsx';
import { cn } from '@/shared/lib/utils';

interface Props {
    className?: string;
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({
    children,
    className,
}) => {
    const [
        fetchCartItems,
        totalAmount,
        items,
        updateItemQuantity,
        removeCartItem,
    ] = useCartStore((state) => [
        state.fetchCartItems,
        state.totalAmount,
        state.items,
        state.updateItemQuantity,
        state.removeCartItem,
    ]);

    useEffect(() => {
        fetchCartItems();
    }, []);

    const onClickCountButton = (
        id: number,
        quantity: number,
        type: 'plus' | 'minus'
    ) => {
        const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
        updateItemQuantity(id, newQuantity);
    };

    return (
        <Sheet>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
                <div
                    className={cn(
                        'flex flex-col h-full',
                        !totalAmount && 'justify-center'
                    )}
                >
                    {totalAmount > 0 && (
                        <SheetHeader>
                            <SheetTitle>
                                <span className="font-bold">
                                    {items.length} items in the cart
                                </span>
                            </SheetTitle>
                        </SheetHeader>
                    )}
                    {!totalAmount && (
                        <div className="flex flex-col items-center justify-center w-72 mx-auto">
                            <Image
                                src={emptybox}
                                alt="empty"
                                width={120}
                                height={120}
                            />
                            <Title
                                size="sm"
                                text="Your cart is empty"
                                className="text-center font-bold my-2"
                            />
                            <p className="text-center text-neutral-500 mb-5">
                                Please add some items to your cart
                            </p>
                            <SheetClose>
                                <Button
                                    className="w-56 h-12 text-base"
                                    size="lg"
                                >
                                    <ArrowLeft className="w-5 mr-2" />
                                    Return
                                </Button>
                            </SheetClose>
                        </div>
                    )}

                    {totalAmount > 0 && (
                        <>
                            <div className="-mx-6 mt-5 overflow-auto scrollbar flex-1">
                                <div className="mb-2">
                                    {items.map((item) => (
                                        <CartDrawerItem
                                            key={item.id}
                                            id={item.id}
                                            imageUrl={item.imageUrl}
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
                                            name={item.name}
                                            price={item.price}
                                            quantity={item.quantity}
                                            onClickCountButton={(type) =>
                                                onClickCountButton(
                                                    item.id,
                                                    item.quantity,
                                                    type
                                                )
                                            }
                                            onClickRemove={() =>
                                                removeCartItem(item.id)
                                            }
                                        />
                                    ))}
                                </div>
                            </div>
                            <SheetFooter className="-mx-6 bg-white p-8">
                                <div className="w-full">
                                    <div className="flex mb-4">
                                        <span className="flex flex-1 text-lg text-neutral-500">
                                            Total
                                            <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                                        </span>

                                        <span className="font-bold text-lg">
                                            {totalAmount}
                                        </span>
                                    </div>

                                    <Link href="/cart">
                                        <Button
                                            type="submit"
                                            className="w-full h-12 text-base"
                                        >
                                            Make order
                                            <ArrowRight className="w-5 ml-2" />
                                        </Button>
                                    </Link>
                                </div>
                            </SheetFooter>
                        </>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
};
