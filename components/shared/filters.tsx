'use client';
import React from 'react';
import { Title } from './title';
import { Input } from '../ui';
import { RangeSlider } from './range-slide';
import { CheckboxFilterGroup } from './checkbox-filters-group';
import { useFilters, useIngredients, useQueryFilters } from '@/hooks';

interface Props {
    className?: string;
}

interface PriceProps {
    priceFrom?: number;
    priceTo?: number;
}

interface QueryFilters extends PriceProps {
    pizzaTypes: string;
    sizes: string;
    ingredients: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
    const { ingredients, loading } = useIngredients();
    const filter = useFilters();

    useQueryFilters(filter);

    const items = ingredients.map((item) => ({
        value: String(item.id),
        text: item.name,
    }));

    const updatePrices = (prices: number[]) => {
        filter.setPrices('priceFrom', prices[0]);
        filter.setPrices('priceTo', prices[1]);
    };

    return (
        <div className={className}>
            <Title text="Filter" size="sm" className="mt-5 font-bold mb-3" />

            <CheckboxFilterGroup
                name="pizzaTypes"
                className="mb-5"
                title="Pizza types"
                onClickCheckbox={filter.setPizzaTypes}
                selectedId={filter.pizzaTypes}
                items={[
                    { text: 'thin dough', value: '0' },

                    { text: 'traditional', value: '2' },
                ]}
            />
            <CheckboxFilterGroup
                name="sizes"
                className="mb-5"
                title="Sizes"
                onClickCheckbox={filter.setSizes}
                selectedId={filter.sizes}
                items={[
                    { text: '20cm', value: '20' },
                    { text: '30cm', value: '30' },
                    { text: '40cm', value: '40' },
                ]}
            />

            <div className="mt-5 border-y-neutral-100 py-6 pb-6">
                <p className="font-bold mb-3">Price from and to</p>
                <div className="flex gap-3 mb-5">
                    <Input
                        type="number"
                        placeholder="0"
                        min={0}
                        max={100}
                        value={String(filter.prices.priceFrom)}
                        onChange={(e) =>
                            filter.setPrices(
                                'priceFrom',
                                Number(e.target.value)
                            )
                        }
                    />
                    <Input
                        type="number"
                        placeholder="100"
                        min={10}
                        max={100}
                        value={String(filter.prices.priceTo)}
                        onChange={(e) =>
                            filter.setPrices('priceTo', Number(e.target.value))
                        }
                    />
                </div>
                <RangeSlider
                    min={0}
                    max={100}
                    step={5}
                    value={[
                        filter.prices.priceFrom || 0,
                        filter.prices.priceTo || 100,
                    ]}
                    onValueChange={updatePrices}
                />
            </div>

            <CheckboxFilterGroup
                name="ingredients"
                title="Ingredients"
                className="mt-5"
                limit={6}
                defaultItems={items.slice(0, 6)}
                items={items}
                loading={loading}
                onClickCheckbox={filter.setSelectedIngredients}
                selectedId={filter.selectedId}
            />
        </div>
    );
};
