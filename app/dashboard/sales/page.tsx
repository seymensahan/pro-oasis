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
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import {
    ArrowUpDown,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Download,
    FileText,
    Filter,
    MoreVertical,
    Printer,
    RefreshCw,
    Upload,
} from 'lucide-react'

// Define the type for sales data items
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

const salesData: Sale[] = [
    { id: 1, customerName: "Thomas", reference: "SL0101", date: "19 Jan 2023", status: "Completed", grandTotal: 550, paid: 550, due: 0, paymentStatus: "Paid", biller: "Admin" },
    { id: 2, customerName: "Rose", reference: "SL0102", date: "26 Jan 2023", status: "Completed", grandTotal: 250, paid: 250, due: 0, paymentStatus: "Paid", biller: "Admin" },
    { id: 3, customerName: "Benjamin", reference: "SL0103", date: "08 Feb 2023", status: "Completed", grandTotal: 570, paid: 570, due: 0, paymentStatus: "Paid", biller: "Admin" },
    { id: 4, customerName: "Lilly", reference: "SL0104", date: "12 Feb 2023", status: "Pending", grandTotal: 300, paid: 0, due: 300, paymentStatus: "Due", biller: "Admin" },
    { id: 5, customerName: "Freda", reference: "SL0105", date: "17 Mar 2023", status: "Pending", grandTotal: 700, paid: 0, due: 700, paymentStatus: "Due", biller: "Admin" },
    { id: 6, customerName: "Alwin", reference: "SL0106", date: "24 Mar 2023", status: "Completed", grandTotal: 400, paid: 400, due: 0, paymentStatus: "Paid", biller: "Admin" },
    { id: 7, customerName: "Maybelle", reference: "SL0107", date: "06 Apr 2023", status: "Pending", grandTotal: 120, paid: 0, due: 120, paymentStatus: "Due", biller: "Admin" },
    { id: 8, customerName: "Ellen", reference: "SL0108", date: "16 Apr 2023", status: "Completed", grandTotal: 830, paid: 830, due: 0, paymentStatus: "Paid", biller: "Admin" },
    { id: 9, customerName: "Kaitlin", reference: "SL0109", date: "04 May 2023", status: "Pending", grandTotal: 800, paid: 0, due: 800, paymentStatus: "Due", biller: "Admin" },
    { id: 10, customerName: "Grace", reference: "SL0110", date: "29 May 2023", status: "Completed", grandTotal: 460, paid: 460, due: 0, paymentStatus: "Paid", biller: "Admin" },
    { id: 11, customerName: "Oliver", reference: "SL0111", date: "03 Jun 2023", status: "Completed", grandTotal: 680, paid: 680, due: 0, paymentStatus: "Paid", biller: "Admin" },
    { id: 12, customerName: "Sophie", reference: "SL0112", date: "10 Jun 2023", status: "Pending", grandTotal: 350, paid: 0, due: 350, paymentStatus: "Due", biller: "Admin" },
    { id: 13, customerName: "Lucas", reference: "SL0113", date: "18 Jun 2023", status: "Completed", grandTotal: 920, paid: 920, due: 0, paymentStatus: "Paid", biller: "Admin" },
    { id: 14, customerName: "Emma", reference: "SL0114", date: "25 Jun 2023", status: "Pending", grandTotal: 540, paid: 0, due: 540, paymentStatus: "Due", biller: "Admin" },
    { id: 15, customerName: "Liam", reference: "SL0115", date: "02 Jul 2023", status: "Completed", grandTotal: 730, paid: 730, due: 0, paymentStatus: "Paid", biller: "Admin" },
    { id: 16, customerName: "Ava", reference: "SL0116", date: "09 Jul 2023", status: "Pending", grandTotal: 280, paid: 0, due: 280, paymentStatus: "Due", biller: "Admin" },
    { id: 17, customerName: "Noah", reference: "SL0117", date: "16 Jul 2023", status: "Completed", grandTotal: 610, paid: 610, due: 0, paymentStatus: "Paid", biller: "Admin" },
    { id: 18, customerName: "Isabella", reference: "SL0118", date: "23 Jul 2023", status: "Pending", grandTotal: 420, paid: 0, due: 420, paymentStatus: "Due", biller: "Admin" },
    { id: 19, customerName: "Ethan", reference: "SL0119", date: "30 Jul 2023", status: "Completed", grandTotal: 890, paid: 890, due: 0, paymentStatus: "Paid", biller: "Admin" },
    { id: 20, customerName: "Mia", reference: "SL0120", date: "06 Aug 2023", status: "Pending", grandTotal: 370, paid: 0, due: 370, paymentStatus: "Due", biller: "Admin" },
    { id: 21, customerName: "James", reference: "SL0121", date: "13 Aug 2023", status: "Completed", grandTotal: 750, paid: 750, due: 0, paymentStatus: "Paid", biller: "Admin" },
    { id: 22, customerName: "Charlotte", reference: "SL0122", date: "20 Aug 2023", status: "Pending", grandTotal: 490, paid: 0, due: 490, paymentStatus: "Due", biller: "Admin" },
    { id: 23, customerName: "William", reference: "SL0123", date: "27 Aug 2023", status: "Completed", grandTotal: 630, paid: 630, due: 0, paymentStatus: "Paid", biller: "Admin" },]

export default function SalesList() {
    const [currentPage, setCurrentPage] = useState<number>(1)
    const itemsPerPage = 10
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = salesData.slice(indexOfFirstItem, indexOfLastItem)
    const totalPages = Math.ceil(salesData.length / itemsPerPage)

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

    return (
        <div className="container mx-auto p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Sales List</h1>
                    <p className="text-sm text-gray-600">Manage Your Sales</p>
                </div>
                <div className="flex space-x-2">
                    <Button variant="outline" size="icon">
                        <FileText className="h-4 w-4 text-red-500" />
                    </Button>
                    <Button variant="outline" size="icon">
                        <Download className="h-4 w-4 text-green-500" />
                    </Button>
                    <Button variant="outline" size="icon">
                        <Printer className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                        <RefreshCw className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                        <ChevronDown className="h-4 w-4" />
                    </Button>
                    <Button>
                        <Upload className="h-4 w-4 mr-2" />
                        Add New Sales
                    </Button>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="flex justify-between items-center mb-4">
                <div className="relative">
                    <Input
                        type="search"
                        placeholder="Search"
                        className="pl-10 pr-4 py-2 w-64 rounded-md border border-gray-300"
                    />
                    <svg
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>
                <div className="flex items-center space-x-2">
                    <Button variant="outline" size="icon">
                        <Filter className="h-4 w-4 text-orange-500" />
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                                Newest
                                <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>Newest</DropdownMenuItem>
                            <DropdownMenuItem>Oldest</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Sales Table */}
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
                        {currentItems.map((sale) => (
                            <TableRow key={sale.id}>
                                <TableCell>
                                    <Checkbox />
                                </TableCell>
                                <TableCell className="font-medium">{sale.customerName}</TableCell>
                                <TableCell>{sale.reference}</TableCell>
                                <TableCell>{sale.date}</TableCell>
                                <TableCell>
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs ${sale.status === 'Completed'
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
                                        className={`px-2 py-1 rounded-full text-xs ${sale.paymentStatus === 'Paid'
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
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-4">
                <div className="flex flex-1 justify-between sm:hidden">
                    <Button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        variant="outline"
                    >
                        Previous
                    </Button>
                    <Button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        variant="outline"
                    >
                        Next
                    </Button>
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-gray-700">
                            Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
                            <span className="font-medium">{Math.min(indexOfLastItem, salesData.length)}</span> of{' '}
                            <span className="font-medium">{salesData.length}</span> results
                        </p>
                    </div>
                    <div>
                        <nav
                            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                            aria-label="Pagination"
                        >
                            <Button
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                                variant="outline"
                                className="rounded-l-md"
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            {[...Array(totalPages)].map((_, index) => (
                                <Button
                                    key={index}
                                    onClick={() => paginate(index + 1)}
                                    variant={index + 1 === currentPage ? 'solid' : 'outline'}
                                    className="px-3 py-1"
                                >
                                    {index + 1}
                                </Button>
                            ))}
                            <Button
                                onClick={() => paginate(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                variant="outline"
                                className="rounded-r-md"
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    )
}
