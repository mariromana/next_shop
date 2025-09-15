import { categories, ingredients, products } from './constans';
import { prisma } from './prisma-client';
import { hashSync } from 'bcrypt';
import { Prisma } from '@prisma/client';

//generate

const randomNum = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

const generateProductItem = ({
    productId,
    pizzaType,
    size,
}: {
    productId: number;
    pizzaType?: 1 | 2;
    size?: 20 | 30 | 40;
}) => {
    return {
        productId,
        price: randomNum(40, 150),
        pizzaType,
        size,
    } as Prisma.ProductItemUncheckedCreateInput;
};

async function up() {
    await prisma.user.createMany({
        data: [
            {
                fullName: 'User Test',
                email: 'user@test.ru',
                password: hashSync('123456', 10),
                verified: new Date(),
                role: 'USER',
            },
            {
                fullName: 'Admin Test',
                email: 'admin@test.ru',
                password: hashSync('1234567', 10),
                verified: new Date(),
                role: 'ADMIN',
            },
        ],
    });

    await prisma.category.createMany({
        data: categories,
    });
    await prisma.ingredient.createMany({
        data: ingredients,
    });

    await prisma.product.createMany({
        data: products,
    });

    const pizza1 = await prisma.product.create({
        data: {
            name: 'Pepperoni Fresh',
            imageUrl:
                'https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp',
            categoryId: 1,
            ingredients: {
                connect: ingredients.slice(0, 5),
            },
        },
    });

    const pizza2 = await prisma.product.create({
        data: {
            name: 'Cheese',
            imageUrl:
                'https://media.dodostatic.net/image/r:233x233/11EE7D610CF7E265B7C72BE5AE757CA7.webp',
            categoryId: 1,
            ingredients: {
                connect: ingredients.slice(5, 10),
            },
        },
    });

    const pizza3 = await prisma.product.create({
        data: {
            name: 'Chorizo Fresh',
            imageUrl:
                'https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp',
            categoryId: 1,
            ingredients: {
                connect: ingredients.slice(10, 40),
            },
        },
    });

    await prisma.productItem.createMany({
        data: [
            //pizza 1
            generateProductItem({
                productId: pizza1.id,
                pizzaType: 1,
                size: 20,
            }),
            generateProductItem({
                productId: pizza1.id,
                pizzaType: 2,
                size: 30,
            }),
            generateProductItem({
                productId: pizza1.id,
                pizzaType: 2,
                size: 40,
            }),

            //pizza2
            generateProductItem({
                productId: pizza2.id,
                pizzaType: 1,
                size: 20,
            }),
            generateProductItem({
                productId: pizza2.id,
                pizzaType: 1,
                size: 30,
            }),
            generateProductItem({
                productId: pizza2.id,
                pizzaType: 1,
                size: 40,
            }),
            generateProductItem({
                productId: pizza2.id,
                pizzaType: 1,
                size: 20,
            }),
            generateProductItem({
                productId: pizza2.id,
                pizzaType: 2,
                size: 20,
            }),
            generateProductItem({
                productId: pizza2.id,
                pizzaType: 2,
                size: 30,
            }),
            generateProductItem({
                productId: pizza2.id,
                pizzaType: 2,
                size: 40,
            }),

            //pizza3
            generateProductItem({
                productId: pizza3.id,
                pizzaType: 1,
                size: 20,
            }),
            generateProductItem({
                productId: pizza3.id,
                pizzaType: 2,
                size: 30,
            }),
            generateProductItem({
                productId: pizza3.id,
                pizzaType: 2,
                size: 40,
            }),

            generateProductItem({
                productId: 1,
            }),
            generateProductItem({
                productId: 2,
            }),
            generateProductItem({
                productId: 3,
            }),
            generateProductItem({
                productId: 4,
            }),
            generateProductItem({
                productId: 5,
            }),
            generateProductItem({
                productId: 6,
            }),
            generateProductItem({
                productId: 7,
            }),
            generateProductItem({
                productId: 8,
            }),
            generateProductItem({
                productId: 9,
            }),
            generateProductItem({
                productId: 10,
            }),
            generateProductItem({
                productId: 11,
            }),
            generateProductItem({
                productId: 12,
            }),
            generateProductItem({
                productId: 13,
            }),
            generateProductItem({
                productId: 14,
            }),
            generateProductItem({
                productId: 15,
            }),
            generateProductItem({
                productId: 16,
            }),
            generateProductItem({
                productId: 17,
            }),
        ],
    });
    await prisma.story.createMany({
        data: [
            {
                previewImageUrl:
                    'https://images.unsplash.com/photo-1589187151053-5ec8818e661b?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            },
            {
                previewImageUrl:
                    'https://images.unsplash.com/photo-1529133396358-0f5f0c4a1c8a?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            },
            {
                previewImageUrl:
                    'https://images.unsplash.com/photo-1529312266912-b33cfce2eefd?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            },
            {
                previewImageUrl:
                    'https://images.unsplash.com/photo-1578880711837-b028df1bcd06?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            },
            {
                previewImageUrl:
                    'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            },
            {
                previewImageUrl:
                    'https://images.unsplash.com/photo-1586985289071-36f62f55ce44?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            },
        ],
    });

    await prisma.storyItem.createMany({
        data: [
            {
                storyId: 1,
                sourceUrl:
                    'https://images.unsplash.com/photo-1525518392674-39ba1fca2ec2?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            },
            {
                storyId: 1,
                sourceUrl:
                    'https://images.unsplash.com/photo-1600628421055-4d30de868b8f?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            },
            {
                storyId: 1,
                sourceUrl:
                    'https://images.unsplash.com/photo-1558138838-76294be30005?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            },
            {
                storyId: 1,
                sourceUrl:
                    'https://images.unsplash.com/photo-1562103608-104fa5589661?q=80&w=2667&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            },
            {
                storyId: 1,
                sourceUrl:
                    'https://images.unsplash.com/photo-1550401728-539ebf40d9e9?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            },
            {
                storyId: 2,
                sourceUrl:
                    'https://images.unsplash.com/photo-1522825309746-56b2fadbea4c?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            },
            {
                storyId: 2,
                sourceUrl:
                    'https://images.unsplash.com/photo-1511081692775-05d0f180a065?q=80&w=2848&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            },
            {
                storyId: 2,
                sourceUrl:
                    'https://images.unsplash.com/photo-1550401728-539ebf40d9e9?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            },
            {
                storyId: 3,
                sourceUrl:
                    'https://images.unsplash.com/photo-1514537099923-4c0fc7c73161?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            },
            {
                storyId: 3,
                sourceUrl:
                    'https://images.unsplash.com/photo-1572357176061-7c96fd2af22f?q=80&w=2835&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            },
            {
                storyId: 4,
                sourceUrl:
                    'https://images.unsplash.com/photo-1684864115205-242c064363e6?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            },
            {
                storyId: 4,
                sourceUrl:
                    'https://images.unsplash.com/photo-1597918639400-4de2bb3e0719?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            },
            {
                storyId: 4,
                sourceUrl:
                    'https://images.unsplash.com/photo-1535567952412-219226693102?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            },
            {
                storyId: 4,
                sourceUrl:
                    'https://images.unsplash.com/photo-1633436375795-12b3b339712f?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            },
            {
                storyId: 5,
                sourceUrl:
                    'https://images.unsplash.com/photo-1530610476181-d83430b64dcd?q=80&w=2835&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            },
            {
                storyId: 5,
                sourceUrl:
                    'https://images.unsplash.com/photo-1500315331616-db4f707c24d1?q=80&w=2919&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            },
            {
                storyId: 5,
                sourceUrl:
                    'https://images.unsplash.com/photo-1604881748185-46bff830c5f8?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            },
            {
                storyId: 6,
                sourceUrl:
                    'https://images.unsplash.com/photo-1595981266586-1541a5a4307f?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            },
            {
                storyId: 6,
                sourceUrl:
                    'https://images.unsplash.com/photo-1639536564468-ac3900552994?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            },
        ],
    });

    await prisma.cart.createMany({
        data: [
            {
                userId: 1,
                totalAmount: 0,
                token: '12345',
            },
            {
                userId: 2,
                totalAmount: 0,
                token: '1234578',
            },
        ],
    });

    await prisma.cartItem.create({
        data: {
            productItemId: 1,
            cartId: 1,
            quantity: 2,
            ingredients: {
                connect: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
            },
        },
    });
}

//clean
async function down() {
    await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Story" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "StoryItem" RESTART IDENTITY CASCADE`;
}

async function main() {
    try {
        await down();
        await up();
    } catch (e) {
        console.error(e);
    }
}
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
