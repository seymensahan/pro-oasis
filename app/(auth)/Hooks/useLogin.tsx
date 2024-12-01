import { doc, getDoc } from 'firebase/firestore';
import { auth, firestore } from '@/firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useState } from 'react';


interface LoginInputs {
    email: string;
    password: string;
}


export function useLogin() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async (inputs: LoginInputs) => {

        if (!inputs.email || !inputs.password) {
            toast.error("Please fill all the fields");
            setLoading(false);
            return;
        }

        try {
            // Sign in with Firebase Authentication
            const userCred = await signInWithEmailAndPassword(auth, inputs.email, inputs.password);
            const user = userCred?.user;

            if (user) {
                // Retrieve user data from Firestore
                const userDoc = await getDoc(doc(firestore, 'users', user.uid));

                if (userCred) {
                    const docRef = doc(firestore, "users", userCred.user.uid);
                    const docSnap = await getDoc(docRef);
                    localStorage.setItem("user-info", JSON.stringify(docSnap.data()));
                }
            }
        } catch (err: any) {
            toast.error('Error during login:', err.message);
        } finally {
            setLoading(false)
        }
    };

    return { loading, error, login };
}