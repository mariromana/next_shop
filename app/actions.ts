'use server';
import { OrderSuccessTemplate, PayOrderTemplate } from '@/shared/components';

import { prisma } from '@/prisma/prisma-client';
import { TCheckoutFormValues } from '@/shared/constants';
import { createPayment, sendEmail } from '@/shared/lib';
import { OrderStatus, Prisma } from '@prisma/client';
import { cookies } from 'next/headers';
import { CartItemsDTO } from '@/shared/services/dto/cart.dto';

import { getUserSession } from '@/shared/lib/get-user-session';
import { hashSync } from 'bcrypt';
import { VerificationUserTemplate } from '@/shared/components/shared/email-templates/verification-user';
// export async function createOrder(data: TCheckoutFormValues) {
//     try {
//         const cookieStore = cookies();
//         const cartToken = cookieStore.get('cartToken')?.value;

//         if (!cartToken) {
//             throw new Error('Cart token not found');
//         }
//         //find cart by token
//         const userCart = await prisma.cart.findFirst({
//             include: {
//                 user: true,
//                 items: {
//                     include: {
//                         ingredients: true,
//                         productItem: {
//                             include: {
//                                 product: true,
//                             },
//                         },
//                     },
//                 },
//             },
//             where: {
//                 token: cartToken,
//             },
//         });
//         //if cart not found
//         if (!userCart) {
//             throw new Error('Cart not found');
//         }
//         //if cart is empty
//         if (userCart?.totalAmount === 0) {
//             throw new Error('Cart is empty');
//         }
//         //create order
//         const order = await prisma.order.create({
//             data: {
//                 token: cartToken,
//                 fullName: data.firstName + '' + data.lastName,
//                 email: data.email,
//                 address: data.address,
//                 phone: data.phone,
//                 comment: data.comment,
//                 totalAmount: userCart.totalAmount,
//                 status: OrderStatus.PENDING,
//                 items: JSON.stringify(userCart.items),
//             },
//         });
//         //update cart total amount
//         await prisma.cart.update({
//             where: {
//                 // token: cartToken,
//                 id: userCart.id,
//             },
//             data: {
//                 totalAmount: 0,
//             },
//         });
//         //delete cart items
//         await prisma.cartItem.deleteMany({
//             where: {
//                 cartId: userCart.id,
//             },
//         });

//         const paymentData = await createPayment({
//             amount: order.totalAmount,
//             description: 'Order #' + order.id,
//             orderId: order.id,
//         });

//         if (!paymentData) {
//             throw new Error('Payment data not found');
//         }

//         await prisma.order.update({
//             where: {
//                 id: order.id,
//             },
//             data: {
//                 paymentId: paymentData.id,
//             },
//         });

//         await sendEmail(
//             data.email,
//             'Next Pizza / Order Confirmation' + order.id,
//             PayOrderTemplate({
//                 orderId: order.id,
//                 totalAmount: order.totalAmount,
//             })
//         );

//         // const orderPending = await prisma.order.findFirst({
//         //     where: {
//         //         id: Number(paymentData.id),
//         //     },
//         // });

//         // if (!orderPending) {
//         //     throw new Error('Order not found');
//         // }

//         await prisma.order.update({
//             where: {
//                 id: order.id,
//             },
//             data: {
//                 status: OrderStatus.SUCCEEDED,
//             },
//         });

//         const items = JSON.parse(order.items as string) as CartItemsDTO[];

//         if (order) {
//             await sendEmail(
//                 order.email,
//                 'Next Pizza | Your order was successfully processed',
//                 OrderSuccessTemplate({ orderId: order.id, items })
//             );
//         }

//         // const paymentUrl = paymentData.confirmation.confirmation_url;
//         // return paymentUrl;

//         // redirect('/?paid');
//     } catch (error) {
//         console.log('[CreateOrderAction]:', error);
//     }
// }

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
    try {
        const currentUser = await getUserSession();

        if (!currentUser) {
            throw new Error('User not found');
        }

        const findUser = await prisma.user.findFirst({
            where: {
                id: Number(currentUser.id),
            },
        });
        await prisma.user.update({
            where: {
                id: Number(currentUser.id),
            },
            data: {
                email: body.email,
                fullName: body.fullName,
                password: body.password
                    ? hashSync(body.password as string, 10)
                    : findUser?.password,
            },
        });
    } catch (error) {
        throw error;
    }
}

export async function registerUser(body: Prisma.UserCreateInput) {
    try {
        const user = await prisma.user.findFirst({
            where: {
                email: body.email,
            },
        });

        if (user) {
            if (!user.verified) {
                throw new Error('Email not verified');
            }
            throw new Error('User already exists');
        }

        const createdUser = await prisma.user.create({
            data: {
                email: body.email,
                fullName: body.fullName,
                password: hashSync(body.password as string, 10),
            },
        });

        const code = Math.floor(10000 + Math.random() * 90000).toString();

        await prisma.verificationCode.create({
            data: {
                code,
                userId: createdUser.id,
            },
        });

        await sendEmail(
            createdUser.email,
            'Next Pizza | Email verification',
            VerificationUserTemplate({
                fullName: createdUser.fullName,
                code,
            })
        );
    } catch (error) {
        console.log('[RegisterUserAction]:', error);
        throw error;
    }
}
