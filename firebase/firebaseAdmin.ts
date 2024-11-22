import admin from "firebase-admin";

// Ensure the environment variables are defined
const privateKey = process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY;
const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const clientEmail = process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL;

if (!privateKey || !projectId || !clientEmail) {
    throw new Error("Firebase credentials are missing. Please check your environment variables.");
}

// Initialize Firebase Admin if it's not already initialized
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId,
            privateKey: privateKey.replace(/\\n/g, '\n'),
            clientEmail,
        }),
    });
}

export default admin;
