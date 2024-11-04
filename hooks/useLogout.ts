

import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebase/config';
import useAuthStore from '@/store/authStore';

export function useLogout() {
    const router = useRouter();
    const logoutUser = useAuthStore((state) => state.logoutUser)

    const logout = async () => {
        try {
            await signOut(auth);
            
            logoutUser()
            localStorage.removeItem('user-info');

            router.push('/login');
        } catch (error) {
            console.error('Failed to log out', error);
        }
    };

    return { logout };
}
