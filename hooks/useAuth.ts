import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebase/config';

export function useAuth() {
    const router = useRouter();

    const logout = async () => {
        try {
            await signOut(auth);
            router.push('/login');
        } catch (error) {
            console.error('Failed to log out', error);
        }
    };

    return { logout };
}
