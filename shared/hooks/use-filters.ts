import { useRouter, useSearchParams } from 'next/navigation';
import { useSet } from 'react-use';

import React, { useMemo } from 'react';
interface PriceProps {
    priceFrom?: number;
    priceTo?: number;
}

interface QueryFilters extends PriceProps {
    pizzaTypes: string;
    sizes: string;
    ingredients: string;
}

export interface Filters {
    sizes: Set<string>;
    pizzaTypes: Set<string>;
    selectedId: Set<string>;
    prices: PriceProps;
}

interface ReturnProps extends Filters {
    setPrices: (name: keyof PriceProps, value: number) => void;
    setPizzaTypes: (value: string) => void;
    setSizes: (value: string) => void;
    setSelectedIngredients: (value: string) => void;
}

export const useFilters = (): ReturnProps => {
    const searchParams = useSearchParams() as unknown as Map<
        keyof QueryFilters,
        string
    >;

    // filter ingredients
    const [selectedId, { toggle: toogleIngredients }] = useSet(
        new Set<string>(searchParams.get('ingredients')?.split(','))
    );
    // filter sizes
    const [sizes, { toggle: toogleSizes }] = useSet(
        new Set<string>(
            searchParams.has('sizes')
                ? searchParams.get('sizes')?.split(',')
                : []
        )
    );
    // filter pizzatypes
    const [pizzaTypes, { toggle: tooglePizzaTypes }] = useSet(
        new Set<string>(
            searchParams.has('pizzaTypes')
                ? searchParams.get('pizzaTypes')?.split(',')
                : []
        )
    );

    // filter prices
    const [prices, setPrices] = React.useState<PriceProps>({
        priceFrom: Number(searchParams.get('priceFrom')) || undefined,
        priceTo: Number(searchParams.get('priceTo')) || undefined,
    });

    const updatePrice = (name: keyof PriceProps, value: number) => {
        setPrices((prev) => ({ ...prev, [name]: value }));
    };

    return useMemo(
        () => ({
            sizes,
            pizzaTypes,
            selectedId,
            prices,
            setPrices: updatePrice,
            setPizzaTypes: tooglePizzaTypes,
            setSizes: toogleSizes,
            setSelectedIngredients: toogleIngredients,
        }),
        [selectedId, pizzaTypes, prices, sizes, selectedId]
    );
};
