import { prisma } from '@/prisma/prisma-client';
import { updateCartTotalAmount } from '@/shared/lib';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = Number(params.id);
        const body = (await req.json()) as { quantity: number };

        const token = req.cookies.get('cartToken')?.value;

        if (!token) {
            return NextResponse.json({ error: 'Something went wrong' });
        }

        const cartItem = await prisma.cartItem.findFirst({
            where: {
                id: id,
            },
        });

        if (!cartItem) {
            return NextResponse.json({ error: 'Cart item not found' });
        }

        await prisma.cartItem.update({
            where: {
                id: id,
            },
            data: {
                quantity: body.quantity,
            },
        });

        const updatedUserCart = await updateCartTotalAmount(token);
        return NextResponse.json(updatedUserCart);
    } catch (error) {
        console.log('[CART_PATCH] Server error', error);
        return NextResponse.json(
            { message: 'Something went wrong' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = Number(params.id);

        const token = req.cookies.get('cartToken')?.value;

        if (!token) {
            return NextResponse.json({ error: 'Cart token not found' });
        }

        const cartItem = await prisma.cartItem.findFirst({
            where: {
                id: id,
            },
        });

        if (!cartItem) {
            return NextResponse.json({ error: 'Cart item not found' });
        }

        await prisma.cartItem.delete({
            where: {
                id: id,
            },
        });

        const updatedUserCart = await updateCartTotalAmount(token);
        return NextResponse.json(updatedUserCart);
    } catch (error) {
        console.log('[CART_DELETE] Server error', error);
        return NextResponse.json(
            { message: 'Something went wrong with deleting cart item' },
            { status: 500 }
        );
    }
}
