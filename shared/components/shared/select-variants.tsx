'use client';
import React from 'react';
import { cn } from '@/shared/lib/utils';
interface Props {
    items: readonly Variant[];
    className?: string;
    onClick?: (value: Variant['value']) => void;
    value?: Variant['value'];
}

export type Variant = {
    name: string;
    value: string;
    disabled?: boolean;
};

export const SelectVariants: React.FC<Props> = ({
    items,
    onClick,
    value,
    className,
}) => {
    return (
        <div
            className={cn(
                className,
                'flex justify-between bg-[#F3F3F7] rounded-3xl p-1 select-none'
            )}
        >
            {items.map((item) => (
                <button
                    className={cn(
                        'flex items-center justify-center cursor-pointer h-[30px] px-5 flex-1 rounded-3xl transition-all duration-400 text-sm',
                        {
                            'bg-white shadow': item.value === value,
                            'text-gray-500 opacity-50 pointer-events-none':
                                item.disabled,
                        }
                    )}
                    key={item.name}
                    onClick={() => onClick?.(item.value)}
                >
                    {item.name}
                </button>
            ))}
        </div>
    );
};
