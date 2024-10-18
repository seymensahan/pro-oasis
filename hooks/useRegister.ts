import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthState, useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, firestore } from '@/firebase/config';

interface FormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export const useRegister = () => {
    const router = useRouter();
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState<string | null>(null);

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);
    const [authUser, authLoading] = useAuthState(auth);

    useEffect(() => {
        if (authUser || user) {
            router.push('/dashboard');
        }
    }, [authUser, user, router]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.id]: e.target.value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
            setErrors("Please fill all fields");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setErrors("Passwords do not match");
            return;
        }

        try {
            const newUser = await createUserWithEmailAndPassword(formData.email, formData.password);

            if (newUser) {
                const userData = {
                    uid: newUser.user.uid,
                    name: formData.name,
                    email: formData.email,
                    createdAt: serverTimestamp(),
                    role: "",
                    profilepic: "",
                };

                await setDoc(doc(firestore, "users", newUser.user.uid), userData);
                localStorage.setItem("user-info", JSON.stringify(userData));
            }
        } catch (error: any) {
            console.error("Error creating user:", error.message);
            setErrors(error.message);
        }
    };

    return {
        formData,
        errors,
        loading,
        error,
        handleInputChange,
        handleSubmit,
    };
};
