// SalesConfirmationModal.tsx
import React from 'react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Mail, Printer } from "lucide-react"

interface SalesConfirmationModalProps {
    isOpen: boolean
    onClose: () => void
    onEmailInvoice?: () => void
    onPrintInvoice?: () => void
}

export default function SalesConfirmationModal({
    isOpen,
    onClose,
    onEmailInvoice,
    onPrintInvoice
}: SalesConfirmationModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Sale Confirmed!</DialogTitle>
                    <DialogDescription>
                        Your sale has been successfully processed. What would you like to do with the invoice?
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <Button onClick={onEmailInvoice} className="w-full">
                        <Mail className="mr-2 h-4 w-4" /> Email Invoice
                    </Button>
                    <Button onClick={onPrintInvoice} variant="outline" className="w-full">
                        <Printer className="mr-2 h-4 w-4" /> Print Invoice
                    </Button>
                </div>
                <DialogFooter>
                    <Button onClick={onClose} variant="ghost">Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
