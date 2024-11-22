import { useAuth } from '@/context/AuthContext'
import { firestore } from '@/firebase/config'
import { addDoc, collection, query, serverTimestamp, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { toast } from 'react-toastify'

export interface EmployeeType {
    id?: string
    name: string
    email: string
    role: string
    sales?: any[]
    createdAt?: any
    store?: string
}

const useEmployee = () => {
    const [loading, setLoading] = useState(false)
    const [employees, setEmployees] = useState<EmployeeType[]>([])

    const { user } = useAuth()


    const employeeQuery = user
        ? query(
            collection(firestore, "employees"),
            where("owner", "==", user.uid)
        )
        : null

    const [employeeCollection, employeeLoading, employeeError] = useCollection(employeeQuery);

    // Update customers state when Firestore data changes
    useEffect(() => {
        if (employeeCollection && !employeeLoading) {
            const fetchedEmployees = employeeCollection.docs.map((doc: any) => ({
                id: doc.id,
                ...doc.data()
            }));
            setEmployees(fetchedEmployees);
        }

        // Sync Firestore loading and error states with local state
        setLoading(employeeLoading);
    }, [employeeCollection, employeeLoading, employeeError]);


    const addEmployee = async (input: EmployeeType) => {
        const employeeData = {
            ...input,
            sales: [],
            createdAt: serverTimestamp(),
            owner: user?.uid
        }

        try {
            setLoading(true)

            await addDoc(collection(firestore, "employees"), employeeData)
            toast.success("New employee created successfully, he will receive an invitation email!")
        } catch (error: any) {
            toast.error(`Failed to create employee: ${error.message}`);
        } finally {
            setLoading(false)
        }
    }

    return { addEmployee, loading, employees }
}

export default useEmployee