

import { auth, firestore } from '@/firebase/config';
import { collection, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection, useCollectionData } from 'react-firebase-hooks/firestore';
import { SaleData, SaleProduct } from '../types';

export const useSales = () => {
    const [sales, setSales] = useState<SaleProduct[]>([]);
    const [user] = useAuthState(auth);

    const salesQuery = user
        ? query(collection(firestore, 'sales'), where('biller', '==', user.uid))
        : null;

    const [salesCollection, loading] = useCollection(salesQuery, {
        snapshotListenOptions: { includeMetadataChanges: true },
    });

    useEffect(() => {
        if (salesCollection && !loading) {
            const fetchedSales = salesCollection
            .docs.map(doc => ({
                id: doc.id, // Access the document ID here
                ...doc.data(), // Spread the document data
            }));
            setSales(fetchedSales as SaleProduct[]);
        }
    }, [salesCollection, loading]);

    return { sales, loading }
}
