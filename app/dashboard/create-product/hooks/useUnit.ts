import { firestore } from '@/firebase/config';
import useAuthStore from '@/store/authStore';
import { addDoc, collection, query, serverTimestamp, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { toast } from 'react-toastify';
import { UnitProps } from '../../../../lib/Types';

const useUnit = () => {
    const [errors, setErrors] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const user = useAuthStore((state) => state.user)
    const [unit, setUnit] = useState<UnitProps[]>([]);

    // Set up query to fetch customers associated with the authenticated user's store
    const unitQuery = user
        ? query(
            collection(firestore, 'product-unit'),
            where('store', '==', user.uid),
        )
        : null;

    // Fetch customer data and states from Firestore
    const [unitCollection, unitLoading, unitError] = useCollectionData(unitQuery, {
        snapshotListenOptions: { includeMetadataChanges: true },
    });

    // Update customers state when Firestore data changes
    useEffect(() => {
        if (unitCollection && !unitLoading) {
            const fetchedunit = unitCollection.map((doc: any) => ({
                id: doc.id,
                name: doc.name,
            }));
            setUnit(fetchedunit);
        }

        // Sync Firestore loading and error states with local state
        setLoading(unitLoading);
        setErrors(unitError ? unitError.message : null);
    }, [unitCollection, unitLoading, unitError]);


    const addUnit = async (input: UnitProps) => {
        const unitData = {
            ...input,
            createdAt: serverTimestamp(),
            store: user?.uid
        };

        try {
            setLoading(true);
            setErrors(null);

            await addDoc(collection(firestore, "product-unit"), unitData);
            toast.success("New unit created successfully");
        } catch (error: any) {
            setErrors(error.message);
            toast.error(`Failed to create unit: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return { addUnit, unit, unitLoading, unitError, loading, errors };
}

export default useUnit