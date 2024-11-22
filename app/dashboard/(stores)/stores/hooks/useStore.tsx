import { useAuth } from '@/context/AuthContext'
import { firestore } from '@/firebase/config'
import { setDefaultResultOrder } from 'dns'
import { collection, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { Store } from '../page'

const useStore = () => {
    const [stores, setStores] = useState<Store[]>([])
    const { user } = useAuth()

    const storeQuery = user
        ? query(
            collection(firestore, "stores"),
            where("owner", "==", user?.uid)
        )
        : null

    const [storeCollection, storeLoading, storeError] = useCollection(storeQuery)

    useEffect(() => {
        if (storeCollection && !storeLoading) {
            const fetchedStores = storeCollection.docs.map((doc: any) => ({
                id: doc.id,
                ...doc.data()
            }));
            setStores(fetchedStores)
        }
    }, [storeCollection, storeLoading, storeError])
}

export default useStore