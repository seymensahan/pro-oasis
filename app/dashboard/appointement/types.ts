import { Timestamp } from "firebase/firestore"

export interface Appointment {
    id: string
    title: string
    service?: string
    date: Date
    time: string
    description: string
    attendees: string[]
    reminder: boolean
    color: string
    createdAt?: Timestamp
    createBy?: string
}

export const COLORS = [
    'bg-red-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
]