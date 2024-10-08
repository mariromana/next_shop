'use client';

import React from 'react';
import { WhiteBlock } from '../white-block';
import { FormTextarea } from '../form-components';
import { AdressInput } from '../adress-input';
import { Controller, useFormContext } from 'react-hook-form';
import { ErrorText } from '../error-text';

interface Props {
    className?: string;
}

export const CheckoutAdressForm: React.FC<Props> = ({ className }) => {
    const { control } = useFormContext();
    return (
        <WhiteBlock title="3. Address" className={className}>
            <div className="flex flex-col gap-5">
                <Controller
                    control={control}
                    name="address"
                    render={({ field, fieldState }) => (
                        <>
                            <AdressInput onChange={field.onChange} />
                            {fieldState.error?.message && (
                                <ErrorText text={fieldState.error.message} />
                            )}
                        </>
                    )}
                />

                <FormTextarea
                    className="text-base"
                    placeholder="Comments to the order"
                    rows={5}
                    name="comment"
                />
            </div>
        </WhiteBlock>
    );
};
