import React from 'react';

interface Props {
    orderId: number;
    totalAmount: number;
    paymentUrl?: string;
}

export const PayOrderTemplate: React.FC<Props> = ({
    orderId,
    totalAmount,
    paymentUrl,
}) => (
    <div>
        <h1>Order #{orderId}</h1>
        <p>
            Please, pay for the ordder in the amount of: {totalAmount}$.
            {/* <a href={paymentUrl}> Please, follow this link</a> for payment */}
        </p>
    </div>
);
