import { ProductItem, Ingredient } from '@prisma/client';
import { PizzaSize, PizzaType } from '../constants/pizza';

/**
 * Function for calc total pizza price.
 * @example calcTotalPizzaPrice(1, 20, [], [], new Set())
 * @param type - The type of the pizza.
 * @param size - The size of the pizza.
 * @param items - The list of product items.
 * @param ingredients - The list of ingredients.
 * @param selectedIngredients - The set of selected ingredients.
 * @returns The total price of the pizza.
 */
export const calcTotalPizzaPrice = (
    type: PizzaType,
    size: PizzaSize,
    items: ProductItem[],
    ingredients: Ingredient[],
    selectedIngredients: Set<number>
) => {
    const pizzaPrice =
        items.find((item) => item.pizzaType === type && item.size === size)
            ?.price || 0;

    const totalIngredientsPrice = ingredients
        .filter((ing) => selectedIngredients.has(ing.id))
        .reduce((acc, ing) => acc + ing.price, 0);

    return pizzaPrice + totalIngredientsPrice;
};
