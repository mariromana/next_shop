'use client';

import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { Button } from '@/shared/components/ui';
import { FormInput } from '../../../form-components';
import { formRegisterSchema, TRegisterForm } from './schemas';
import { registerUser } from '@/app/actions';

interface Props {
    onClose?: VoidFunction;
    onClickLogin?: VoidFunction;
}

export const RegisterForm: React.FC<Props> = ({ onClose, onClickLogin }) => {
    const form = useForm<TRegisterForm>({
        resolver: zodResolver(formRegisterSchema),
        defaultValues: {
            email: '',
            fullName: '',
            password: '',
            passwordConfirmation: '',
        },
    });

    const onSubmit = async (data: TRegisterForm) => {
        try {
            await registerUser({
                email: data.email,
                fullName: data.fullName,
                password: data.password,
            });

            toast.error('Registration successful', {
                icon: '✅',
            });

            onClose?.();
        } catch (error) {
            return toast.error('Failed to register', {
                icon: '❌',
            });
        }
    };

    return (
        <FormProvider {...form}>
            <form
                className="flex flex-col gap-5"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <FormInput name="email" label="E-Mail" required />
                <FormInput name="fullName" label="Full Name" required />
                <FormInput
                    name="password"
                    label="Password"
                    type="password"
                    required
                />
                <FormInput
                    name="passwordConfirmation"
                    label="Confirm Password"
                    type="password"
                    required
                />

                <Button
                    loading={form.formState.isSubmitting}
                    className="h-12 text-base"
                    type="submit"
                >
                    Register
                </Button>
            </form>
        </FormProvider>
    );
};
