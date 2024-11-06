import React, { useEffect, useState } from 'react';
import { Product } from '../../../types';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { auth, firestore } from '@/firebase/config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { ProductDataProps } from '../../../../lib/Types';
import { useAuth } from '@/context/AuthContext';

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

    return { getProductByName, selectedProductData, products, loading, error };
};

export default useGetProducts;
