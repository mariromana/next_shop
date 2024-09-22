'use client';
import React from 'react';
import { cn } from '@/shared/lib/utils';

import Link from 'next/link';
import { Category } from '@prisma/client';
import { useCategoryStore } from '@/shared/store/category';
interface Props {
    className?: string;
    items: Category[];
}

export const Categories: React.FC<Props> = ({ items, className }) => {
    const categoryActiveId = useCategoryStore((state) => state.activeId);
    return (
        <div
            className={cn(
                'inline-flex gap-1 bg-gray-50 p-1 rounded-2xl',
                className
            )}
        >
            {items.map(({ name, id }, i) => (
                <a
                    key={i}
                    className={cn(
                        'flex items-center font-bold h-11 rounded-2xl px-5',
                        categoryActiveId === id &&
                            'bg-white shadow-md shadow-gray-200 text-primary'
                    )}
                    href={`/#${name}`}
                >
                    <button>{name}</button>
                </a>
            ))}
        </div>
    );
};
