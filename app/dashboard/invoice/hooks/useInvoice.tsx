import { firestore } from '@/firebase/config'
import { collection, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { SaleData } from '../../sales/types'
import useAuth from '@/app/(auth)/Hooks/useAuth'

const useInvoice = () => {
    const [invoices, setInvoices] = useState<SaleData[]>([])
    const { user } = useAuth()

    const invoiceQuery = user
        ? query(collection(firestore, 'invoices'), where("biller", "==", user.uid))
        : null;

    const [invoiceCollection, loading] = useCollection(invoiceQuery, {
        snapshotListenOptions: { includeMetadataChanges: true },
    })

    useEffect(() => {
        if (invoiceCollection && !loading) {
            const fetchedInvoices = invoiceCollection
                .docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
            setInvoices(fetchedInvoices as SaleData[])
        }
    }, [invoiceCollection, loading]);

    return { invoices, loading }
}

export default useInvoice