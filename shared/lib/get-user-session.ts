import { getServerSession } from 'next-auth';
import { authOptions } from '../constants/auth-options';

/**
 * Gets the user session from the server.
 *
 * @returns The user session, or null if there is no session.
 */
export const getUserSession = async () => {
    const session = await getServerSession(authOptions);

    return session?.user ?? null;
};
