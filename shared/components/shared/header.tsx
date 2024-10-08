'use client';
import React from 'react';
import { cn } from '@/shared/lib/utils';
import { Container } from './container';
import { Button } from '../ui';
import { User, ShoppingCart, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { SearchInput } from './search-input';
import { CartButton } from './cart-button';
import { search } from '@/shared/services/products';
import { useSearchParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useSession, signIn, signOut } from 'next-auth/react';
import { ProfileButton } from './profile-button';
import { AuthModal } from './modals';

interface Props {
    className?: string;
    hasSearch?: boolean;
    hasCart?: boolean;
}

export const Header: React.FC<Props> = ({
    className,
    hasSearch = true,
    hasCart = true,
}) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [openAuthModal, setOpenAuthModal] = React.useState(false);
    React.useEffect(() => {
        let toastMessage = '';
        if (searchParams.has('paid')) {
            toastMessage =
                'Payment successfull. Information was sent to your email';
        }

        if (searchParams.has('verified')) {
            toastMessage = 'Email was confirmed.';
        }

        if (toastMessage) {
            setTimeout(() => {
                router.replace('/');
                toast.success(toastMessage, {
                    duration: 3000,
                });
            }, 1000);
        }
        //todo route
    }, []);
    return (
        <header className={cn(' border-b', className)}>
            <Container className="flex items-center justify-between py-8">
                {/* {левая часть} */}

                <Link href={'/'}>
                    <div className="flex items-center gap-4">
                        <Image
                            src="/logo.png"
                            width={35}
                            height={35}
                            alt="Logo"
                        />
                        <div>
                            <h1 className="text-2xl uppercase font-black">
                                Next Shop
                            </h1>
                            <p className="text-sm text-gray-400 leading-3">
                                It doesn't get any tastier
                            </p>
                        </div>
                    </div>
                </Link>
                {hasSearch && (
                    <div className="mx-10 flex-1">
                        <SearchInput />
                    </div>
                )}

                {/* {правая часть} */}
                <div className="flex items-center gap-3">
                    <AuthModal
                        open={openAuthModal}
                        onClose={() => setOpenAuthModal(false)}
                    />
                    <ProfileButton
                        onClickSingIn={() => setOpenAuthModal(true)}
                    />

                    {hasCart && (
                        <div>
                            <CartButton />
                        </div>
                    )}
                </div>
            </Container>
        </header>
    );
};
