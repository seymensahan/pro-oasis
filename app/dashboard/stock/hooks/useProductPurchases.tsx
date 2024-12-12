import useAuth from '@/app/(auth)/Hooks/useAuth';
import { firestore } from '@/firebase/config';
import { SupplyDataProps } from '@/lib/Types';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useState } from 'react'

const useProductPurchases = () => {
    const { user } = useAuth();
    const [purchase, setPurchase] = useState<SupplyDataProps[]>([]);

    const getPurchaseByProductName = async (productName?: string) => {
        try {
            const q = productName
                ? query(collection(firestore, "supplies"), where("productName", "==", productName), where("buyer", "==", user?.uid))
                : query(collection(firestore, "supplies"));

            const querySnapshot = await getDocs(q);
            const fetchedpurchase = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as SupplyDataProps[];
            setPurchase(fetchedpurchase);
            return fetchedpurchase;
        } catch (error) {
            console.error("Error fetching purchase:", error);
            return [];
        }
    };

    return { purchase, getPurchaseByProductName };
}

export default useProductPurchases