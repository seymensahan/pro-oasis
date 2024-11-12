import React, { useState } from 'react'
import { ProductDataProps, ServiceDataProps } from '../../../../lib/Types'
import { addDoc, and, collection, getDocs, query, serverTimestamp, where } from 'firebase/firestore'
import { firestore, storage } from '@/firebase/config'
import { toast } from 'react-toastify'
import { deleteObject, getDownloadURL, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { useAuth } from '@/context/AuthContext'


const useProduct = () => {
    const [serviceLoading, setServiceLoading] = useState<boolean>(false)
    const [serviceError, setServiceError] = useState<string | null>(null)
    const [productLoading, setProductLoading] = useState<boolean>(false)
    const [productError, setProductError] = useState<string | null>(null)
    const { user } = useAuth();
    const [images, setImages] = useState<{ url: string; path: string; progress: number; }[]>([]);


    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            Array.from(files).forEach((file) => {
                const storagePath = `images/${file.name}`;
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
        
        const serviceReference = `SRV${Date.now().toString().slice(-4)}`; 
        const serviceSaveData = {
            ...serviceData,
            reference: serviceReference,
            createdAt: serverTimestamp(),
            owner: user?.uid
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

    const addProduct = async (productData: ProductDataProps) => {
        const productReference = `PDT${Date.now().toString().slice(-4)}`; 
        const productSaveData = {
            ...productData,
            stockInitial: productData.stock,
            reference: productReference,
            createdAt: serverTimestamp(),
            owner: user?.uid,
        }

        try {
            setProductLoading(true)
            setProductError(null)

            const q = query(
                collection(firestore, "products"),
                where("name", "==", productData.name),
                where("owner", "==", user?.uid)  
            );
            const querySnapshot = await getDocs(q)

            if (!querySnapshot.empty) {
                toast.error("Sorry your inventory already contains this product. Just update it's detail!");
                return;
            }


            if (!productData.name || !productData.category || !productData.price || !productData.stock) {
                toast.error("Please will all the neccessary fields (*)")
                return
            }

            await addDoc(collection(firestore, "products"), productSaveData)
            toast.success("Product Added Successfully!")
        } catch (error: any) {
            setProductError(error.message)
            toast(`An error occured while creating new product ${error.message}`)
        } finally {
            setProductLoading(false)
        }
    }

    return { addProduct, addService, serviceError, serviceLoading, handleImageUpload, handleImageRemove, images }
}

export default useProduct