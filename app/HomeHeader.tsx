"use client"

import { Button } from '@/components/ui/button';
import { PieChart } from 'lucide-react';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import useAuth from './(auth)/Hooks/useAuth';

const HomeHeader = () => {
    const { user, loading } = useAuth();
    const router = useRouter()

    useEffect(() => {
        if (user) {
            router.push('/dashboard');
        }
    }, [user, router]);

    return (
        <header className="bg-white shadow-sm">
            <div className="container mx-auto px-4 py-6 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <PieChart className="h-8 w-8 text-blue-600" />
                    <span className="text-2xl font-bold text-gray-800">Pro Oasis</span>
                </div>
                <nav>
                    <ul className="flex space-x-4">
                        <li><Link href="#features" className="text-gray-600 hover:text-blue-600">Features</Link></li>
                        <li><Link href="#pricing" className="text-gray-600 hover:text-blue-600">Pricing</Link></li>
                        <li><Link href="#contact" className="text-gray-600 hover:text-blue-600">Contact</Link></li>
                    </ul>
                </nav>
                <div>
                    <Link href="/login">
                        <Button variant="outline" className="mr-2">Log In</Button>
                    </Link>
                    <Link href="/register">
                        <Button>Sign Up</Button>
                    </Link>
                </div>
            </div>
        </header>)
}

export default HomeHeader