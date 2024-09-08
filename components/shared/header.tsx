import React from 'react';
import { cn } from '@/lib/utils';
import { Container } from './container';
import { Button } from '../ui';
import { User, ShoppingCart, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { SearchInput } from './search-input';
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
                        <Button className="group relative">
                            <b>100$</b>
                            <span className="h-full w-[1px] bg-white/30 mx-3" />

                            <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
                                <ShoppingCart
                                    size={16}
                                    className="relative"
                                    strokeWidth={2}
                                />
                                <b>0</b>
                            </div>
                            <ArrowRight
                                size={20}
                                className="absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                            />
                        </Button>
                    </div>
                </div>
            </Container>
        </header>
    );
};
