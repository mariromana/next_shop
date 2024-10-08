import React from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { formLoginSchema, TLoginForm } from './schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Title } from '../../../title';
import { FormInput } from '../../../form-components';
import { Button } from '@/shared/components/ui';
import toast from 'react-hot-toast';
import { useSession, signIn, signOut } from 'next-auth/react';
interface Props {
    onClose?: VoidFunction;
}
export const LoginForm: React.FC<Props> = ({ onClose }) => {
    const form = useForm<TLoginForm>({
        resolver: zodResolver(formLoginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (data: TLoginForm) => {
        try {
            const resp = await signIn('credentials', {
                ...data,
                redirect: false,
            });

            if (!resp?.ok) {
                throw Error();
            }

            toast.success('Login successful', {
                icon: '✅',
            });
            onClose?.();
        } catch (error) {
            console.log('Error [Login]', error);
            toast.error('Failed to login', {
                icon: '🚨',
            });
        }
    };
    return (
        <FormProvider {...form}>
            <form
                className="flex flex-col gap-5"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <div className="flex justify-between items-center">
                    <div className="mr-2">
                        <Title className="font-bold" text="Login" size="md" />
                        <p className="text-gray-400">
                            Enter your email and password to login
                        </p>
                    </div>

                    <img
                        src="/assets/images/phone-icon.png"
                        alt="phone-icon"
                        width={60}
                        height={60}
                    />
                </div>

                <FormInput name="email" label="Email" required />
                <FormInput
                    name="password"
                    label="Password"
                    type="password"
                    required
                />

                <Button
                    loading={form.formState.isSubmitting}
                    type="submit"
                    className="text-base h-12"
                >
                    Login
                </Button>
            </form>
        </FormProvider>
    );
};
