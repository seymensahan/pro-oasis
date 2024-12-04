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
