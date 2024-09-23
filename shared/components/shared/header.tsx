import React from 'react';
import { cn } from '@/shared/lib/utils';
import { Container } from './container';
import { Button } from '../ui';
import { User, ShoppingCart, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { SearchInput } from './search-input';
import { CartButton } from './cart-button';

interface Props {
    className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
    return (
        <header className={cn('border border-b', className)}>
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

                <div className="mx-10 flex-1">
                    <SearchInput />
                </div>

                {/* {правая часть} */}
                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        className="flex items-center gap-1"
                    >
                        Log in
                        <User size={16} />
                    </Button>

                    <div>
                        <CartButton />
                    </div>
                </div>
            </Container>
        </header>
    );
};
