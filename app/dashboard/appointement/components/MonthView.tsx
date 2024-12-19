import * as React from 'react'
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, format, parse } from 'date-fns'
import { Edit, Trash2 } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Appointment } from '../types'

interface MonthViewProps {
    currentDate: Date
    appointments: Appointment[]
    onDateClick: (date: Date) => void
    onEditAppointment: (appointment: Appointment) => void
    onDeleteAppointment: (id: string) => void
}

export function MonthView({
    currentDate,
    appointments,
    onDateClick,
    onEditAppointment,
    onDeleteAppointment,
}: MonthViewProps) {
    const monthStart = startOfMonth(currentDate)
    const monthEnd = endOfMonth(currentDate)
    const startDate = startOfWeek(monthStart)
    const endDate = endOfWeek(monthEnd)

    const monthDays = eachDayOfInterval({ start: startDate, end: endDate })

    const getAppointmentsForDate = (date: Date) =>
        appointments.filter(appointment => isSameDay(parse(appointment.time, 'HH:mm', appointment.date), date))

    return (
        <div className="grid grid-cols-7 text-sm">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="p-2 text-center font-medium border-b">
                    {day}
                </div>
            ))}
            {monthDays.map((day, dayIdx) => (
                <div
                    key={day.toString()}
                    className={cn(
                        'min-h-[120px] p-2 border border-t-0 relative',
                        !isSameMonth(day, currentDate) && 'bg-gray-50',
                        dayIdx % 7 === 0 && 'border-l',
                    )}
                    onClick={() => onDateClick(day)}
                >
                    <span
                        className={cn(
                            'inline-flex w-6 h-6 items-center justify-center rounded-full text-sm',
                            isSameDay(day, new Date()) && 'bg-primary text-primary-foreground',
                        )}
                    >
                        {format(day, 'd')}
                    </span>
                    <div className="mt-2 space-y-1">
                        {getAppointmentsForDate(day).map((appointment) => (
                            <div
                                key={appointment.id}
                                className={cn(
                                    'text-xs p-1 rounded truncate text-white flex justify-between items-center',
                                    appointment.color
                                )}
                            >
                                <span>{appointment.time} {appointment.title}</span>
                                <div className="flex space-x-1">
                                    <button onClick={(e) => { e.stopPropagation(); onEditAppointment(appointment); }}>
                                        <Edit className="w-3 h-3" />
                                    </button>
                                    <button onClick={(e) => { e.stopPropagation(); onDeleteAppointment(appointment.id); }}>
                                        <Trash2 className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}