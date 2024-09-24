import { z } from 'zod';

export const checkoutFormSchema = z.object({
    firstName: z
        .string()
        .min(1, { message: 'Name must be at least 1 character' }),
    lastName: z
        .string()
        .min(1, { message: 'Name must be at least 1 character' }),
    email: z.string().email({ message: 'Invalid email' }),
    phone: z.string().min(9, { message: 'Invalid phone number' }),
    address: z
        .string()
        .min(5, { message: 'Address must be at least 5 character' }),
    comment: z.string().optional(),
});

export type TCheckoutFormValues = z.infer<typeof checkoutFormSchema>;
