import React, { useEffect, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { firestore } from '@/firebase/config';
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { ProductDataProps } from '../../../../lib/Types';
import { toast } from 'react-toastify';
import useAuth from '@/app/(auth)/Hooks/useAuth';

const useGetProducts = () => {
    const [products, setProducts] = useState<ProductDataProps[]>([]);
    const [selectedProductData, setSelectedProductData] = useState<ProductDataProps | null>(null);
    const { user } = useAuth();

    const productsQuery = user
        ? query(collection(firestore, 'products'), where('owner', '==', user.uid))
        : null;

    // Use `useCollection` to access document snapshots and IDs
    const [productSnapshots, loading, error] = useCollection(productsQuery, {
        snapshotListenOptions: { includeMetadataChanges: true },
    });

    useEffect(() => {
        if (productSnapshots && !loading) {
            const fetchedProducts = productSnapshots.docs.map(doc => ({
                id: doc.id, // Access the document ID here
                ...doc.data(), // Spread the document data
                images: doc.data().images || [], // Ensure images is an array
            }));
            setProducts(fetchedProducts as ProductDataProps[]);
        }
    }, [productSnapshots, loading]);

    const getProductByName = async (name: string | null): Promise<ProductDataProps | null> => {
        if (!name) return null;  // Ensure name is provided
    
        try {
            const q = query(
                collection(firestore, "products"),
                where("name", "==", name),
                where("owner", "==", user?.uid)
            );
            const querySnapshot = await getDocs(q);
    
            if (querySnapshot.empty) {
                return null;  // Return null if no product is found
            }
    
            const product = querySnapshot.docs[0]?.data() ?? null;
            setSelectedProductData(product as ProductDataProps);
            return product as ProductDataProps;
        } catch (error: any) {
            console.error("Error fetching product:", error.message);
            return null;  // Return null on error to indicate failure
        }
    };
    

    const deleteProductByName = async (name: string) => {
        try {
            // Query the products collection for the product with the given name
            const q = query(collection(firestore, "products"), where("name", "==", name));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                // Assuming there's only one document with the given name
                const productDoc = querySnapshot.docs[0]; // Get the first match
                const productRef = doc(firestore, "products", productDoc.id);

                // Delete the product document
                await deleteDoc(productRef);
                toast.success("Product deleted successfully");
            } else {
                toast.error("No product found with that name");
            }
        } catch (error: any) {
            toast.error("Error deleting product:", error.message);
        }
    };

    return { getProductByName, deleteProductByName, selectedProductData, products, loading, error };
};

export default useGetProducts;
