"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, Search, Filter } from 'lucide-react'
import InvoiceDetailModal from '@/app/dashboard/invoice/components/InvoiceDetailModal'
import useInvoice from './hooks/useInvoice'
import formatDate from '@/lib/FormatDate'
import { SaleData } from '../sales/types'

interface InvoiceItem {
    description: string
    quantity: number
    unitPrice: number
    total: number
}

interface Invoice {
    id: string
    customerName: string
    customerEmail: string
    date: string
    dueDate: string
    amount: number
    status: 'Paid' | 'Pending' | 'Overdue'
    items: InvoiceItem[]
}

const mockInvoices: Invoice[] = [
    {
        id: 'INV-001',
        customerName: 'John Doe',
        customerEmail: 'john@example.com',
        date: '2023-05-01',
        dueDate: '2023-05-15',
        amount: 1500.00,
        status: 'Paid',
        items: [
            { description: 'Item 1', quantity: 2, unitPrice: 500, total: 1000 },
            { description: 'Item 2', quantity: 1, unitPrice: 500, total: 500 },
        ]
    },
    {
        id: 'INV-002',
        customerName: 'Jane Smith',
        customerEmail: 'jane@example.com',
        date: '2023-05-03',
        dueDate: '2023-05-17',
        amount: 2300.50,
        status: 'Pending',
        items: [{ description: 'Service A', quantity: 1, unitPrice: 2300.50, total: 2300.50 }]
    },
    {
        id: 'INV-003',
        customerName: 'Bob Johnson',
        customerEmail: 'bob@example.com',
        date: '2023-04-28',
        dueDate: '2023-05-12',
        amount: 980.75,
        status: 'Overdue',
        items: [{ description: 'Product B', quantity: 1, unitPrice: 980.75, total: 980.75 }]
    }
]

export default function InvoiceListPage() {
    const { invoices, loading } = useInvoice()
    const [selectedInvoice, setSelectedInvoice] = useState<SaleData | null>(null)
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)

    const openDetailModal = (invoice: SaleData) => {
        setSelectedInvoice(invoice)
        setIsDetailModalOpen(true)
    }

    const closeDetailModal = () => {
        setIsDetailModalOpen(false)
        setSelectedInvoice(null)
    }

    return (
        <div className="container mx-auto p-4 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Invoices</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center space-x-2">
                            <div className="relative">
                                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <Input className="pl-8" placeholder="Search invoices..." />
                            </div>
                            <Select>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All</SelectItem>
                                    <SelectItem value="paid">Paid</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="overdue">Overdue</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button className='bg-blue-400 hover:bg-blue-500'>
                            <Filter className="mr-2 h-4 w-4" />
                            Advanced Filters
                        </Button>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Invoice ID</TableHead>
                                <TableHead>Customer Name</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Paid</TableHead>
                                <TableHead>Due</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {invoices.map((invoice) => (
                                <TableRow key={invoice.id}>
                                    <TableCell>{invoice.reference}</TableCell>
                                    <TableCell>{invoice.customerName}</TableCell>
                                    <TableCell>{formatDate(invoice.date)}</TableCell>
                                    <TableCell>{invoice.grandTotal} FCFA</TableCell>
                                    <TableCell>{invoice.paid} FCFA</TableCell>
                                    <TableCell>{invoice.due} FCFA</TableCell>
                                    <TableCell>
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${invoice.paymentStatus === 'Paid' ? 'bg-green-100 text-green-800' :
                                            invoice.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-red-100 text-red-800'
                                            }`}>
                                            {invoice.paymentStatus}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="ghost" size="sm" onClick={() => openDetailModal(invoice)}>
                                            <Eye className="h-4 w-4" />
                                            <span className="sr-only">View</span>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <InvoiceDetailModal
                isOpen={isDetailModalOpen}
                onClose={closeDetailModal}
                invoice={selectedInvoice}
            />
        </div>
    )
}
