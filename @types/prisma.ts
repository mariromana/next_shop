import { Ingredient, ProductItem, Product } from '@prisma/client';

export type ProductWithRelations = Product & {
    items: ProductItem[];
    ingredients: Ingredient[];
};
