import React, { useState } from 'react'
import { ServiceDataProps } from '../utils/Types'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { firestore, storage } from '@/firebase/config'
import useAuthStore from '@/store/authStore'
import { toast } from 'react-toastify'
import { deleteObject, getDownloadURL, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";


const useProduct = () => {
    const [serviceLoading, setServiceLoading] = useState<boolean>(false)
    const [serviceError, setServiceError] = useState<string | null>(null)
    const user = useAuthStore((state) => state.user);
    const [images, setImages] = useState<{ url: string; path: string; progress: number; }[]>([]);


    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            Array.from(files).forEach((file) => {
                const storagePath = `services/${file.name}`;
                const storageRef = ref(storage, storagePath);
                const uploadTask = uploadBytesResumable(storageRef, file);

                // Initialize a new image entry with progress tracking
                setImages((prev) => [
                    ...prev,
                    { url: "", path: storagePath, progress: 0 }
                ]);

                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        // Calculate upload progress
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                        // Update the specific image’s progress in state
                        setImages((prevImages) =>
                            prevImages.map((img) =>
                                img.path === storagePath ? { ...img, progress } : img
                            )
                        );
                    },
                    (error) => {
                        console.error("Upload error:", error);
                    },
                    async () => {
                        // Get the download URL upon successful upload
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

                        // Update the image with the download URL and set progress to 100
                        setImages((prevImages) =>
                            prevImages.map((img) =>
                                img.path === storagePath ? { ...img, url: downloadURL, progress: 100 } : img
                            )
                        );
                    }
                );
            });
        }
    };

    const handleImageRemove = async (index: number) => {
        const imageToRemove = images[index];
        if (imageToRemove) {
            const imageRef = ref(storage, imageToRemove.path);
            try {
                await deleteObject(imageRef); // Remove from Firebase Storage
                setImages(prevImages => prevImages.filter((_, i) => i !== index)); // Update state
            } catch (error) {
                console.error("Error removing image from Firebase:", error);
            }
        }
    };

    const addService = async (serviceData: ServiceDataProps) => {

        const serviceSaveData = {
            ...serviceData,
            createdAt: serverTimestamp(),
            owner: user.uid
        }

        try {
            setServiceLoading(true)
            setServiceError(null)

            await addDoc(collection(firestore, "services"), serviceSaveData)
            toast.success("New Product Created Successfully!")
        } catch (error: any) {
            setServiceError(error.message)
            toast.error(`An error occured while saving new service ${error.message}`)
        } finally {
            setServiceLoading(false)
        }
    }

    return { addService, serviceError, serviceLoading, handleImageUpload, handleImageRemove, images }
}

export default useProduct