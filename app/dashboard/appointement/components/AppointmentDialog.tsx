import * as React from 'react'
import { format } from 'date-fns'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Appointment, COLORS } from '../types'
import { cn } from "@/lib/utils"
import useGetService from '../../services/hooks/useGetService'
import useAppointement from '../hooks/useAppointement'

interface AppointmentDialogProps {
    isOpen: boolean
    onClose: () => void
    appointment: Partial<Appointment>
    onSave: (appointment: Partial<Appointment>) => void
    isEditing: boolean
}

export function AppointmentDialog({
    isOpen,
    onClose,
    appointment,
    onSave,
    isEditing,
}: AppointmentDialogProps) {
    const [localAppointment, setLocalAppointment] = React.useState<Partial<Appointment>>(appointment)
    const { services, loading, error } = useGetService()
    const { saveLoading } = useAppointement()

    React.useEffect(() => {
        setLocalAppointment(appointment)
    }, [appointment])

    const handleSave = () => {
        console.log("Clicked with: ", localAppointment)
        onSave(localAppointment)
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{isEditing ? 'Edit Appointment' : 'New Appointment'}</DialogTitle>
                    <DialogDescription>
                        {isEditing ? 'Edit your appointment details.' : 'Create a new appointment. Click save when you\'re done.'}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    {/* Title as Select */}
                    <div className="grid gap-2">
                        <Label htmlFor="title">Service</Label>
                        <select
                            id="title"
                            className="rounded-lg border px-3 py-2"
                            value={localAppointment.service || ''}
                            onChange={(e) =>
                                setLocalAppointment((prev) => ({ ...prev, service: e.target.value }))
                            }
                        >
                            <option value="" disabled>
                                {loading ? 'Loading services...' : 'Select a service'}
                            </option>
                            {!loading && !error && services.map((service) => (
                                <option key={service.id} value={service.name}>
                                    {service.name}
                                </option>
                            ))}
                            {error && (
                                <option value="" disabled>
                                    Error loading services
                                </option>
                            )}
                        </select>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="date">Date</Label>
                        <div className="flex gap-2">
                            <Input
                                id="date"
                                type="date"
                                value={localAppointment.date ? format(localAppointment.date, 'yyyy-MM-dd') : ''}
                                onChange={(e) =>
                                    setLocalAppointment((prev) => ({
                                        ...prev,
                                        date: new Date(e.target.value),
                                    }))
                                }
                            />
                            <Input
                                id="time"
                                type="time"
                                value={localAppointment.time || ''}
                                onChange={(e) =>
                                    setLocalAppointment((prev) => ({ ...prev, time: e.target.value }))
                                }
                            />
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={localAppointment.description || ''}
                            onChange={(e) =>
                                setLocalAppointment((prev) => ({
                                    ...prev,
                                    description: e.target.value,
                                }))
                            }
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="attendees">Attendees</Label>
                        <Input
                            id="attendees"
                            placeholder="Add attendees (comma separated)"
                            value={localAppointment.attendees?.join(', ') || ''}
                            onChange={(e) =>
                                setLocalAppointment((prev) => ({
                                    ...prev,
                                    attendees: e.target.value.split(',').map((s) => s.trim()),
                                }))
                            }
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label>Color</Label>
                        <div className="flex gap-2">
                            {COLORS.map((color) => (
                                <button
                                    key={color}
                                    className={cn(
                                        'w-6 h-6 rounded-full',
                                        color,
                                        localAppointment.color === color && 'ring-2 ring-offset-2'
                                    )}
                                    onClick={() =>
                                        setLocalAppointment((prev) => ({ ...prev, color }))
                                    }
                                />
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Switch
                            id="reminder"
                            checked={localAppointment.reminder}
                            onCheckedChange={(checked) =>
                                setLocalAppointment((prev) => ({ ...prev, reminder: checked }))
                            }
                        />
                        <Label htmlFor="reminder">Set reminder</Label>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave} disabled={!!saveLoading} >
                        {isEditing ? 'Update' : 'Save'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
