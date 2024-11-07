import React from 'react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Mail, Printer, Download, ExternalLink } from "lucide-react"
import { SaleData } from '../../sales/types'
import formatDate from '@/lib/FormatDate'

interface InvoiceDetailModalProps {
    isOpen: boolean
    onClose: () => void
    invoice: SaleData | null
}

export default function InvoiceDetailModal({ isOpen, onClose, invoice }: InvoiceDetailModalProps) {
    if (!invoice) {
        return null
    }

    const subtotal = invoice.products?.reduce((sum, item) => sum + (item.price * item.quantityOrdered), 0) ?? 0;
    const tax = subtotal * 0.03; // Assuming 10% tax
    const total = subtotal + tax;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Invoice {invoice.reference}</DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="font-semibold text-lg">Customer Details</h3>
                            <p>{invoice.customerName}</p>
                        </div>
                        <div className="text-right">
                            <p className="font-semibold">Invoice Date: {formatDate(invoice.date)}</p>
                            <span className={`mt-2 inline-block px-2 py-1 rounded-full text-xs font-semibold ${invoice.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                    invoice.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-red-100 text-red-800'
                                }`}>
                                {invoice.status}
                            </span>
                        </div>
                    </div>

                    <Card>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Product</TableHead>
                                        <TableHead className="text-right">Quantity</TableHead>
                                        <TableHead className="text-right">Unit Price</TableHead>
                                        <TableHead className="text-right">Total</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {invoice.products?.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell className="text-right">{item.quantityOrdered}</TableCell>
                                            <TableCell className="text-right">{item.price} FCFA</TableCell>
                                            <TableCell className="text-right">{item.price * item.quantityOrdered} FCFA</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end">
                        <div className="w-1/2 space-y-2">
                            <div className="flex justify-between">
                                <span>Subtotal:</span>
                                <span>{subtotal.toFixed(2)} FCFA</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Tax (3%):</span>
                                <span>{tax.toFixed(2)} FCFA</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between font-semibold text-lg">
                                <span>Total:</span>
                                <span>{total.toFixed(2)} FCFA</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between items-center">
                        <div className="flex space-x-2">
                            <Button variant="default" size="sm">
                                <Mail className="mr-2 h-4 w-4" />
                                Email
                            </Button>
                            <Button variant="default" size="sm">
                                <Printer className="mr-2 h-4 w-4" />
                                Print
                            </Button>
                            <Button variant="default" size="sm">
                                <Download className="mr-2 h-4 w-4" />
                                Download
                            </Button>
                        </div>
                        <Button variant="outline" size="sm" onClick={onClose}>
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Go Back
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
