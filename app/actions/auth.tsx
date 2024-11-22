import { auth, firestore } from "@/firebase/config";
import { FormState, LoginFormSchema, SignupFormSchema } from "@/lib/definitions"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";


export async function signup(state: FormState, formData: FormData) {

    // Validate form fields
    const validatedFields = SignupFormSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
    })

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const { name, email, password } = validatedFields.data

    const newUser = await createUserWithEmailAndPassword(auth, email, password);

    if (newUser) {
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
        toast.success("Registration successful!")
        // Store user data in localStorage
        localStorage.setItem("user-info", JSON.stringify(userData));
        // Redirect to dashboard after successful registration
        redirect(`/dashboard`)

    }
}


export async function login(state: FormState, formData: FormData) {

    const validatedFields = LoginFormSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    })

    if (!validatedFields.success) {
        // Format errors for `FormState`
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { email, password } = validatedFields.data

    try {
        
        const user = await signInWithEmailAndPassword(auth, email, password);

        if (user) {
            // const userData = user.data();
            // localStorage.setItem('user-info', JSON.stringify(userData));
            toast.success("Login successful")
        }
    } catch (error: any) {
        // Return a generic error if login fails
        return { message: "Wrong credentials, please enter a correct email/password" }
    };

    redirect("/dashboard")
}