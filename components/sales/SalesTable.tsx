// File: components/sales/SalesTable.tsx

import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { MoreVertical } from 'lucide-react'

// Define the type for the sales data items
interface Sale {
    id: number
    customerName: string
    reference: string
    date: string
    status: 'Completed' | 'Pending'
    grandTotal: number
    paid: number
    due: number
    paymentStatus: 'Paid' | 'Due'
    biller: string
}

interface SalesTableProps {
    salesData: Sale[]  // List of current sales data (after filtering & pagination)
}

const SalesTable: React.FC<SalesTableProps> = ({ salesData }) => {
    return (
        <div className="bg-white p-5 shadow-md rounded-lg overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-12">
                            <Checkbox />
                        </TableHead>
                        <TableHead>Customer Name</TableHead>
                        <TableHead>Reference</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Grand Total</TableHead>
                        <TableHead>Paid</TableHead>
                        <TableHead>Due</TableHead>
                        <TableHead>Payment Status</TableHead>
                        <TableHead>Biller</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {salesData.length > 0 ? (
                        salesData.map((sale) => (
                            <TableRow key={sale.id}>
                                <TableCell>
                                    <Checkbox />
                                </TableCell>
                                <TableCell className="font-medium">{sale.customerName}</TableCell>
                                <TableCell>{sale.reference}</TableCell>
                                <TableCell>{sale.date}</TableCell>
                                <TableCell>
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs ${
                                            sale.status === 'Completed'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                        }`}
                                    >
                                        {sale.status}
                                    </span>
                                </TableCell>
                                <TableCell>${sale.grandTotal.toFixed(2)}</TableCell>
                                <TableCell>${sale.paid.toFixed(2)}</TableCell>
                                <TableCell>${sale.due.toFixed(2)}</TableCell>
                                <TableCell>
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs ${
                                            sale.paymentStatus === 'Paid'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                        }`}
                                    >
                                        {sale.paymentStatus}
                                    </span>
                                </TableCell>
                                <TableCell>{sale.biller}</TableCell>
                                <TableCell>
                                    <Button variant="ghost" size="icon">
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={10} className="text-center py-4">
                                No sales data available.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default SalesTable
