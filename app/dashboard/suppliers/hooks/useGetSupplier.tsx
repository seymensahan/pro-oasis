import useAuth from '@/app/(auth)/Hooks/useAuth';
import { firestore } from '@/firebase/config';
import { SupplierModalProps } from '@/lib/Types';
import { collection, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore';

const useGetSupplier = () => {
    const { user } = useAuth();
    const [supplier, setSupplier] = useState<SupplierModalProps[]>([]);


    const supplierQuery = user
        ? query(collection(firestore, 'suppliers'), where('store', '==', user.uid))
        : null;

    // Use `useCollection` to access document snapshots and IDs
    const [supplierSnapshots, loading, error] = useCollection(supplierQuery);

    useEffect(() => {
        if (supplierSnapshots && !loading) {
            const fetchedsupplier = supplierSnapshots.docs.map(doc => ({
                id: doc.id, // Access the document ID here
                ...doc.data(), // Spread the document data
            }));
            setSupplier(fetchedsupplier as SupplierModalProps[]);
        }
    }, [supplierSnapshots, loading]);

    return { supplier }

}

export default useGetSupplier