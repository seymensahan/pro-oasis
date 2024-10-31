import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { ArrowDownUp, MoreVertical } from 'lucide-react'
import { SaleData } from '../types'

interface SalesTableProps {
    salesData: SaleData[] // Use SaleData directly for type consistency
    sortField: keyof SaleData
    sortDirection: "asc" | "desc"
    onSort: (field: keyof SaleData) => void
}

const SalesTable: React.FC<SalesTableProps> = ({ salesData, sortField, sortDirection, onSort }) => {
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
                                <TableCell>{new Date(sale.date).toLocaleDateString()}</TableCell>
                                <TableCell>{sale.grandTotal.toFixed(2)} FCFA</TableCell>
                                <TableCell>{sale.paid.toFixed(2)} FCFA</TableCell>
                                <TableCell>{sale.due.toFixed(2)} FCFA</TableCell>
                                <TableCell>
                                    <span
                                        className={`flex px-6 py-2 justify-center items-center w-[50%] ml-[20%] rounded-full text-xs ${
                                            sale.paymentStatus === 'Paid'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                        }`}
                                    >
                                        {sale.paymentStatus}
                                    </span>
                                </TableCell>
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