import React, { useEffect, useState } from 'react';
import { Product } from '../../product/types';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { auth, firestore } from '@/firebase/config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';

const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProductData, setSelectedProductData] = useState<Product | null>(null);
    const [user] = useAuthState(auth);

    const productsQuery = user
        ? query(collection(firestore, 'products'), where('userId', '==', user.uid))
        : null;

    const [productCollection, loading, error] = useCollectionData(productsQuery, {
        snapshotListenOptions: { includeMetadataChanges: true },
    });

    useEffect(() => {
        if (productCollection && !loading) {
            const fetchedProducts = productCollection.map((doc: any) => ({
                id: doc.id,
                productName: doc.productName,
                userId: doc.userId,
                category: doc.category,
                brand: doc.brand,
                price: doc.price,
                unit: doc.unit,
                quantity: doc.quantity,
            }));
            setProducts(fetchedProducts as Product[]);
        }
    }, [productCollection, loading]);

    const getProductByName = async (name: string | null) => {
        try {
            const q = query(collection(firestore, "products"), where("productName", "==", name));
            const querySnapshot = await getDocs(q);
            const product = querySnapshot.docs[0]?.data() ?? null;
            setSelectedProductData(product as Product);
        } catch (error: any) {
            console.error("Error fetching product:", error.message);
        }
    };

    return { getProductByName, selectedProductData, products, loading, error };
};

export default useProducts;
