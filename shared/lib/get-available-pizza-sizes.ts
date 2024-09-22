import { ProductItem } from '@prisma/client';
import { pizzaSizes, PizzaType } from '../constants/pizza';
import { Variant } from '../components/shared/select-variants';

/**
 * Given a pizza type and a list of product items, returns a list of pizza size
 * options that are available for the given pizza type.
 *@example getAvailablePizzaSizes(1, [{ size: 20, pizzaType: 1 }, { size: 30, pizzaType: 1 }])
 * @param type - The type of pizza to filter by.
 * @param items - The list of product items to filter through.
 * @returns A list of pizza size options where the disabled property indicates
 * whether or not the size is available for the given pizza type.
 */

export const getAvailablePizzaSizes = (
    type: PizzaType,
    items: ProductItem[]
): Variant[] => {
    const filteredPizzasType = items.filter((item) => item.pizzaType === type);
    return pizzaSizes.map((item) => ({
        name: item.name,
        value: item.value,
        disabled: !filteredPizzasType.some(
            (pizza) => Number(pizza.size) === Number(item.value)
        ),
    }));
};
