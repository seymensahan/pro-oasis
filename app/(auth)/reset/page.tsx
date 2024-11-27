"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { auth } from '@/firebase/config'
import { sendPasswordResetEmail } from 'firebase/auth'
import { Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const page = () => {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)

    const sendResetEmail = async () => {
        if (!email) {
            toast.warn("please enter a valid email")
        }

        try {
            setLoading(true)

            await sendPasswordResetEmail(auth, email)

            toast.success("Reset link has been sent to your mailbox, please check")
        } catch (error: any) {
            toast.error(`An error occured: ${error.message}`)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='flex w-full justify-center items-center w-[100%] h-[100vh]'>
            <div className='flex flex-col justify-center items-center w-[50%] space-y-4 text-center'>
                <h3 className='text-3xl text-bold'>Reset password</h3>
                <p>A link will be sent to your mailbox for you to reset your password</p>
                <Input
                    placeholder='Enter your email address'
                    name='reset-email'
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Button className='bg-blue-500 hover:bg-blue-500' onClick={sendResetEmail}>
                    {loading ? <Loader2 className='animate-spin'/> : "Submit"}
                </Button>
            </div>
        </div>
    )
}

export default page