'use client';

import React from 'react';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

interface Props {
    onChange?: (value?: string) => void;
}

export const AdressInput: React.FC<Props> = ({ onChange }) => {
    return (
        <AddressSuggestions
            token="a5356ad4ee3f5f561ccd2dec001f0d3733de6a3b"
            onChange={(data) => onChange?.(data?.value)}
        />
    );
};
