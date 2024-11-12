import { useAuth } from '@/context/AuthContext'
import { firestore } from '@/firebase/config'
import { SupplierModalProps } from '@/lib/Types'
import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const useSaveSupplier = () => {
    const [loading, setLoading] = useState(false)
    const { user } = useAuth()

    const saveSupplier = async (supplierData: SupplierModalProps) => {

        try {
            setLoading(true)
            const newSupplierRef = doc(collection(firestore, 'suppliers'))
            const supplierReference = `SPY${Date.now().toString().slice(-4)}`;

            const supplierDoc = {
                ...supplierData,
                store: user?.uid,
                reference: supplierReference,
                createdAt: serverTimestamp()
            }

            

            await setDoc(newSupplierRef, supplierDoc)
            toast.success("Supplier registered successfully")
        } catch (error: any) {
            toast.error(`Supplier failded to be added due to ${error.message}`)
        } finally {
            setLoading(false)
        }
    }

    return { saveSupplier, loading }
}

export default useSaveSupplier