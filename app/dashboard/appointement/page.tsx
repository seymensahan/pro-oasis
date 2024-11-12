'use client'

import { useState } from 'react'
import { format, startOfWeek, addDays, isSameDay } from 'date-fns'
import { Calendar as CalendarIcon, Clock, User, FileText, Plus } from 'lucide-react'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

// Mock data for appointments
const appointments = [
    { id: 1, date: new Date(2024, 0, 15, 10, 0), title: "Site web ", attendee: "John Doe" },
    { id: 2, date: new Date(2024, 0, 16, 14, 30), title: "Creation de logo", attendee: "John Doe" },
    { id: 3, date: new Date(2024, 0, 17, 11, 0), title: "Creation d'application web", attendee: "John Doe" },
]

export default function AppointmentPage() {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
    const [isNewAppointmentOpen, setIsNewAppointmentOpen] = useState(false)
    const [newAppointment, setNewAppointment] = useState({
        title: '',
        date: new Date(),
        time: '09:00',
        attendee: '',
        notes: '',
    })

    const handleDateSelect = (date: Date | undefined) => {
        setSelectedDate(date)
    }

    const handleNewAppointmentSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Here you would typically save the new appointment
        console.log('New appointment:', newAppointment)
        setIsNewAppointmentOpen(false)
    }

    const WeekView = ({ selectedDate }: { selectedDate: Date | undefined }) => {
        if (!selectedDate) return null

        const startDate = startOfWeek(selectedDate)
        const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startDate, i))

        return (
            <div className="grid grid-cols-7 gap-2 mt-4">
                {weekDays.map((day, index) => (
                    <div key={index} className="border rounded-lg p-2">
                        <div className="text-sm font-semibold mb-2">{format(day, 'EEE d')}</div>
                        {appointments
                            .filter(apt => isSameDay(apt.date, day))
                            .map(apt => (
                                <div key={apt.id} className="bg-primary/10 text-primary rounded p-1 mb-1 text-xs">
                                    {format(apt.date, 'HH:mm')} - {apt.title}
                                </div>
                            ))}
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Appointment Manager</h1>
                <Dialog open={isNewAppointmentOpen} onOpenChange={setIsNewAppointmentOpen}>
                    <DialogTrigger asChild>
                        <Button className="flex items-center bg-blue-400 hover:bg-blue-500">
                            <Plus className="mr-2 h-4 w-4" /> New Appointment
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-[80%] h-[80%] overflow-hidden">
                        <DialogHeader>
                            <DialogTitle>Create New Appointment</DialogTitle>
                            <DialogDescription>
                                Fill in the details for your new appointment.
                            </DialogDescription>
                        </DialogHeader>
                        {/* Scrollable Form Content */}
                        <div className="overflow-y-auto max-h-[60vh]">
                            <form onSubmit={handleNewAppointmentSubmit}>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="title" className="text-right">
                                            Title
                                        </Label>
                                        <Input
                                            id="title"
                                            value={newAppointment.title}
                                            onChange={(e) => setNewAppointment({ ...newAppointment, title: e.target.value })}
                                            className="col-span-3"
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="date" className="text-right">
                                            Date
                                        </Label>
                                        <div className="col-span-3">
                                            <Calendar
                                                mode="single"
                                                selected={newAppointment.date}
                                                onSelect={(date) => setNewAppointment({ ...newAppointment, date: date || new Date() })}
                                                className="rounded-md border"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="time" className="text-right">
                                            Time
                                        </Label>
                                        <Select
                                            value={newAppointment.time}
                                            onValueChange={(value) => setNewAppointment({ ...newAppointment, time: value })}
                                        >
                                            <SelectTrigger className="col-span-3">
                                                <SelectValue placeholder="Select a time" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                                                    <SelectItem key={hour} value={`${hour.toString().padStart(2, '0')}:00`}>
                                                        {`${hour.toString().padStart(2, '0')}:00`}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="attendee" className="text-right">
                                            Attendee
                                        </Label>
                                        <Input
                                            id="attendee"
                                            value={newAppointment.attendee}
                                            onChange={(e) => setNewAppointment({ ...newAppointment, attendee: e.target.value })}
                                            className="col-span-3"
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="notes" className="text-right">
                                            Notes
                                        </Label>
                                        <Textarea
                                            id="notes"
                                            value={newAppointment.notes}
                                            onChange={(e) => setNewAppointment({ ...newAppointment, notes: e.target.value })}
                                            className="col-span-3"
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button className="bg-blue-400 hover:bg-blue-500" type="submit">
                                        Create Appointment
                                    </Button>
                                </DialogFooter>
                            </form>
                        </div>
                    </DialogContent>
                </Dialog>

            </div>

            <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full ">
                    <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={handleDateSelect}
                        className="rounded-md border w-full "
                    />
                </div>
                <div className="w-full md:w-1/2">
                    <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
                    <div className="space-y-4">
                        {appointments.map((appointment) => (
                            <div key={appointment.id} className="flex items-start space-x-4 p-4 bg-secondary rounded-lg">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 rounded-full bg-blue-400 flex items-center justify-center text-primary-foreground">
                                        {appointment.title.charAt(0)}
                                    </div>
                                </div>
                                <div className="flex-grow">
                                    <h3 className="font-semibold">{appointment.title}</h3>
                                    <div className="text-sm text-muted-foreground">
                                        <div className="flex items-center">
                                            <CalendarIcon className="w-4 h-4 mr-2" />
                                            {format(appointment.date, 'MMMM d, yyyy')}
                                        </div>
                                        <div className="flex items-center mt-1">
                                            <Clock className="w-4 h-4 mr-2" />
                                            {format(appointment.date, 'h:mm a')}
                                        </div>
                                        <div className="flex items-center mt-1">
                                            <User className="w-4 h-4 mr-2" />
                                            {appointment.attendee}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Week View</h2>
                <WeekView selectedDate={selectedDate} />
            </div>
        </div>
    )
}