import { NextRequest, NextResponse } from 'next/server';
import { collection, query, getDocs, FirestoreError, where } from 'firebase/firestore';
import { firestore } from '@/firebase/config';

type Customer = {
    id: string;
    name: string;
    email: string;
    phone?: string;
};

export async function GET(req: NextRequest) {
    try {
        // Extract the `name` query parameter from the request URL
        const { searchParams } = new URL(req.url);
        const name = searchParams.get('name')?.trim(); // Trim to avoid unnecessary spaces

        // Reference to the Firestore `customers` collection
        const customersRef = collection(firestore, 'customers');

        // Build the query based on the `name` parameter
        const q = name
            ? query(customersRef, where('name', '==', name))
            : query(customersRef); // If no name is provided, return all customers

        // Execute the query
        const querySnapshot = await getDocs(q);

        // Check if no documents are found
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

        return NextResponse.json({ customers }, { status: 200 });
    } catch (error) {
        // Handle Firestore-specific errors
        if (error instanceof FirestoreError) {
            console.error('Firestore error:', error.message);
            return NextResponse.json(
                { error: 'Error querying the Firestore database' },
                { status: 500 }
            );
        }

        // Handle general errors
        console.error('Error fetching customers:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
