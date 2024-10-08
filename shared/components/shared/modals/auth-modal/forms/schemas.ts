import { z } from 'zod';

const passwordSchema = z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' });

export const formLoginSchema = z.object({
    email: z.string().email({ message: 'Invalid email' }),
    password: passwordSchema,
});

export const formRegisterSchema = formLoginSchema
    .merge(
        z.object({
            fullName: z.string().min(2, { message: 'Name is required' }),
            passwordConfirmation: passwordSchema,
        })
    )
    .refine((data) => data.password === data.passwordConfirmation, {
        message: 'Passwords do not match',
        path: ['passwordConfirmation'],
    });

export type TLoginForm = z.infer<typeof formLoginSchema>;
export type TRegisterForm = z.infer<typeof formRegisterSchema>;
