export async function createPayment({
    amount,
    description,
    orderId,
}: {
    amount: number;
    description: string;
    orderId: number;
}) {
    return {
        id: String(Math.floor(Math.random() * 1000000)),
        status: 'success',
        confirmation: {
            confirmation_url: process.env.FAKE_PAYMENT_REDIRECT_URL,
        },
    };
}

// export async function createPayment(details: Props) {
//     const { data } = await axios.post<PaymentData>(
//         '/api/fake-payment',
//         {
//             amount: {
//                 value: details.amount,
//                 currency: 'USD',
//             },
//             capture: true,
//             description: details.description,
//             metadata: {
//                 orderId: details.orderId,
//             },
//             confirmation: {
//                 type: 'redirect',
//                 return_url: process.env.FAKE_PAYMENT_REDIRECT_URL,
//             },
//         },
//         {
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Idempotency-Key': Math.random().toString(36).substring(7),
//             },
//         }
//     );

//     return data;
// }
