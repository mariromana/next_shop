'use client';
import React from 'react';
import {
    formRegisterSchema,
    TRegisterForm,
} from './modals/auth-modal/forms/schemas';
import { signOut } from 'next-auth/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { User } from '@prisma/client';
import toast from 'react-hot-toast';
import { Title } from './title';
import { Container } from './container';
import { FormInput } from './form-components';
import { Button } from '../ui/button';
import { updateUserInfo } from '@/app/actions';

interface Props {
    data: User;
}
export const ProfileForm: React.FC<Props> = ({ data }) => {
    const form = useForm({
        resolver: zodResolver(formRegisterSchema),
        defaultValues: {
            fullName: data.fullName,
            email: data.email,
            password: '',
            passwordConfirmation: '',
        },
    });

    const onSubmit = async (data: TRegisterForm) => {
        try {
            await updateUserInfo({
                email: data.email,
                fullName: data.fullName,
                password: data.password,
            });

            toast.error('Данные обновлены 📝', {
                icon: '✅',
            });
        } catch (error) {
            return toast.error('Ошибка при обновлении данных', {
                icon: '❌',
            });
        }
    };

    const onClickSignOut = () => {
        signOut({
            callbackUrl: '/',
        });
    };

    return (
        <Container className="my-10">
            <Title text={'Profile'} size="md" className="font-bold" />

            <FormProvider {...form}>
                <form
                    className="flex flex-col gap-5 w-96 mt-10"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <FormInput name="email" label="E-Mail" required />
                    <FormInput name="fullName" label="Полное имя" required />

                    <FormInput
                        type="password"
                        name="password"
                        label="New password"
                        required
                    />
                    <FormInput
                        type="password"
                        name="passwordConfirmation"
                        label="Confirm password"
                        required
                    />

                    <Button
                        disabled={form.formState.isSubmitting}
                        className="text-base mt-10"
                        type="submit"
                    >
                        Save
                    </Button>

                    <Button
                        onClick={onClickSignOut}
                        variant="secondary"
                        disabled={form.formState.isSubmitting}
                        className="text-base"
                        type="button"
                    >
                        Sign out
                    </Button>
                </form>
            </FormProvider>
        </Container>
    );
};
