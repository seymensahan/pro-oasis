

import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebase/config';

export function useLogout() {
    const router = useRouter();

    const logout = async () => {
        try {
            await signOut(auth);
            
            localStorage.removeItem('user-info');
            router.push('/login');
        } catch (error) {
            console.error('Failed to log out', error);
        }
    };

    return { logout };
}
