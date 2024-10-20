import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthState, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, firestore } from '@/firebase/config';

export function useLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error
    ] = useSignInWithEmailAndPassword(auth);
    const [authUser, authLoading] = useAuthState(auth);

    useEffect(() => {
        if (authUser || user) {
            router.push('/dashboard');
        }
    }, [authUser, user, router]);



    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const userCredential = await signInWithEmailAndPassword(email, password);
            const user = userCredential?.user;

            if (user) {
                const userDoc = await getDoc(doc(firestore, 'users', user.uid));

                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    // Store user data in localStorage
                    try {
                        localStorage.setItem('user-info', JSON.stringify(userData));
                        console.log('User info stored in localStorage:', userData);
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
