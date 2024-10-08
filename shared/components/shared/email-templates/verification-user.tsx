import React from 'react';

interface Props {
    fullName?: string;
    code: string;
}

export const VerificationUserTemplate: React.FC<Props> = ({
    fullName,
    code,
}) => (
    <div>
        <h1>Hello, {fullName}</h1>
        <p>Your code: {code}</p>
        <p>
            <a href={`http://localhost:3000/api/auth/verify?code=${code}`}>
                Confirm your email
            </a>
        </p>
    </div>
);
