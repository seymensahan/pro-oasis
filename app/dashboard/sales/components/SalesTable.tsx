import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { ArrowDownUp, Edit, Eye, MoreVertical, Trash } from 'lucide-react'
import { SaleData } from '../types'
import { boolean, number } from 'zod'
import { Timestamp } from 'firebase/firestore'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import SalesDetail from './SalesDetails'

interface SalesTableProps {
    salesData: SaleData[];
    sortField: keyof SaleData; // Update to keyof SaleData
    sortDirection: 'asc' | 'desc';
    onSort: (field: keyof SaleData) => void; // Update to keyof SaleData
}


const formatDate = (timestamp: Timestamp): string => {
    const date = timestamp.toDate();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

const SalesTable: React.FC<SalesTableProps> = ({ salesData, sortField, sortDirection, onSort }) => {
    const [saleInfo, setSaleInfo] = useState(false)

    return (
        <div className="bg-white p-5 shadow-md rounded-lg overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-12">
                            <Checkbox />
                        </TableHead>
                        <TableHead onClick={() => onSort("customerName")} className="cursor-pointer">
                            <div className="flex items-center">
                                <span>Customer Name</span>
                                <ArrowDownUp className="h-4 w-4 ml-1" />
                            </div>
                        </TableHead>
                        <TableHead onClick={() => onSort("reference")} className="cursor-pointer">
                            <div className="flex items-center">
                                <span>Reference</span>
                                <ArrowDownUp className="h-4 w-4 ml-1" />
                            </div>
                        </TableHead>
                        <TableHead onClick={() => onSort("date")} className="cursor-pointer">
                            <div className="flex items-center">
                                <span>Date</span>
                                <ArrowDownUp className="h-4 w-4 ml-1" />
                            </div>
                        </TableHead>
                        <TableHead onClick={() => onSort("grandTotal")} className="cursor-pointer">
                            <div className="flex items-center">
                                <span>Grand Total</span>
                                <ArrowDownUp className="h-4 w-4 ml-1" />
                            </div>
                        </TableHead>
                        <TableHead onClick={() => onSort("paid")} className="cursor-pointer">
                            <div className="flex items-center">
                                <span>Paid</span>
                                <ArrowDownUp className="h-4 w-4 ml-1" />
                            </div>
                        </TableHead>
                        <TableHead onClick={() => onSort("due")} className="cursor-pointer">
                            <div className="flex items-center">
                                <span>Due</span>
                                <ArrowDownUp className="h-4 w-4 ml-1" />
                            </div>
                        </TableHead>
                        <TableHead onClick={() => onSort("paymentStatus")} className="cursor-pointer">
                            <div className="flex items-center">
                                <span>Payment Status</span>
                                <ArrowDownUp className="h-4 w-4 ml-1" />
                            </div>
                        </TableHead>
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
                                <TableCell>{formatDate(sale.date)}</TableCell>
                                <TableCell>{sale.grandTotal.toFixed(2)} FCFA</TableCell>
                                <TableCell>{sale.paid.toFixed(2)} FCFA</TableCell>
                                <TableCell>{sale.due.toFixed(2)} FCFA</TableCell>
                                <TableCell>
                                    <span
                                        className={`flex px-6 py-2 justify-center items-center w-[50%] ml-[20%] rounded-full text-xs ${sale.paymentStatus === 'Paid'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-red-100 text-red-800'
                                            }`}
                                    >
                                        {sale.paymentStatus}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <Popover>
                                        <PopoverTrigger>
                                            <Button variant="ghost" size="icon">
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="p-2 w-100 ">
                                            <div className="flex flex-col space-y-2">
                                                <button className="flex items-center space-x-2 hover:bg-blue-100 p-2 rounded" onClick={() => setSaleInfo(true)}>
                                                    <Eye className="h-4 w-4" />
                                                    <span>Sale Details</span>
                                                </button>
                                                <button className="flex items-center space-x-2 hover:bg-blue-100 p-2 rounded">
                                                    <Edit className="h-4 w-4" />
                                                    <span>Edit Payment</span>
                                                </button>
                                                <button className="flex items-center space-x-2 hover:bg-red-100 p-2 rounded">
                                                    <Trash className="h-4 w-4" />
                                                    <span>Delete Sale</span>
                                                </button>
                                            </div>
                                        </PopoverContent>
                                    </Popover>

                                </TableCell>
                                <SalesDetail isOpen={saleInfo} onClose={() => setSaleInfo(false)} salesData={sale} />
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