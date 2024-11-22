import { NextRequest, NextResponse } from 'next/server';
import { collection, query, getDocs, FirestoreError, where } from 'firebase/firestore';
import admin from '@/firebase/firebaseAdmin';
import { firestore } from '@/firebase/config';
import { cookies } from 'next/headers';
import { mutate } from 'swr';

type Customer = {
    id: string;
    name: string;
    email: string;
    phone?: string;
};

export async function GET(req: NextRequest) {
    

    try {

        // Extract query parameter `name` from the request URL
        const { searchParams } = new URL(req.url);
        const name = searchParams.get('name');
        const uid = searchParams.get('uid')

        const customersRef = collection(firestore, 'customers');

        // Dynamically build the query
        const conditions = [where('store', '==', uid)];
        if (name) {
            conditions.push(where('name', '==', name));
        }
        const q = query(customersRef, ...conditions);

        // Execute the query
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            return NextResponse.json(
                { error: name ? 'No customers found with the given name' : 'No customers found' },
                { status: 404 }
            );
        }

        // Map Firestore documents to an array of Customer objects
        const customers: Customer[] = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as Omit<Customer, 'id'>),
        }));

        // Function to handle revalidation after adding a new customer

        // mutate(`${process.env.NEXT_PUBLIC_API_URL}/api/customer`);


        return NextResponse.json({ customers }, { status: 200 });
    } catch (error) {
        if (error instanceof FirestoreError) {
            console.error('Firestore error:', error.message);
            return NextResponse.json(
                { error: 'Error querying the Firestore database' },
                { status: 500 }
            );
        }
        console.error('Error fetching customers:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
