import * as React from 'react'
import { format, addMonths, subMonths } from 'date-fns'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface CalendarHeaderProps {
    currentDate: Date
    view: 'month' | 'week'
    onPreviousMonth: () => void
    onNextMonth: () => void
    onViewChange: (view: 'month' | 'week') => void
    onNewAppointment: () => void
    onTodayClick: () => void
}

export function CalendarHeader({
    currentDate,
    view,
    onPreviousMonth,
    onNextMonth,
    onViewChange,
    onNewAppointment,
    onTodayClick,
}: CalendarHeaderProps) {
    return (
        <div className="flex justify-between flex-col space-y-5 items-center mb-8">
            <h1 className="text-3xl font-bold">Appointements</h1>
            <div className="flex items-center gap-4">
                <Select value={view} onValueChange={(value: 'month' | 'week') => onViewChange(value)}>
                    <SelectTrigger className="w-32">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="month">Month View</SelectItem>
                        <SelectItem value="week">Week View</SelectItem>
                    </SelectContent>
                </Select>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={onPreviousMonth}>
                        <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <h2 className="text-xl font-semibold">
                        {format(currentDate, 'MMMM yyyy')}
                    </h2>
                    <Button variant="ghost" size="icon" onClick={onNextMonth}>
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                </div>
                <Button variant="ghost" onClick={onTodayClick}>
                    Today
                </Button>
                <Button onClick={onNewAppointment} className='bg-blue-400 hover:bg-blue-300'>
                    <Plus className="w-4 h-4 mr-2" />
                    New Appointment
                </Button>
            </div>
        </div>
    )
}