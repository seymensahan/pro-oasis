import useAuth from '@/app/(auth)/Hooks/useAuth';
import { firestore } from '@/firebase/config';
import { ServiceDataProps } from '@/lib/Types'
import { collection, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore';

const useGetService = () => {
    const [services, setServices] = useState<ServiceDataProps[]>([]);

    const { user } = useAuth()

    const servicesQuery = user
        ? query(collection(firestore, "services"), where("owner", "==", user.uid))
        : null;

    const [serviceSnapshots, loading, error] = useCollection(servicesQuery)

    useEffect(() => {
        if (serviceSnapshots && !loading) {
            const fetchedServices = serviceSnapshots.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                images: doc.data().images || []
            }))
            setServices(fetchedServices as ServiceDataProps[])
        }
    }, [serviceSnapshots, loading])

    return { services, loading, error }
}



export default useGetService