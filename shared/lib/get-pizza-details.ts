import { Ingredient, ProductItem } from '@prisma/client';
import { mapPizzaType, PizzaSize, PizzaType } from '../constants/pizza';
import { calcTotalPizzaPrice } from './calc-total-pizza-price';

/**
 * Returns an object with the total price of the pizza and a text description
 * of the pizza details.
 * @example getPizzaDetails(1, 20, [], [], new Set())
 * @param type - The type of the pizza.
 * @param size - The size of the pizza.
 * @param items - The list of product items.
 * @param ingredients - The list of ingredients.
 * @param selectedIngredients - The set of selected ingredients.
 * @returns An object with the total price of the pizza and a text description
 * of the pizza details.
 */
export const getPizzaDetails = (
    type: PizzaType,
    size: PizzaSize,
    items: ProductItem[],
    ingredients: Ingredient[],
    selectedIngredients: Set<number>
) => {
    const totalPrice = calcTotalPizzaPrice(
        type,
        size,
        items,
        ingredients,
        selectedIngredients
    );

    const textDetails = `${size} sm, ${
        mapPizzaType[type]
    } pizza, added ingredirents:  ${0 || selectedIngredients.size}`;

    return {
        totalPrice,
        textDetails,
    };
};
