import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { auth, firestore } from '@/firebase/config';

export function useLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            const userDoc = await getDoc(doc(firestore, 'users', user.uid));

            if (userDoc.exists()) {
                const userData = userDoc.data();
                // Store user data in localStorage
                localStorage.setItem('userData', JSON.stringify(userData));
            }

            // Redirect to dashboard after successful login
            router.push('/dashboard');
        } catch (err) {
            setError('Login failed. Please check your credentials and try again.');
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
        handleLogin,
    };
}
