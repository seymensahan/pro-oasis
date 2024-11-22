import { auth, firestore } from "@/firebase/config";
import { FormState, LoginFormSchema, SignupFormSchema } from "@/lib/definitions";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";

export async function signup(state: FormState, formData: FormData): Promise<FormState> {
    try {
        // Validate form fields
        const validatedFields = SignupFormSchema.safeParse({
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
        });

        // Return validation errors if any
        if (!validatedFields.success) {
            return {
                errors: validatedFields.error.flatten().fieldErrors,
            };
        }

        const { name, email, password } = validatedFields.data;

        // Attempt to create user with Firebase
        const newUser = await createUserWithEmailAndPassword(auth, email, password);

        if (newUser) {
            // Update user profile with display name
            await updateProfile(newUser.user, {
                displayName: name,
            });

            const userData = {
                uid: newUser.user.uid,
                name,
                email,
                createdAt: serverTimestamp(),
                role: "",
                profilepic: "",
            };

            // Store user data in Firestore
            await setDoc(doc(firestore, "users", newUser.user.uid), userData);

            // Show success toast
            toast.success("Registration successful!");

            // Save user info in local storage
            localStorage.setItem("user-info", JSON.stringify(userData));

            // Redirect to dashboard
            redirect(`/dashboard`);
        }
    } catch (error: any) {
        // Handle Firebase errors
        return {
            message: error.message || "An error occurred during registration.",
            errors: {
                email: error.code === "auth/email-already-in-use" ? ["Email is already in use."] : undefined,
                password: error.code === "auth/weak-password" ? ["Password is too weak."] : undefined,
            },
        };
    }
}

export async function login(state: FormState, formData: FormData): Promise<FormState> {
    try {
        // Validate form fields
        const validatedFields = LoginFormSchema.safeParse({
            email: formData.get('email'),
            password: formData.get('password'),
        });

        // Return validation errors if any
        if (!validatedFields.success) {
            return {
                errors: validatedFields.error.flatten().fieldErrors,
            };
        }

        const { email, password } = validatedFields.data;

        // Attempt to log in user with Firebase
        const user = await signInWithEmailAndPassword(auth, email, password);

        if (user) {
            // Show success toast
            toast.success("Login successful!");

            // Redirect to dashboard
            redirect("/dashboard");
        }
    } catch (error: any) {
        // Handle Firebase errors
        return {
            message: error.message || "An error occurred during login.",
            errors: {
                email: error.code === "auth/user-not-found" ? ["No user found with this email."] : undefined,
                password: error.code === "auth/wrong-password" ? ["Incorrect password."] : undefined,
            },
        };
    }
}
