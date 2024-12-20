import * as React from 'react'
import { startOfWeek, addDays, format, isSameDay, parse } from 'date-fns'
import { Edit, Trash2 } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Appointment } from '../types'

interface WeekViewProps {
    currentDate: Date
    appointments: Appointment[]
    onEditAppointment: (appointment: Appointment) => void
    onDeleteAppointment: (id: string) => void
}   

export function WeekView({
    currentDate,
    appointments,
    onEditAppointment,
    onDeleteAppointment,
}: WeekViewProps) {
    const weekStart = startOfWeek(currentDate)
    const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i))

    const getAppointmentsForDate = (date: Date) =>
        appointments.filter(appointment => isSameDay(parse(appointment.time, 'HH:mm', appointment.date), date))

    return (
        <div className="grid grid-cols-7 text-sm">
            {weekDays.map((day) => (
                <div key={day.toString()} className="border-r last:border-r-0">
                    <div className="p-2 text-center font-medium border-b">
                        {format(day, 'EEE')}
                        <br />
                        <span
                            className={cn(
                                'inline-flex w-6 h-6 items-center justify-center rounded-full',
                                isSameDay(day, new Date()) && 'bg-primary text-primary-foreground',
                            )}
                        >
                            {format(day, 'd')}
                        </span>
                    </div>
                    <div className="h-[600px] overflow-y-auto p-2 space-y-2">
                        {getAppointmentsForDate(day).map((appointment) => (
                            <div
                                key={appointment.id}
                                className={cn(
                                    'p-2 rounded text-white',
                                    appointment.color
                                )}
                            >
                                <div className="font-medium flex justify-between items-center">
                                    <span>{appointment.time}</span>
                                    <div className="flex space-x-2">
                                        <button onClick={() => onEditAppointment(appointment)}>
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => onDeleteAppointment(appointment.id)}>
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                                <div>{appointment.service}</div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}