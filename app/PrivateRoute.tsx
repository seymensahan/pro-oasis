"use client";

import { ReactNode, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import useAuthStore from '@/store/authStore';

interface PrivateRouteProps {
    children: ReactNode;
}

const PUBLIC_ROUTES = ['/auth', '/about', '/contact'];  // Define public routes

const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const user = useAuthStore((state) => state.user);
    const router = useRouter();
    const pathname = usePathname();  // Get the current pathname

    useEffect(() => {
        if (!user && !PUBLIC_ROUTES.includes(pathname)) {
            router.push('/login');  // Redirect to login if not authenticated
        }
    }, [user, pathname, router]);

    return user || PUBLIC_ROUTES.includes(pathname) ? <>{children}</> : null;
};

export default PrivateRoute;
