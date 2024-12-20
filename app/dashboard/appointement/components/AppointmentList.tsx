import * as React from 'react'
import { format } from 'date-fns'
import { Bell, Edit, Trash2 } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Appointment } from '../types'

interface AppointmentListProps {
    appointments: Appointment[]
    onEditAppointment: (appointment: Appointment) => void
    onDeleteAppointment: (id: string) => void
}

export function AppointmentList({
    appointments,
    onEditAppointment,
    onDeleteAppointment,
}: AppointmentListProps) {
    return (
        <div className="bg-white rounded-lg shadow p-4">
            <h3 className="font-semibold mb-4">Upcoming Appointments</h3>
            <div className="space-y-4">
                {appointments
                    .sort((a, b) => a.date?.getTime() - b.date?.getTime())
                    .slice(0, 5)
                    .map((appointment) => (
                        <div key={appointment.id} className="flex items-start gap-3">
                            <Avatar className={cn('w-8 h-8', appointment.color)}>
                                <AvatarFallback className="text-black">
                                    {appointment?.service?.[0]}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-grow">
                                <div className="font-medium">{appointment?.service}</div>
                                <div className="text-sm text-gray-500">
                                    {appointment?.date ? format(appointment.date, 'MMM d, yyyy') : 'Invalid Date'} at {appointment?.time}                                </div>
                                {appointment?.reminder && (
                                    <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                                        <Bell className="w-3 h-3" /> Reminder set
                                    </div>
                                )}
                            </div>
                            <div className="flex space-x-2">
                                <button onClick={() => onEditAppointment(appointment)}>
                                    <Edit className="w-4 h-4" />
                                </button>
                                <button onClick={() => onDeleteAppointment(appointment.id)}>
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    )
}