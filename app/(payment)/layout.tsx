import { Container, Header } from '@/shared/components/shared';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Next Pizza | Cart',
    description: 'Generated by create next app',
};

export default function PaymentLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="min-h-screen bg-[#F4F1EE]">
            <Container>
                <Header
                    className="border-gray-200"
                    hasSearch={false}
                    hasCart={false}
                />
                {children}
            </Container>
        </main>
    );
}
