import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, firestore } from '@/firebase/config';
import { updateProfile } from 'firebase/auth';
import useAuth from './useAuth';

interface FormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export const useRegister = () => {
    const router = useRouter();
    const { user } = useAuth();

    const [
        createUserWithEmailAndPassword,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);

    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState<string | null>(null);

    useEffect(() => {
        if (user) {
            router.push('/dashboard');
        }
    }, [user, router]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.id]: e.target.value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validate form fields
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
                await updateProfile(newUser.user, {
                    displayName: formData.name,
                });

                const userData = {
                    uid: newUser.user.uid,
                    name: formData.name,
                    email: formData.email,
                    createdAt: serverTimestamp(),
                    role: "",
                    profilepic: "",
                };

                // Store user data in Firestore
                await setDoc(doc(firestore, "users", newUser.user.uid), userData);

                // Save user data in Zustand store
                // loginUser(userData);

                // Store user data in localStorage
                localStorage.setItem("user-info", JSON.stringify(userData));

                // Redirect to dashboard after successful registration
                router.push('/dashboard');
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