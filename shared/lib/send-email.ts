import { Resend } from 'resend';
import { PayOrderTemplate } from '../components';
import React from 'react';

/**
 * Send an email using Resend.
 * @example sendEmail('5m6oB@example.com', 'Order Confirmation', <PayOrderTemplate orderId={1} totalAmount={100} paymentUrl={'https://example.com'} />)
 * @param to - The recipient's email address.
 * @param subject - The subject of the email.
 * @param template - The React component to be rendered as the email body.
 *
 * @returns The Sendinblue response.
 *
 * @throws If there is an error sending the email, this function will throw an error.
 */
export const sendEmail = async (
    to: string,
    subject: string,
    template: React.ReactNode
) => {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to,
        subject,
        react: template,
    });

    if (error) {
        throw new Error(error.message);
    }

    return data;
};
