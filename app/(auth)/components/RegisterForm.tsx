"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Mail, Loader2, AlertCircle } from 'lucide-react'
import { useFormState, useFormStatus } from 'react-dom'
import { signup } from '@/app/actions/auth'

export default function RegisterForm() {
    const [state, action] = useFormState(signup, undefined)
    const [showPassword, setShowPassword] = useState(false)

    return (
        <form className='my-5 space-y-5' action={action}>

            <div className="space-y-2 ">
                <Label htmlFor="name" className="font-medium text-gray-700">Name</Label>
                <div className="relative">
                    <Input
                        id="name"
                        placeholder="Enter your name"
                        name='name'
                        className="pr-10"
                    />
                    <User className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
                {state?.errors?.name && <p className="text-sm text-red-500 mt-1">{state.errors.name}</p>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="email" className="font-medium text-gray-700">Email</Label>
                <div className="relative">
                    <Input
                        id="email"
                        placeholder="Enter your email"
                        type="email"
                        name='email'
                        className="pr-10"
                    />
                    <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="password" className="font-medium text-gray-700">Password</Label>
                <div className="relative">
                    <Input
                        id="password"
                        placeholder="Enter your password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        className="pr-10"
                    />
                    <PasswordToggleIcon show={showPassword} onClick={() => setShowPassword(!showPassword)} />
                </div>
            </div>

            <SubmitButton />

            {state?.errors?.password && (
                <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50" role="alert">
                    <AlertCircle className="flex-shrink-0 inline w-4 h-4 mr-3" />
                    <span className="sr-only">Error</span>
                    <div>
                        <span className="font-medium">Registration failed!, password should be:</span>
                        {state.errors.password.map((error) => (
                            <li key={error}>{error}</li>
                        ))}
                    </div>
                </div>
            )}
        </form>
    )
}

export function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <Button
            className={`w-full bg-blue-500 text-white hover:bg-blue-600 transition duration-150 ${pending && "opacity-75 cursor-not-allowed"
                }`}
            type="submit"
            disabled={pending}
        >
            {pending ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                </>
            ) : (
                <>Sign Up</>
            )}
        </Button>
    )
}

const PasswordToggleIcon = ({ show, onClick }: { show: boolean; onClick: () => void }) => (
    <svg
        className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-600 transition duration-150"
        onClick={onClick}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
    >
        {show ? (
            <>
                <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                <line x1="2" x2="22" y1="2" y2="22" />
            </>
        ) : (
            <>
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
            </>
        )}
    </svg>
);
