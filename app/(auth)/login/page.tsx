"use client"

import { LoginForm } from "@/components/auth/LoginForm"
import Link from 'next/link'
import Image from 'next/image'

export default function LoginPage() {
    return (
        <div className="flex flex-col lg:flex-row min-h-screen">
            <div className="w-full lg:w-1/2 p-6 lg:p-12 flex items-center justify-center">
                <div className="w-full max-w-md">
                    <div className="flex items-center justify-center mb-6">
                        <svg
                            className="h-10 w-10 text-orange-500"
                            fill="none"
                            height="24"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            width="24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                            <path d="m3.3 7 8.7 5 8.7-5" />
                            <path d="M12 22V12" />
                        </svg>
                        <h1 className="text-2xl font-bold ml-2">Pro Oasis</h1>
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Login</h2>
                    <p className="text-gray-600 mb-6">Sign in to your Pro Oasis account</p>
                    <LoginForm />
                    <p className="mt-4 text-center text-sm text-gray-600">
                        Don't have an account?{" "}
                        <Link className="font-medium text-orange-600 hover:underline" href="/register">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
            <div className="w-full lg:w-1/2 bg-gray-100">
                <div className="h-full w-full relative">
                    <Image
                        src="/placeholder.svg?height=1080&width=1920"
                        alt="Stock management system"
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
            </div>
        </div>
    )
}
