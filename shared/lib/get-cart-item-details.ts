import { Ingredient } from '@prisma/client';
import { mapPizzaType, PizzaSize, PizzaType } from '../constants/pizza';
import { CartState } from '../store';
import { CartStateItem } from './get-cart-details';

/**
 * Returns a string with the details of the given pizza in a cart item.
 *
 * The format is as follows:
 * - If the pizza size and type are given, the format is:
 *   `<pizzaSize> cm - <typeName>`
 * - If the pizza size and type are not given, the format is:
 *   `<ingredient1>, <ingredient2>, ...`
 *
 * @example getCartItemsDetails(1, 20, []) // '20 cm - Traditional'
 * @example getCartItemsDetails(1, 20, [{ name: 'Cheese Crust' }]) // '20 cm - Traditional, Cheese Crust'
 * @example getCartItemsDetails(1, undefined, [{ name: 'Cheese Crust' }]) // 'Cheese Crust'
 * @example getCartItemsDetails(1, 20, [{ name: 'Cheese Crust' }, { name: 'Mushrooms' }]) // '20 cm - Traditional, Cheese Crust, Mushrooms'
 *
 * @param pizzaType - The type of the pizza.
 * @param pizzaSize - The size of the pizza.
 * @param ingredients - The ingredients of the pizza.
 * @returns A string with the details of the given pizza in a cart item.
 */

export const getCartItemDetails = (
    ingredients: CartStateItem['ingredients'],
    pizzaType: PizzaType,
    pizzaSize: PizzaSize
): string => {
    const details = [];

    if (pizzaSize && pizzaType) {
        const typeName = mapPizzaType[pizzaType];

        details.push(`${pizzaSize} cm - ${typeName}`);
    }

    if (ingredients) {
        details.push(...ingredients.map((item) => item.name));
    }

    return details.join(', ');
};
