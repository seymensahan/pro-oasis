import React, { useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { firestore } from '@/firebase/config';
import useAuth from '@/app/(auth)/Hooks/useAuth';
import { SaleProduct } from '../../sales/types';

const useProductSales = () => {
    const { user } = useAuth();
    const [sales, setSales] = useState<SaleProduct[]>([]);

    const getSalesByProductName = async (productName?: string) => {
        try {
            const q = productName
                ? query(collection(firestore, "sales"), where("productName", "==", productName), where("biller", "==", user?.uid))
                : query(collection(firestore, "sales"));

            const querySnapshot = await getDocs(q);
            const fetchedSales = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as SaleProduct[];
            setSales(fetchedSales);
            return fetchedSales;
        } catch (error) {
            console.error("Error fetching sales:", error);
            return [];
        }
    };

    return { sales, getSalesByProductName };
};

export default useProductSales;
