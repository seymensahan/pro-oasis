import { firestore } from '@/firebase/config';
import { doc, getDoc, Timestamp } from 'firebase/firestore';

export interface UserData {
    uid: string;
    name: string;
    email: string;
    taxRate: string;
    termsAndConditions: string;
    currency: string;
    language: string;
    notificationsEnabled: string;
    smsNotifications: string;
    timeZone: string;
    createdAt: Timestamp;
    role: string;
}

export async function fetchUserData(userId: string): Promise<UserData | null> {
    try {
        const userDocRef = doc(firestore, 'users', userId);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
            return { uid: userId, ...docSnap.data() } as UserData;
        } else {
            console.warn('User not found in the database.');
            return null;
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw new Error('Failed to fetch user data.');
    }
}
