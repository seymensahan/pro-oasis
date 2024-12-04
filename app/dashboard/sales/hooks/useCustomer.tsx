import { auth, firestore } from '@/firebase/config';
import { addDoc, collection, getDocs, query, serverTimestamp, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection, useCollectionData } from 'react-firebase-hooks/firestore';
import { toast } from 'react-toastify';

export interface CustomerType {
    id?: string;  // Optional as we assign it on fetching from Firestore
    name: string;
    email: string;
    tel: string;
    purchases?: any[];
    createdAt?: any;
}

const useCustomer = () => {
    const [errors, setErrors] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [user] = useAuthState(auth);
    const [customers, setCustomers] = useState<CustomerType[]>([]);
    const [selectedCustomerData, setSelectedCustomerData] = useState<CustomerType>()



    // Set up query to fetch customers associated with the authenticated user's store
    const customersQuery = user
        ? query(
            collection(firestore, 'customers'),
            where('store', '==', user.uid),
        )
        : null;

    // Fetch customer data and states from Firestore
    const [customerCollection, customerLoading, customerError] = useCollection(customersQuery);

    // Update customers state when Firestore data changes
    useEffect(() => {
        if (customerCollection && !customerLoading) {
            const fetchedCustomers = customerCollection.docs.map((doc: any) => ({
                id: doc.id,
                ...doc.data()
            }));
            setCustomers(fetchedCustomers);
        }

        // Sync Firestore loading and error states with local state
        setLoading(customerLoading);
        setErrors(customerError ? customerError.message : null);
    }, [customerCollection, customerLoading, customerError]);


    const addCustomer = async (input: CustomerType) => {
        const customerData = {
            ...input,
            purchases: [],
            createdAt: serverTimestamp(),
            store: user?.uid
        };

        try {
            setLoading(true);
            setErrors(null);

            await addDoc(collection(firestore, "customers"), customerData);
            toast.success("New customer created successfully");
        } catch (error: any) {
            setErrors(error.message);
            toast.error(`Failed to create customer: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    // Ensure user?.uid is properly typed beforehand
    const getCustomerWithName = async (name: string | undefined): Promise<CustomerType | null> => {
        // if (!name.trim()) return null; // Ensure name is non-empty after trimming spaces

        try {
            // Validate user existence and store ID
            if (!user?.uid) {
                console.warn("User is not authenticated or user ID is unavailable.");
                return null;
            }

            // Create the Firestore query
            const q = query(
                collection(firestore, "customers"),
                where("name", "==", name),
                where("store", "==", user.uid)
            );

            // Execute the query
            const querySnapshot = await getDocs(q);

            // Handle no results found
            if (querySnapshot.empty) return null;

            // Extract and return the first customer's data
            const customer = querySnapshot.docs[0]?.data() ?? null;
            if (customer) {
                setSelectedCustomerData(customer as CustomerType);
            }
            return customer as CustomerType;
        } catch (error) {
            console.error("Error fetching customer:", (error as Error).message);
            return null; // Return null on error
        }
    };


    return { addCustomer, customers, customerLoading, customerError, loading, errors, getCustomerWithName, selectedCustomerData };
};

export default useCustomer;
