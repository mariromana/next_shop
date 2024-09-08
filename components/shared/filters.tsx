import React from 'react';
import { Title } from './title';
import { FilterCheckbox } from './filter-checkbox';
import { Input } from '../ui';
import { RangeSlider } from './range-slide';
import { CheckboxFilterGroup } from './checkbox-filters-group';
interface Props {
    className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
    return (
        <div className={className}>
            <Title text="Filter" size="sm" className="mt-5 font-bold mb-3" />

            <div className="flex flex-col gap-4">
                <FilterCheckbox text="Can be collected" value="1" />
                <FilterCheckbox text="News" value="2" />
            </div>

            <div className="mt-5 border-y-neutral-100 py-6 pb-6">
                <p className="font-bold mb-3">Price from and to</p>
                <div className="flex gap-3 mb-5">
                    <Input
                        type="number"
                        placeholder="0"
                        min={0}
                        max={100}
                        defaultValue={0}
                    />
                    <Input type="number" placeholder="100" min={10} max={100} />
                </div>
                <RangeSlider min={0} max={100} step={5} value={[0, 100]} />
            </div>

            <CheckboxFilterGroup
                title="Ingredients"
                className="mt-5"
                limit={6}
                defaultItems={[
                    { text: 'Cheese soius', value: '1' },
                    { text: 'Mozzarela', value: '2' },
                    { text: 'Garlic', value: '3' },
                    { text: 'Cucumbers', value: '4' },
                    { text: 'Onion', value: '5' },
                    { text: 'Tomato', value: '1' },
                ]}
                items={[
                    { text: 'Cheese soius', value: '1' },
                    { text: 'Mozzarela', value: '2' },
                    { text: 'Garlic', value: '3' },
                    { text: 'Cucumbers', value: '4' },
                    { text: 'Onion', value: '5' },
                    { text: 'Tomato', value: '6' },
                    { text: 'Garlic', value: '3' },
                    { text: 'Cucumbers', value: '4' },
                    { text: 'Onion', value: '5' },
                    { text: 'Tomato', value: '6' },
                    { text: 'Tomato', value: '6' },
                    { text: 'Garlic', value: '3' },
                    { text: 'Cucumbers', value: '4' },
                    { text: 'Onion', value: '5' },
                    { text: 'Tomato', value: '6' },
                ]}
            />
        </div>
    );
};
