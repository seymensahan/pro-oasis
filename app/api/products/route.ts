import { firestore } from "@/firebase/config";
import { collection, query, where } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import { useCollection } from "react-firebase-hooks/firestore";


export enum ItemAccess {
    ADMIN = "ADMIN",
    MANAGER = "MANAGER",
    PRO = "PRO",
    USER = "USER"
}

export function GET(request: NextRequest) {
    try {
        // Use `useCollection` to access document snapshots and IDs
        const [product, loading, error] = useCollection(collection(firestore, 'products'));

        const fetchedProducts = product?.docs.map(doc => ({
            id: doc.id, // Access the document ID here
            ...doc.data(), // Spread the document data
            images: doc.data().images || [], // Ensure images is an array
        }));

        return NextResponse.json(fetchedProducts);
    } catch (error) {
        return new NextResponse("internal Error", { status: 500 })
    }
}