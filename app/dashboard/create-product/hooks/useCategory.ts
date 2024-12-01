import { firestore } from '@/firebase/config';
import { addDoc, collection, query, serverTimestamp, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { toast } from 'react-toastify';
import { CategoryProps } from '../../../../lib/Types';
import useAuth from '@/app/(auth)/Hooks/useAuth';

const useCategory = () => {
    const [errors, setErrors] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const { user } = useAuth();
    const [category, setCategory] = useState<CategoryProps[]>([]);

    // Set up query to fetch customers associated with the authenticated user's store
    const categoryQuery = user
        ? query(
            collection(firestore, 'product-categories'),
            where('store', '==', user?.uid),
        )
        : null;

    // Fetch customer data and states from Firestore
    const [categoryCollection, categoryLoading, categoryError] = useCollectionData(categoryQuery, {
        snapshotListenOptions: { includeMetadataChanges: true },
    });

    // Update customers state when Firestore data changes
    useEffect(() => {
        if (categoryCollection && !categoryLoading) {
            const fetchedCategory = categoryCollection.map((doc: any) => ({
                id: doc.id,
                name: doc.name,
            }));
            setCategory(fetchedCategory);
        }

        // Sync Firestore loading and error states with local state
        setLoading(categoryLoading);
        setErrors(categoryError ? categoryError.message : null);
    }, [categoryCollection, categoryLoading, categoryError]);


    const addCategory = async (input: CategoryProps) => {
        const categoryData = {
            ...input,
            createdAt: serverTimestamp(),
            store: user?.uid
        };

        try {
            setLoading(true);
            setErrors(null);

            await addDoc(collection(firestore, "product-categories"), categoryData);
            toast.success("New category created successfully");
        } catch (error: any) {
            setErrors(error.message);
            toast.error(`Failed to create category: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return { addCategory, category, categoryLoading, categoryError, loading, errors };
}

export default useCategory