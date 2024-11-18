import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from 'next/link'
import { AlertCircle, Loader2, User } from "lucide-react"
import { useFormState, useFormStatus } from "react-dom"
import { login } from "@/app/actions/auth"
import { useState } from "react"

export function LoginForm() {
    const [state, action, isPending] = useFormState(login, undefined)

    const [showPassword, setShowPassword] = useState(false);

    return (
        <form action={action} className="space-y-4">
            {/* {error && <p className="text-red-500 text-sm">{error.message}</p>} */}
            <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                    <Input
                        id="email"
                        placeholder="Enter your email"
                        type="email"
                        name="email"
                        required
                    />
                    <User className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                    <Input
                        id="password"
                        placeholder="Enter your password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        required
                    />
                    <svg
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 cursor-pointer"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? (
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
                </div>
            </div>
            <SubmitButton />
            {state?.message && (
                <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50" role="alert">
                    <AlertCircle className="flex-shrink-0 inline w-4 h-4 mr-3" />
                    <span className="sr-only">Error</span>
                    <div>
                        <span className="font-medium">Registration failed!, password should be:</span>
                        {/* {state.errors.password.map((error) => ( */}
                            <li>{state.message}</li>
                        {/* ))} */}
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