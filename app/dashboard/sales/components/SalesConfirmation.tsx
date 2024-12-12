// SalesConfirmationModal.tsx
import React, { useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { CircleCheckBig, Mail, Printer } from "lucide-react"
import InvoiceTemplate from '../../invoice/components/InvoiceTemplate'
import useAuth from '@/app/(auth)/Hooks/useAuth'
import useCustomer from '../hooks/useCustomer'
import { SaleData } from '../types'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

interface SalesConfirmationModalProps {
    isOpen: boolean
    onClose: () => void
    invoice: SaleData
}

export default function SalesConfirmationModal({ isOpen, onClose, invoice }: SalesConfirmationModalProps) {

    const componentRef = useRef<HTMLDivElement>(null);
    const { user } = useAuth()

    const { getCustomerWithName, selectedCustomerData } = useCustomer()

    useEffect(() => {
        getCustomerWithName(invoice?.customerName)
    }, [invoice?.customerName])

    const GeneratePDF = async () => {
        if (!componentRef.current) return;

        const canvas = await html2canvas(componentRef.current);

        // Convert canvas to Data URL
        const imgData = canvas.toDataURL('image/png');

        // Initialize jsPDF instance
        const pdf = new jsPDF('p', 'mm', 'a4');

        // Add the image to the PDF at specified position and size
        const pdfWidth = 210; // A4 width in mm
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width; // Maintain aspect ratio

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`Invoice-${invoice?.reference || 'unknown'}.pdf`);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <div ref={componentRef}>
                <InvoiceTemplate companyName={user?.displayName} companyEmail={user?.email} logo={user?.photoURL} customerEmail={selectedCustomerData?.email} customerTel={selectedCustomerData?.tel}  {...invoice} />
            </div>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <div className='flex items-center space-x-1 flex-row'>
                        <DialogTitle>Sale Confirmed!</DialogTitle>
                        <CircleCheckBig className='text-green-800 h-5 w-5' />
                    </div>
                    <DialogDescription className='text-semibold'>
                        Your sale has been successfully processed. What would you like to do with the invoice?
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <Button className="w-full bg-blue-500 hover:bg-blue-400">
                        <Mail className="mr-2 h-4 w-4" /> Email Invoice
                    </Button>
                    <Button onClick={() => GeneratePDF()} className="w-full border-blue-500 text-blue-500 hover:text-blue-500" variant={"outline"}>
                        <Printer className="mr-2 h-4 w-4 text-blue-500" /> Print Invoice
                    </Button>
                </div>
                <DialogFooter>
                    <Button onClick={onClose} className='border-blue-500 hover:bg-blue-500 hover:text-white' variant={"outline"}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
