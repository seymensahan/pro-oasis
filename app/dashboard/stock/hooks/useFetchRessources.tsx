import useAuth from "@/app/(auth)/Hooks/useAuth";
import { firestore } from "@/firebase/config";
import { collection, query, where, getDocs, Timestamp } from "firebase/firestore";


const useFetchRessources = () => {
    const { user } = useAuth()

    // Function to fetch data from the first collection
    const fetchCollectionA = async (startDate: Date, endDate: Date) => {

        if (!user?.uid) {
            console.warn("User is not authenticated or user ID is unavailable.");
            return null;
        }

        const colRef = collection(firestore, "supplies");
        const q = query(
            colRef,
            where("createAt", ">=", Timestamp.fromDate(startDate)),
            where("createdAt", "<=", Timestamp.fromDate(endDate)),
            where("buyer", "==", user.uid)
        );

        const snapshot = await getDocs(q);

        return snapshot.docs.map(doc => ({
            id: doc.id,
            type: "Purchase", // Distinguish the collection
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate(),
        }));
    };

    // Function to fetch data from the second collection
    const fetchCollectionB = async (startDate: Date, endDate: Date) => {
        const colRef = collection(firestore, "sales");
        const q = query(
            colRef,
            where("timestamp", ">=", Timestamp.fromDate(startDate)),
            where("timestamp", "<=", Timestamp.fromDate(endDate)),
            where("biller", "==", user?.uid)
        );

        const snapshot = await getDocs(q);

        return snapshot.docs.map(doc => ({
            id: doc.id,
            type: "Sale", // Distinguish the collection
            ...doc.data(),
            createdAt: doc.data().timestamp?.toDate(),
        }));
    };

    return { fetchCollectionA, fetchCollectionB }
}

export default useFetchRessources;

