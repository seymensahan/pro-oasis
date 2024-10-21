import RegisterForm from '@/components/auth/RegisterForm'
import { PieChart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function RegisterPage() {
    return (
        <div className="flex flex-col lg:flex-row min-h-screen">
            <div className="w-full lg:w-1/2 p-3 lg:p-4 flex items-center justify-center">
                <div className="w-full max-w-md">
                    <div className="flex items-center justify-center mb-6">
                        <PieChart className="h-8 w-8 text-blue-600" />
                        <h1 className="text-2xl font-bold ml-2">Pro Oasis</h1>
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Register</h2>
                    <p className="text-gray-600 mb-6">Create New Pro Oasis Account</p>
                    <RegisterForm />
                    <p className="mt-4 text-center text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link className="font-medium text-blue-600 hover:underline" href="/login">
                            Log In Instead
                        </Link>
                    </p>
                </div>
            </div>
            <div className="w-full lg:w-1/2 bg-gray-100">
                <div className="h-full w-full relative">
                    <Image
                        src="/register-image.jpg"
                        alt="Stock management system"
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
            </div>
        </div>
    )
}
