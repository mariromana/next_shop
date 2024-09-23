import React from 'react';
import { Title } from './title';

import { cn } from '@/shared/lib/utils';
import { Button } from '../ui';
interface Props {
    className?: string;
    name: string;
    imageUrl: string;
    onSubmit?: VoidFunction;
    price: number;
    loading?: boolean;
}
export const ChooseProductForm: React.FC<Props> = ({
    imageUrl,
    onSubmit,
    name,
    className,
    price,
    loading,
}) => {
    return (
        <div className={cn(className, 'flex flex-1')}>
            <div className="flex items-center justify-center flex-1 relative w-full">
                <img
                    src={imageUrl}
                    alt={name}
                    className="relative left-2 top-2 transition-all z-10 duration-300 w-[300px] h-[300px]"
                />
            </div>

            <div className="w-[490px] bg-[#f7f6f5] p-7">
                <Title text={name} size="md" className="font-extrabold mb-1" />

                <Button
                    loading={loading}
                    onClick={() => onSubmit?.()}
                    className="h-[55px] px-10 text-base rounded-[18px] w-full mt-5"
                >
                    Add to cart {price}
                </Button>
            </div>
        </div>
    );
};
