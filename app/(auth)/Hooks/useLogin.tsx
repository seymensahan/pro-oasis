import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthState, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, firestore } from '@/firebase/config';
import { useAuth } from '@/context/AuthContext';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import { truncateByDomain } from 'recharts/types/util/ChartUtils';

export function useLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false)
    const router = useRouter();


    const { user } = useAuth();

    useEffect(() => {
        // Redirect if user is already in store or Firebase user object is present
        if (user) {
            router.push('/dashboard');
        }
    }, [user, router]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true)
            // Sign in with Firebase Authentication
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            const user = userCredential?.user;

            if (user) {
                // Retrieve user data from Firestore
                const userDoc = await getDoc(doc(firestore, 'users', user.uid));

                if (userDoc.exists()) {
                    const userData = userDoc.data();


                    // Store user data in localStorage
                    try {
                        localStorage.setItem('user-info', JSON.stringify(userData));
                    } catch (error: any) {
                        toast.error('Error storing user info in localStorage:', error);
                    }
                } else {
                    toast.error('User document does not exist');
                }

                toast.success("Login Successful")
                // Redirect to dashboard after successful login
                router.push('/dashboard');
            }
        } catch (err: any) {
            toast.error(`An error during login: ${err.message}`);
        } finally {
            setLoading(false)
        }
    };

    return {
        email,
        setEmail,
        password,
        setPassword,
        showPassword,
        setShowPassword,
        loading,
        handleLogin,
    };
}