

import { auth, firestore } from '@/firebase/config';
import { collection, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { SaleData } from '../types';

export const useSales = () => {
    const [sales, setSales] = useState<SaleData[]>([]);
    const [user] = useAuthState(auth);

    const productsQuery = user
        ? query(collection(firestore, 'sales'), where('biller', '==', user.uid))
        : null;

    const [salesCollection, loading] = useCollectionData(productsQuery, {
        snapshotListenOptions: { includeMetadataChanges: true },
    });

    useEffect(() => {
        if (salesCollection && !loading) {
            const fetchedSales = salesCollection.map((doc: any) => ({
                id: doc.id,
                customerName: doc.customerName,
                grandTotal: doc.grandTotal,
                status: doc.status,
                paid: doc.paid,
                due: doc.due,
                paymentStatus: doc.paymentStatus,
                biller: doc.biller,
                reference: doc.reference,
                date: doc.createdAt,
            }));
            setSales(fetchedSales as SaleData[]);
        }
    }, [salesCollection, loading]);

    return { sales, loading }
}
