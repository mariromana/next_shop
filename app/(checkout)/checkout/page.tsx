'use client';
import {
    CheckoutCart,
    CheckoutSidebar,
    Container,
    Title,
    CheckoutPersonalForm,
    CheckoutAdressForm,
} from '@/shared/components/shared';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCart } from '@/shared/hooks';
import { TCheckoutFormValues, checkoutFormSchema } from '@/shared/constants';
import { cn } from '@/shared/lib/utils';
import { createOrder } from '@/app/actions';
import toast from 'react-hot-toast';
import React from 'react';

export default function CheckoutPage() {
    const [submiting, setSubmiting] = React.useState(false);
    const { totalAmount, items, updateItemQuantity, removeCartItem, loading } =
        useCart();

    const form = useForm<TCheckoutFormValues>({
        resolver: zodResolver(checkoutFormSchema),
        defaultValues: {
            email: '',
            firstName: '',
            lastName: '',
            phone: '',
            address: '',
            comment: '',
        },
    });
    //optimize
    const onClickCountButton = (
        id: number,
        quantity: number,
        type: 'plus' | 'minus'
    ) => {
        const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
        updateItemQuantity(id, newQuantity);
    };

    const onSubmit = async (data: TCheckoutFormValues) => {
        try {
            setSubmiting(true);
            const url = await createOrder(data);

            toast.success(
                'Order created successfully! Redirecting for payment...',
                {
                    icon: '🚀',
                }
            );

            if (url) {
                location.href = url;
            }
        } catch (error) {
            console.log(error);
            setSubmiting(false);
            toast.error('Failed to create order', {
                icon: '🚨',
            });
        }
    };

    return (
        <Container className="mt-6">
            <Title text="Order" size="lg" className="font-extrabold mb-8" />

            <FormProvider {...form}>
                <form action="submit" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex gap-10">
                        <div className="flex flex-col gap-10 flex-1 mb-20">
                            <CheckoutCart
                                items={items}
                                onClickCountButton={onClickCountButton}
                                removeCartItem={removeCartItem}
                                loading={loading}
                            />
                            <CheckoutPersonalForm
                                className={cn({
                                    'opacity-40 pointer-events-none': loading,
                                })}
                            />
                            <CheckoutAdressForm
                                className={cn({
                                    'opacity-40 pointer-events-none': loading,
                                })}
                            />
                        </div>

                        <div className="w-[450px]">
                            <CheckoutSidebar
                                totalAmount={totalAmount}
                                loading={loading || submiting}
                            />
                        </div>
                    </div>
                </form>
            </FormProvider>
        </Container>
    );
}
