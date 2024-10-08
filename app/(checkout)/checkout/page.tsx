'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
    CheckoutSidebar,
    Container,
    Title,
    CheckoutAdressForm,
    CheckoutCart,
    CheckoutPersonalForm,
} from '@/shared/components';
import { checkoutFormSchema, TCheckoutFormValues } from '@/shared/constants';
import { useCart } from '@/shared/hooks';
import toast from 'react-hot-toast';
import React from 'react';

import { Api } from '@/shared/services/api-client';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/dist/server/api-utils';

export default function CheckoutPage() {
    const [submitting, setSubmitting] = React.useState(false);
    const { totalAmount, updateItemQuantity, items, removeCartItem, loading } =
        useCart();
    const { data: session } = useSession();

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

    React.useEffect(() => {
        async function fetchUserInfo() {
            const data = await Api.auth.getMe();
            const [firstName, lastName] = data.fullName.split(' ');

            form.setValue('firstName', firstName);
            form.setValue('lastName', lastName);
            form.setValue('email', data.email);
        }

        if (session) {
            fetchUserInfo();
        }
    }, [session]);

    const onSubmit = async (data: TCheckoutFormValues) => {
        try {
            setSubmitting(true);
            const url = await Api.checkout.postOrder(data);

            if (url) {
                toast.success('Order created successfully!', {
                    icon: '🚀',
                });

                location.href = '/?paid';
            } else {
                toast.error('Failed to create order', {
                    icon: '🚨',
                });
                throw new Error('Failed to process order');
            }
        } catch (error) {
            console.error(error);
            setSubmitting(false);
            toast.error('Failed to create order', {
                icon: '🚨',
            });
        }
    };

    const onClickCountButton = (
        id: number,
        quantity: number,
        type: 'plus' | 'minus'
    ) => {
        const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
        updateItemQuantity(id, newQuantity);
    };

    return (
        <Container className="mt-10">
            <Title
                text="Оформление заказа"
                className="font-extrabold mb-8 text-[36px]"
            />
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex gap-10">
                        {/* Левая часть */}
                        <div className="flex flex-col gap-10 flex-1 mb-20">
                            <CheckoutCart
                                onClickCountButton={onClickCountButton}
                                removeCartItem={removeCartItem}
                                items={items}
                                loading={loading}
                            />
                            <CheckoutPersonalForm
                                className={
                                    loading
                                        ? 'opacity-40 pointer-events-none'
                                        : ''
                                }
                            />

                            <CheckoutAdressForm
                                className={
                                    loading
                                        ? 'opacity-40 pointer-events-none'
                                        : ''
                                }
                            />
                        </div>

                        {/* Правая часть */}
                        <div className="w-[450px]">
                            <CheckoutSidebar
                                totalAmount={totalAmount}
                                loading={loading || submitting}
                            />
                        </div>
                    </div>
                </form>
            </FormProvider>
            ;
        </Container>
    );
}

// 'use client';
// import React from 'react';
// import {
//     CheckoutCart,
//     CheckoutSidebar,
//     Container,
//     Title,
//     CheckoutPersonalForm,
//     CheckoutAdressForm,
// } from '@/shared/components/shared';
// import { useForm, FormProvider } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useCart } from '@/shared/hooks';
// import { TCheckoutFormValues, checkoutFormSchema } from '@/shared/constants';
// import { cn } from '@/shared/lib/utils';
// import toast from 'react-hot-toast';

// import { useSession } from 'next-auth/react';
// import { Api } from '@/shared/services/api-client';

// export default function CheckoutPage() {
//     const [submiting, setSubmiting] = React.useState(false);
//     const { totalAmount, items, updateItemQuantity, removeCartItem, loading } =
//         useCart();
//     const { data: session } = useSession();

//     const form = useForm<TCheckoutFormValues>({
//         resolver: zodResolver(checkoutFormSchema),
//         defaultValues: {
//             email: '',
//             firstName: '',
//             lastName: '',
//             phone: '',
//             address: '',
//             comment: '',
//         },
//     });

//     // React.useEffect(() => {
//     //     async function fetchUserInfo() {
//     //         const data = await Api.auth.getMe();
//     //         const [firstName, lastName] = data.fullName.split(' ');

//     //         form.setValue('firstName', firstName);
//     //         form.setValue('lastName', lastName);
//     //         form.setValue('email', data.email);
//     //     }

//     //     if (session) {
//     //         fetchUserInfo();
//     //     }
//     // }, [session]);

//     // //optimize
//     // const onClickCountButton = (
//     //     id: number,
//     //     quantity: number,
//     //     type: 'plus' | 'minus'
//     // ) => {
//     //     const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
//     //     updateItemQuantity(id, newQuantity);
//     // };

//     // const onSubmit = async (data: TCheckoutFormValues) => {
//     //     try {
//     //         setSubmiting(true);
//     //         const url = await Api.checkout.postOrder(data);

//     //         if (url) {
//     //             toast.success(
//     //                 'Order created successfully! Redirecting for payment...',
//     //                 {
//     //                     icon: '🚀',
//     //                 }
//     //             );
//     //         } else {
//     //             toast.error('Failed to create order', {
//     //                 icon: '🚨',
//     //             });
//     //             throw new Error('Failed to process order');
//     //         }
//     //     } catch (error) {
//     //         console.error(error);
//     //         setSubmiting(false);
//     //         toast.error('Failed to create order', {
//     //             icon: '🚨',
//     //         });
//     //     }
//     // };

//     const onSubmit = (data: TCheckoutFormValues) => {
//         console.log(data);
//     };
//     return (
//         <Container className="mt-6">
//             <Title text="Order" size="lg" className="font-extrabold mb-8" />

//             <FormProvider {...form}>
//                 <form action="submit" onSubmit={form.handleSubmit(onSubmit)}>
//                     <div className="flex gap-10">
//                         <div className="flex flex-col gap-10 flex-1 mb-20">
//                             <CheckoutCart
//                                 items={items}
//                                 onClickCountButton={() => console.log(1)}
//                                 // onClickCountButton={onClickCountButton}
//                                 removeCartItem={removeCartItem}
//                                 loading={loading}
//                             />
//                             <CheckoutPersonalForm
//                                 className={cn({
//                                     'opacity-40 pointer-events-none': loading,
//                                 })}
//                             />
//                             <CheckoutAdressForm
//                                 className={cn({
//                                     'opacity-40 pointer-events-none': loading,
//                                 })}
//                             />
//                         </div>

//                         <div className="w-[450px]">
//                             <CheckoutSidebar
//                                 totalAmount={totalAmount}
//                                 loading={loading || submiting}
//                             />
//                         </div>
//                     </div>
//                 </form>
//             </FormProvider>
//         </Container>
//     );
// }

// const onSubmit = async (data: TCheckoutFormValues) => {
//     try {
//         setSubmiting(true);
//         const url = await createOrder(data);

//         toast.success(
//             'Order created successfully! Redirecting for payment...',
//             {
//                 icon: '🚀',
//             }
//         );

//         if (url) {
//             location.href = url;
//         }
//     } catch (error) {
//         console.log(error);
//         setSubmiting(false);
//         toast.error('Failed to create order', {
//             icon: '🚨',
//         });
//     }
// };
