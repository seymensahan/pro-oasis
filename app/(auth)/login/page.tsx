"use client"

import { LoginForm } from "@/components/auth/LoginForm"
import Link from 'next/link'
import Image from 'next/image'
import { PieChart } from "lucide-react"

export default function LoginPage() {
    return (
        <div className="flex flex-col lg:flex-row min-h-screen">
            <div className="w-full lg:w-1/2 p-6 lg:p-12 flex items-center justify-center">
                <div className="w-full max-w-md">
                    <div className="flex items-center justify-center mb-6">
                        <PieChart className="h-8 w-8 text-blue-600" />
                        <h1 className="text-2xl font-bold ml-2">Pro Oasis</h1>
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Login</h2>
                    <p className="text-gray-600 mb-6">Sign in to your Pro Oasis account</p>
                    <LoginForm />
                    <p className="mt-4 text-center text-sm text-gray-600">
                        Don't have an account?{" "}
                        <Link className="font-medium text-blue-600 hover:underline" href="/register">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
            <div className="w-full lg:w-1/2 bg-gray-100">
                <div className="h-full w-full relative">
                    <Image
                        src="/login-image.jpg" 
                        alt="Stock management system"
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
            </div>
        </div>
    )
}
