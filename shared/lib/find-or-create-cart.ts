import { prisma } from '@/prisma/prisma-client';

/**
 * Finds a cart by the given token, or creates a new one if none is found.
 *
 * @example findOrCreateCart('1234567890abcdef')
 * @param token - The token of the cart to find or create.
 * @returns The found or created cart.
 */
export const findOrCreateCart = async (token: string) => {
    let userCart = await prisma.cart.findFirst({
        where: {
            token,
        },
    });
    if (!userCart) {
        userCart = await prisma.cart.create({
            data: {
                token,
            },
        });
    }

    return userCart;
};
