'use client';
import { Container, Title } from '@/shared/components/shared';
import { useRouter } from 'next/navigation';
import { Button } from '@/shared/components';

export default function PaymentPage() {
    const router = useRouter();

    const handleGoBack = () => {
        router.push('/');
    };

    return (
        <Container className="mt-6 flex justify-center items-center">
            <div className="text-center bg-white shadow-lg p-8 rounded-lg">
                <Title
                    text="Order paid"
                    size="lg"
                    className="font-extrabold mb-8"
                />
                <p className="mb-6">
                    Thank you for your order! We have sent a confirmation to
                    your email.
                </p>
                <Button onClick={handleGoBack} className="mt-4">
                    Return to home page
                </Button>
            </div>
        </Container>
    );
}
