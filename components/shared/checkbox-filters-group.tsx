'use client';
import React from 'react';
import { FilterChecboxProps } from './filter-checkbox';
import { FilterCheckbox } from './filter-checkbox';
import { Input, Skeleton } from '../ui';

type Item = FilterChecboxProps;

interface Props {
    title: string;
    items: Item[];
    defaultItems?: Item[];
    limit?: number;
    loading?: boolean;
    searchInputPlaceholder?: string;
    onClickCheckbox?: (id: string) => void;
    defaultValue?: string[];
    className?: string;
    selectedId?: Set<string>;
    name?: string;
}

export const CheckboxFilterGroup: React.FC<Props> = ({
    title,
    items,
    defaultItems,
    limit = 5,
    searchInputPlaceholder = 'Find...',
    onClickCheckbox,
    defaultValue,
    className,
    selectedId,
    loading,
    name,
}) => {
    const [showAll, setShowAll] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState('');

    const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    if (loading) {
        return (
            <div className={className}>
                <p className="font-bold mb-3">{title}</p>
                {...Array(limit)
                    .fill(0)
                    .map((_, i) => <Skeleton key={i} className="h-6 mb-4" />)}
                <Skeleton className="w-28 h-6 mb-4" />
            </div>
        );
    }
    const list = showAll
        ? items.filter((item) =>
              item.text.toLowerCase().includes(searchValue.toLowerCase())
          )
        : (defaultItems || items).slice(0, limit);
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
                        onCheckedChange={() => onClickCheckbox?.(item.value)}
                        checked={selectedId?.has(item.value)}
                        value={item.value}
                        text={item.text}
                        endAdornment={item.endAdornment}
                        name={name}
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
