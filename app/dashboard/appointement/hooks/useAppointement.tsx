import React, { useEffect, useState } from "react";
import { Appointment, COLORS } from "../types";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    query,
    serverTimestamp,
    updateDoc,
    where,
} from "firebase/firestore";
import { firestore } from "@/firebase/config";
import useAuth from "@/app/(auth)/Hooks/useAuth";
import { toast } from "react-toastify";
import { useCollection } from "react-firebase-hooks/firestore";

const useAppointement = () => {
    const [saveLoading, setSaveLoading] = useState(false);
    const [saveError, setSaveError] = useState<string | null>(null);
    const [appointments, setAppointements] = useState<Appointment[]>([]);

    const { user } = useAuth();

    const appointementQuery = user
        ? query(
            collection(firestore, "appointements"),
            where("createBy", "==", user?.uid)
        )
        : null;

    const [appointementSnapShots, loading, error] = useCollection(appointementQuery);

    useEffect(() => {
        if (appointementSnapShots && !loading) {
            const fetchedAppointements = appointementSnapShots.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
                date: doc.data().date.toDate(),
            }));
            setAppointements(fetchedAppointements as Appointment[]);
        }
    }, [appointementSnapShots, loading]);

    const saveAppointement = async (appointment: Appointment) => {
        const appointementSaveData = {
            service: appointment.service,
            date: appointment.date,
            time: appointment.time,
            description: appointment.description || "",
            attendees: appointment.attendees || [],
            reminder: appointment.reminder || false,
            color: appointment.color || COLORS[0],
            createdAt: serverTimestamp(),
            createBy: user?.uid,
        };

        try {
            setSaveLoading(true);
            setSaveError(null);

            await addDoc(collection(firestore, "appointements"), appointementSaveData);
            toast.success("Appointment created successfully!");
        } catch (error: any) {
            toast.error(`An error occurred while creating the appointment: ${error.message}`);
            setSaveError(error.message);
        } finally {
            setSaveLoading(false);
        }
    };

    const updateAppointement = async (appointment: Appointment) => {
        if (!appointment.id) {
            toast.error("Appointment ID is required for update.");
            return;
        }

        try {
            setSaveLoading(true);
            setSaveError(null);

            const appointmentRef = doc(firestore, "appointements", appointment.id);

            await updateDoc(appointmentRef, {
                service: appointment.service,
                date: appointment.date,
                time: appointment.time,
                description: appointment.description || "",
                attendees: appointment.attendees || [],
                reminder: appointment.reminder || false,
                color: appointment.color || COLORS[0],
                updatedAt: serverTimestamp(),
            });

            toast.success("Appointment updated successfully!");
        } catch (error: any) {
            toast.error(`An error occurred while updating the appointment: ${error.message}`);
            setSaveError(error.message);
        } finally {
            setSaveLoading(false);
        }
    };

    const deleteAppointement = async (id: string) => {
        if (!id) {
            toast.error("Appointment ID is required for deletion.");
            return;
        }
    
        try {
            setSaveLoading(true);
            setSaveError(null);
    
            const appointmentRef = doc(firestore, "appointements", id);
    
            await deleteDoc(appointmentRef);
    
            toast.success("Appointment deleted successfully!");
            setAppointements((prev) => prev.filter((appointment) => appointment.id !== id));
        } catch (error: any) {
            toast.error(`An error occurred while deleting the appointment: ${error.message}`);
            setSaveError(error.message);
        } finally {
            setSaveLoading(false);
        }
    };
    

    return {
        saveAppointement,
        updateAppointement,
        deleteAppointement,
        appointments,
        saveLoading,
        saveError
    };
};

export default useAppointement;
