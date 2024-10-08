import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma-client';
import { cookies } from 'next/headers'; // для получения куки
import { OrderStatus } from '@prisma/client'; // используйте ваш статус заказа, если есть
import { TCheckoutFormValues } from '@/shared/constants';
import { createPayment, sendEmail } from '@/shared/lib';
import { OrderSuccessTemplate, PayOrderTemplate } from '@/shared/components';

export async function POST(req: NextRequest) {
    try {
        const data = (await req.json()) as TCheckoutFormValues;
        const cookieStore = cookies();
        const cartToken = cookieStore.get('cartToken')?.value;

        if (!cartToken) {
            throw new Error('Cart token not found');
        }

        const userCart = await prisma.cart.findFirst({
            include: {
                user: true,
                items: {
                    include: {
                        ingredients: true,
                        productItem: {
                            include: {
                                product: true,
                            },
                        },
                    },
                },
            },
            where: {
                token: cartToken,
            },
        });

        if (!userCart) {
            throw new Error('Cart not found');
        }

        if (userCart.totalAmount === 0) {
            throw new Error('Cart is empty');
        }

        const order = await prisma.order.create({
            data: {
                token: cartToken,
                fullName: `${data.firstName} ${data.lastName}`,
                email: data.email,
                address: data.address,
                phone: data.phone,
                comment: data.comment,
                totalAmount: userCart.totalAmount,
                status: OrderStatus.PENDING,
                items: JSON.stringify(userCart.items), // сохранить товары как строку JSON
            },
        });

        // Обновить сумму корзины на 0 после создания заказа
        await prisma.cart.update({
            where: {
                id: userCart.id,
            },
            data: {
                totalAmount: 0,
            },
        });

        // Удалить товары из корзины
        await prisma.cartItem.deleteMany({
            where: {
                cartId: userCart.id,
            },
        });

        // Создать данные для оплаты
        const paymentData = await createPayment({
            amount: order.totalAmount,
            description: `Order #${order.id}`,
            orderId: order.id,
        });

        if (!paymentData) {
            throw new Error('Payment data not found');
        }

        // Обновить заказ с ID платежа
        await prisma.order.update({
            where: {
                id: order.id,
            },
            data: {
                paymentId: paymentData.id,
            },
        });

        // Отправить email с подтверждением заказа
        await sendEmail(
            data.email,
            `Next Pizza / Order Confirmation #${order.id}`,
            PayOrderTemplate({
                orderId: order.id,
                totalAmount: order.totalAmount,
            })
        );

        // Обновить статус заказа на "SUCCEEDED" после успешного платежа
        await prisma.order.update({
            where: {
                id: order.id,
            },
            data: {
                status: OrderStatus.SUCCEEDED,
            },
        });

        // Отправить email с успешным завершением заказа
        const items = JSON.parse(order.items as string); // преобразовать обратно товары из строки JSON

        await sendEmail(
            order.email,
            `Next Pizza | Your order was successfully processed`,
            OrderSuccessTemplate({
                orderId: order.id,
                items,
            })
        );

        return NextResponse.redirect(new URL('/?paid', req.url));
    } catch (error) {
        console.error('[CreateOrderAction]:', error);
        return NextResponse.json(
            { message: 'Error creating order' },
            { status: 500 }
        );
    }
}
