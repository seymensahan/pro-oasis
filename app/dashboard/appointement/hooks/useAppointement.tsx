import React, { useEffect, useState } from 'react'
import { Appointment, COLORS } from '../types'
import { addDoc, collection, deleteDoc, query, serverTimestamp, where } from 'firebase/firestore'
import { firestore } from '@/firebase/config'
import useAuth from '@/app/(auth)/Hooks/useAuth'
import { toast } from 'react-toastify'
import { useCollection } from 'react-firebase-hooks/firestore'

const useAppointement = () => {
    const [saveLoading, setSaveLoading] = useState(false)
    const [saveError, setSaveError] = useState(null)
    const [appointments, setAppointements] = useState<Appointment[]>([])

    const { user } = useAuth()

    const appointementQuery = user
        ? query(collection(firestore, "appointements"), where("createBy", "==", user?.uid))
        : null;

    const [appointementSnapShots, loading, error] = useCollection(appointementQuery)

    useEffect(() => {
        if (appointementSnapShots && !loading) {
            const fetchedAppointements = appointementSnapShots.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                date: doc.data().date.toDate(),
            })) 
            setAppointements(fetchedAppointements as Appointment[])
        }
    }, [appointementSnapShots, loading])

    const saveAppointement = async (appointment: Appointment) => {
        const appointementSaveData = {
            service: appointment.title,
            date: appointment.date,
            time: appointment.time,
            description: appointment.description || '',
            attendees: appointment.attendees || [],
            reminder: appointment.reminder || false,
            color: appointment.color || COLORS[0],
            createdAt: serverTimestamp(),
            createBy: user?.uid
        }

        try {
            setSaveLoading(true)
            setSaveError(null)

            await addDoc(collection(firestore, "appointements"), appointementSaveData)
            toast.success("Appointement created successfully!")
        } catch (error: any) {
            toast.error(`An error occured on creating appointement ${error.message}`)
            setSaveError(error.message)
        } finally {
            setSaveLoading(false)
        }


    }

    return { saveAppointement, appointments, saveLoading, saveError }
}

export default useAppointement