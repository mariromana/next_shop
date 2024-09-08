'use client';
import React from 'react';
import { FilterChecboxProps } from './filter-checkbox';
import { FilterCheckbox } from './filter-checkbox';
import { Input } from '../ui';
type Item = FilterChecboxProps;

interface Props {
    title: string;
    items: Item[];
    defaultItems: Item[];
    limit?: number;
    searchInputPlaceholder?: string;
    onChange?: (values: string[]) => void;
    defaultValue?: string[];
    className?: string;
}

export const CheckboxFilterGroup: React.FC<Props> = ({
    title,
    items,
    defaultItems,
    limit = 5,
    searchInputPlaceholder = 'Find...',
    onChange,
    defaultValue,
    className,
}) => {
    const [showAll, setShowAll] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState('');

    const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const list = showAll
        ? items.filter((item) =>
              item.text.toLowerCase().includes(searchValue.toLowerCase())
          )
        : defaultItems.slice(0, limit);
    return (
        <div className={className}>
            <p className="font-bold mb-3">{title}</p>

            {showAll && (
                <div className="mb-5">
                    <Input
                        placeholder={searchInputPlaceholder}
                        className="bg-gray-50 border-none"
                        onChange={onChangeSearchInput}
                    />
                </div>
            )}
            <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
                {list.map((item, i) => (
                    <FilterCheckbox
                        key={i}
                        onCheckedChange={(ids) => console.log(ids)}
                        checked={false}
                        value={item.value}
                        text={item.text}
                        endAdornment={item.endAdornment}
                    />
                ))}

                {items.length > limit && (
                    <div
                        className={
                            showAll ? 'border-t border-t-neutral-100 mt-4' : ''
                        }
                    >
                        <button
                            onClick={() => setShowAll(!showAll)}
                            className="text-primary mt-5"
                        >
                            {showAll ? 'Hide' : 'Show all'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
