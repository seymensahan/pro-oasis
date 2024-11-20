import { firestore } from "@/firebase/config";
import { CreateStoreFormSchema, CreateStoreState } from "@/lib/definitions"
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";

export async function createStore(state: CreateStoreState, formData: FormData) {

    // Validate form fields
    const validatedFields = CreateStoreFormSchema.safeParse({
        name: formData.get('name'),
        description: formData.get('description'),
        address: formData.get('address'),
        images: formData.get('images'),
    })

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const { name, description, address } = validatedFields.data

    const newStore = await addDoc(collection(firestore, "stores"), validatedFields.data);

    if (newStore) {
        toast.success("New store created successfully")
    }

}