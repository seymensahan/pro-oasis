'use client'

import * as React from 'react'
import { addMonths, subMonths } from 'date-fns'
import { CalendarHeader } from './components/CalenderHeader'
import { Appointment, COLORS } from './types'
import { MonthView } from './components/MonthView'
import { WeekView } from './components/WeekView'
import { AppointmentDialog } from './components/AppointmentDialog'
import { AppointmentList } from './components/AppointmentList'
import { DeleteConfirmationDialog } from './components/DeleteConfirmationDialog'
import useAppointement from './hooks/useAppointement'

export default function CalendarPage() {
    const [currentDate, setCurrentDate] = React.useState(new Date())
    const [selectedDate, setSelectedDate] = React.useState<Date | null>(null)
    const [isDialogOpen, setIsDialogOpen] = React.useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false)
    const [view, setView] = React.useState<'month' | 'week'>('month')
    // const { appointements } = useAppointement()
    const [appointments, setAppointments] = React.useState<Appointment[]>([
        
    ])
    const [editingAppointment, setEditingAppointment] = React.useState<string | null>(null)
    const [appointmentToDelete, setAppointmentToDelete] = React.useState<string | null>(null)
    const { saveAppointement, saveLoading, saveError } = useAppointement()

    const handlePreviousMonth = () => setCurrentDate(subMonths(currentDate, 1))
    const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1))

    const handleDateClick = (date: Date) => {
        setSelectedDate(date)
        setIsDialogOpen(true)
    }

    const handleCreateOrUpdateAppointment = (appointment: Partial<Appointment>) => {
        if (appointment.title && appointment.date && appointment.time) {
            if (editingAppointment) {
                return
            } else {

                saveAppointement(appointment as Appointment)
            }
            setIsDialogOpen(false)
            setEditingAppointment(null)
        }
    }

    const handleEditAppointment = (appointment: Appointment) => {
        setEditingAppointment(appointment.id)
        setIsDialogOpen(true)
    }

    const handleDeleteAppointment = (id: string) => {
        setAppointmentToDelete(id)
        setIsDeleteDialogOpen(true)
    }

    const confirmDeleteAppointment = () => {
        if (appointmentToDelete) {
            setAppointments(prev => prev.filter(app => app.id !== appointmentToDelete))
            setIsDeleteDialogOpen(false)
            setAppointmentToDelete(null)
        }
    }

    return (
        <div className="container mx-auto py-5">
            <CalendarHeader
                currentDate={currentDate}
                view={view}
                onPreviousMonth={handlePreviousMonth}
                onNextMonth={handleNextMonth}
                onViewChange={setView}
                onNewAppointment={() => setIsDialogOpen(true)}
                onTodayClick={() => setCurrentDate(new Date())}
            />

            <div className="grid gap-8 grid-cols-1 lg:grid-cols-[1fr_300px]">
                <div className="space-y-6">
                    <div className="bg-white rounded-lg shadow">
                        {view === 'month' ? (
                            <MonthView
                                currentDate={currentDate}
                                appointments={appointments}
                                onDateClick={handleDateClick}
                                onEditAppointment={handleEditAppointment}
                                onDeleteAppointment={handleDeleteAppointment}
                            />
                        ) : (
                            <WeekView
                                currentDate={currentDate}
                                appointments={appointments}
                                onEditAppointment={handleEditAppointment}
                                onDeleteAppointment={handleDeleteAppointment}
                            />
                        )}
                    </div>
                </div>

                <div className="space-y-6">
                    <AppointmentList
                        appointments={appointments}
                        onEditAppointment={handleEditAppointment}
                        onDeleteAppointment={handleDeleteAppointment}
                    />
                </div>
            </div>

            <AppointmentDialog
                isOpen={isDialogOpen}
                onClose={() => {
                    setIsDialogOpen(false)
                    setEditingAppointment(null)
                }}
                appointment={editingAppointment ? appointments.find(app => app.id === editingAppointment)! : {}}
                onSave={handleCreateOrUpdateAppointment}
                isEditing={!!editingAppointment}
            />

            <DeleteConfirmationDialog
                isOpen={isDeleteDialogOpen}
                onClose={() => {
                    setIsDeleteDialogOpen(false)
                    setAppointmentToDelete(null)
                }}
                onConfirm={confirmDeleteAppointment}
            />
        </div>
    )
}