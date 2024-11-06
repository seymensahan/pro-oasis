import React, { useEffect, useState } from 'react';
import { Product } from '../../../types';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { auth, firestore } from '@/firebase/config';
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { ProductDataProps } from '../../../../lib/Types';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'react-toastify';

const useGetProducts = () => {
    const [products, setProducts] = useState<ProductDataProps[]>([]);
    const [selectedProductData, setSelectedProductData] = useState<ProductDataProps | null>(null);
    const { user } = useAuth();

    const productsQuery = user
        ? query(collection(firestore, 'products'), where('owner', '==', user.uid))
        : null;

    const [productCollection, loading, error] = useCollectionData(productsQuery, {
        snapshotListenOptions: { includeMetadataChanges: true },
    });

    useEffect(() => {
        if (productCollection && !loading) {
            const fetchedProducts = productCollection.map((doc: any) => ({
                id: doc.id,
                name: doc.name,
                owner: doc.userId,
                category: doc.category,
                price: doc.price,
                description: doc.description,
                unit: doc.unit,
                stock: doc.stock,
                images: doc.images || [],
            }));
            setProducts(fetchedProducts as ProductDataProps[]);
        }
    }, [productCollection, loading]);

    const getProductByName = async (name: string | null) => {
        try {
            const q = query(collection(firestore, "products"), where("name", "==", name));
            const querySnapshot = await getDocs(q);
            const product = querySnapshot.docs[0]?.data() ?? null;
            setSelectedProductData(product as ProductDataProps);
        } catch (error: any) {
            console.error("Error fetching product:", error.message);
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
