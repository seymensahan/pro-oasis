"use client";

import Loading from "@/app/dashboard/loading";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login"); // Redirect unauthenticated users
        }
    }, [user, loading, router]);

    if (loading) {
        return <Loading />; // Show a spinner or placeholder
    }

    return <>{children}</>;
}
