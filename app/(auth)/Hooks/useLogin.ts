import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthState, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, firestore } from '@/firebase/config';
import useAuthStore from '@/store/authStore';

export function useLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    
    // Get loginUser and user from the store
    const loginUser = useAuthStore((state) => state.loginUser);
    const userStore = useAuthStore((state) => state.user);

    // Firebase sign-in hook
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error
    ] = useSignInWithEmailAndPassword(auth);

    useEffect(() => {
        // Redirect if user is already in store or Firebase user object is present
        if (userStore || user) {
            router.push('/dashboard');
        }
    }, [userStore, user, router]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Sign in with Firebase Authentication
            const userCredential = await signInWithEmailAndPassword(email, password);
            const user = userCredential?.user;

            if (user) {
                // Retrieve user data from Firestore
                const userDoc = await getDoc(doc(firestore, 'users', user.uid));

                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    loginUser(userData);  // Store user data in auth store

                    // Store user data in localStorage
                    try {
                        localStorage.setItem('user-info', JSON.stringify(userData));
                    } catch (error) {
                        console.error('Error storing user info in localStorage:', error);
                    }
                } else {
                    console.warn('User document does not exist');
                }

                // Redirect to dashboard after successful login
                router.push('/dashboard');
            }
        } catch (err) {
            console.error('Error during login:', err);
        }
    };

    return {
        email,
        setEmail,
        password,
        setPassword,
        showPassword,
        setShowPassword,
        error,
        loading,
        handleLogin,
    };
}
