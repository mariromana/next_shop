import { CircleUser, User } from 'lucide-react';
import { useSession, signIn, signOut } from 'next-auth/react';
import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';

interface Props {
    onClickSingIn: () => void;
    className?: string;
}

export const ProfileButton: React.FC<Props> = ({
    className,
    onClickSingIn,
}) => {
    const { data: session } = useSession();

    return (
        <div className={className}>
            {!session ? (
                <Button
                    onClick={onClickSingIn}
                    variant="outline"
                    className="flex items-center gap-1"
                >
                    Log in
                    <User size={16} />
                </Button>
            ) : (
                <Link href="/profile">
                    <Button
                        className="flex items-center gap-2"
                        variant="secondary"
                    >
                        <CircleUser size={18} />
                        Profile
                    </Button>
                </Link>
            )}
        </div>
    );
};
