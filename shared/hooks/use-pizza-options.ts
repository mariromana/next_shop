import React from 'react';
import { PizzaSize, PizzaType } from '../constants/pizza';
import { Variant } from '../components/shared/select-variants';
import { useSet } from 'react-use';
import { getAvailablePizzaSizes } from '../lib';
import { ProductItem } from '@prisma/client';

interface ReturnProps {
    size: PizzaSize;
    type: PizzaType;
    setSize: (size: PizzaSize) => void;
    setType: (type: PizzaType) => void;
    selectedIngredients: Set<number>;
    addIngredient: (id: number) => void;
    availableSizes: Variant[];
    currentItemId?: number;
}

/**
 * Returns an object with the following properties:
 * - `size`: The currently selected pizza size.
 * - `type`: The currently selected pizza type.
 * - `setSize`: A function to set the pizza size.
 * - `setType`: A function to set the pizza type.
 * - `selectedIngredients`: A set of IDs of the currently selected ingredients.
 * - `addIngredient`: A function to add an ingredient to the selected ingredients.
 * - `availableSizes`: A list of available pizza sizes for the currently selected pizza type.
 *
 * The `setSize` function will automatically set the size to the first available size if the current size is no longer available.
 * The `setType` function will automatically set the size to the first available size if the current size is no longer available.
 * The `addIngredient` function will add an ingredient to the selected ingredients and automatically remove it if it is already selected.
 * @example usePizzaOptions(items)
 * @param items The list of products to use for calculating the available pizza sizes.
 * @returns An object with the above properties.
 */
export const usePizzaOptions = (items: ProductItem[]): ReturnProps => {
    const [size, setSize] = React.useState<PizzaSize>(20);
    const [type, setType] = React.useState<PizzaType>(1);
    const availableSizes = getAvailablePizzaSizes(type, items);
    const [selectedIngredients, { toggle: addIngredient }] = useSet(
        new Set<number>([])
    );
    const currentItemId = items.find(
        (item) => item.pizzaType === type && item.size === size
    )?.id;
    React.useEffect(() => {
        const isAvailableSize = availableSizes?.find(
            (item) => Number(item.value) === size && !item.disabled
        );
        const availableSize = availableSizes?.find((item) => !item.disabled);
        if (!isAvailableSize && availableSize) {
            setSize(Number(availableSize.value) as PizzaSize);
        }
    }, [type]);

    return {
        size,
        type,
        setSize,
        setType,
        selectedIngredients,
        addIngredient,
        availableSizes,
        currentItemId,
    };
};
