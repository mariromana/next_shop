import React from 'react';
import { WhiteBlock } from '../white-block';
import { CheckoutDetails } from '../checkout-details';
import { ArrowRight, Package, Percent, Truck } from 'lucide-react';
import { Button, Skeleton } from '../../ui';

interface Props {
    totalAmount: number;
    loading?: boolean;
}

const VAT = 23;
const DELIVERY_PRICE = 20;

export const CheckoutSidebar: React.FC<Props> = ({ totalAmount, loading }) => {
    const taxAmount = (totalAmount * VAT) / 100;
    const deliveryPrice = totalAmount > 0 ? DELIVERY_PRICE : 0;
    const total = totalAmount + deliveryPrice;

    return (
        <WhiteBlock className="p-6 sticky top-4">
            <div className="flex flex-col gap-1">
                <span className="text-xl">Total:</span>
                {loading ? (
                    <Skeleton className="w-48 h-11" />
                ) : (
                    <span className=" h-11 text-[32px] font-extrabold">
                        {total} $
                    </span>
                )}

                <CheckoutDetails
                    title={
                        <div className="flex items-center">
                            <Package size={18} className="mr-2 text-gray-300" />
                            Price:
                        </div>
                    }
                    value={
                        loading ? (
                            <Skeleton className="w-24 h-6" />
                        ) : (
                            `${totalAmount} $`
                        )
                    }
                />
                <CheckoutDetails
                    title={
                        <div className="flex items-center">
                            <Percent size={18} className="mr-2 text-gray-300" />
                            Tax:
                        </div>
                    }
                    value={
                        loading ? (
                            <Skeleton className="w-24 h-6" />
                        ) : (
                            `${taxAmount} $`
                        )
                    }
                />
                <CheckoutDetails
                    title={
                        <div className="flex items-center">
                            <Truck size={18} className="mr-2 text-gray-300" />
                            Delivery:
                        </div>
                    }
                    value={
                        loading ? (
                            <Skeleton className="w-24 h-6" />
                        ) : (
                            `${deliveryPrice} $`
                        )
                    }
                />
            </div>
            <Button
                type="submit"
                className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
            >
                Proceed to payment
                <ArrowRight size={18} className="w-5 ml-2" />
            </Button>
        </WhiteBlock>
    );
};
