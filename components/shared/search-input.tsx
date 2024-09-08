'use client';
import { useClickAway } from 'react-use';
import React from 'react';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Api } from '@/services/api-client';
interface Props {
    className?: string;
}

export const SearchInput: React.FC<Props> = ({ className }) => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [focused, setFocused] = React.useState(false);
    const ref = React.useRef(null);

    useClickAway(ref, () => {
        setFocused(false);
    });

    React.useEffect(() => {
        Api.products.search(searchQuery);
    }, [searchQuery]);

    return (
        <>
            {focused && (
                <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30"></div>
            )}
            <div
                ref={ref}
                className={cn(
                    'flex rounded-2xl flex-1 justify-between relative h-11 z-30',
                    className
                )}
            >
                <Search className="absolute top-1/2 left-3 translate-y-[-50%] h-5 text-gray-400" />
                <input
                    type="text"
                    className="rounded-2xl outline-none w-full bg-gray-100 pl-11"
                    placeholder="Search"
                    onFocus={() => setFocused(true)}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                <div
                    className={cn(
                        'absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30',
                        focused && 'visible opacity-100 top-12'
                    )}
                >
                    <Link
                        href="/product/1"
                        className="flex items-center gap-5 w-full px-3 py-2 hover:bg-primary/10 cursor-pointer"
                    >
                        <img
                            className="rounded-sm h-8 w-8"
                            src="https://img.freepik.com/free-photo/crispy-mixed-pizza-with-olives-sausage_140725-3095.jpg?t=st=1725438623~exp=1725442223~hmac=94be7e5d82686540377b86ef086734d66e5679473b1b0f4b53c362ff180ece8a&w=1060"
                            alt="pizza"
                        />
                        <span> pizz</span>
                    </Link>
                </div>
            </div>
        </>
    );
};
