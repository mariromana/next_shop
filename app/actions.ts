'use server';

import { prisma } from '@/prisma/prisma-client';
import { TCheckoutFormValues } from '@/shared/constants';
import { OrderStatus } from '@prisma/client';
import { comment } from 'postcss';

export async function createOrder(data: TCheckoutFormValues) {
    console.log(data);

    const token = '111';
    await prisma.order.create({
        data: {
            token,
            totalAmount: 222,
            items: [],
            status: OrderStatus.PENDING,
            fullName: data.firstName + ' ' + data.lastName,
            email: data.email,
            phone: data.phone,
            address: data.address,
            comment: data.comment,
        },
    });

    return 'https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#server-components';
}
