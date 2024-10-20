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
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowUpDown, ChevronLeft, ChevronRight, FileText, Filter, Printer, RefreshCw, Trash2 } from 'lucide-react'

const stockData = [
    { id: 1, product: "Nike Jordan", date: "25 Jul 2023", quantity: 120, unitPrice: 5000 },
    { id: 2, product: "Apple Series 5 Watch", date: "28 Jul 2023", quantity: 130, unitPrice: 2300 },
    { id: 3, product: "Amazon Echo Dot", date: "24 Jul 2023", quantity: 140, unitPrice: 8600 },
    { id: 4, product: "Lobar Handy", date: "15 Jul 2023", quantity: 150, unitPrice: 1240 },
].map(item => ({
    ...item,
    totalAmount: item.quantity * item.unitPrice
}));

export default function ManageStock() {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); 

    // Calculate the items to display on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = stockData.slice(indexOfFirstItem, indexOfLastItem);

    // Calculate total pages
    const totalPages = Math.ceil(stockData.length / itemsPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Manage Stock</h1>
                    <p className="text-sm text-gray-600">Manage your stock</p>
                </div>
                <div className="flex space-x-2">
                    <Button variant="outline" size="icon">
                        <FileText className="h-4 w-4 text-red-500" />
                    </Button>
                    <Button variant="outline" size="icon">
                        <FileText className="h-4 w-4 text-green-500" />
                    </Button>
                    <Button variant="outline" size="icon">
                        <Printer className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                        <RefreshCw className="h-4 w-4" />
                    </Button>
                    <Button className="bg-blue-500 hover:bg-blue-400 text-white">
                        Add New
                    </Button>
                </div>
            </div>

            <div className="flex justify-between items-center mb-4">
                <div className="relative w-64">
                    <Input
                        type="search"
                        placeholder="Search"
                        className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300"
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
                        <Filter className="h-4 w-4 text-blue-500" />
                    </Button>
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Sort by..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="date">Date</SelectItem>
                            <SelectItem value="product">Product</SelectItem>
                            <SelectItem value="quantity">Quantity</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="bg-white shadow-md p-5 rounded-lg overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-12">
                                <Checkbox />
                            </TableHead>
                            <TableHead>Product</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Unit Price</TableHead>
                            <TableHead>Total Amount</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentItems.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>
                                    <Checkbox />
                                </TableCell>
                                <TableCell className="font-medium">{item.product}</TableCell>
                                <TableCell>{item.date}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>{item.unitPrice.toFixed(0)} FCFA</TableCell>
                                <TableCell>{item.totalAmount.toFixed(0)} FCFA</TableCell>
                                <TableCell className="flex space-x-2">
                                    <Button 
                                        variant="ghost" 
                                        size="sm" 
                                        className="h-8 w-8 p-0 border border-gray-200 hover:bg-blue-400 hover:border-blue-200 transition-colors duration-200 group"
                                    >
                                        <span className="sr-only">Edit</span>
                                        <FileText className="h-4 w-4 text-blue-300 group-hover:text-white transition-colors duration-200" />
                                    </Button>
                                    <Button 
                                        variant="ghost" 
                                        size="sm" 
                                        className="h-8 w-8 p-0 border border-gray-200 hover:bg-red-500 hover:border-red-200 transition-colors duration-200 group"
                                    >
                                        <span className="sr-only">Delete</span>
                                        <Trash2 className="h-4 w-4 text-red-500 group-hover:text-white transition-colors duration-200" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-4">
                <div className="flex flex-1 justify-between sm:hidden">
                    <Button 
                        variant="outline" 
                        onClick={() => handlePageChange(currentPage - 1)} 
                        disabled={currentPage === 1}
                    >
                        Previous
                    </Button>
                    <Button 
                        variant="outline" 
                        onClick={() => handlePageChange(currentPage + 1)} 
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </Button>
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-gray-700">
                            Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
                            <span className="font-medium">{Math.min(indexOfLastItem, stockData.length)}</span> of{' '}
                            <span className="font-medium">{stockData.length}</span> results
                        </p>
                    </div>
                    <div>
                        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                            <Button 
                                variant="outline" 
                                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                <span className="sr-only">Previous</span>
                                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                            </Button>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                                <Button 
                                    key={pageNumber}
                                    variant="outline" 
                                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                                        pageNumber === currentPage ? 'bg-blue-500 text-white' : 'text-gray-900'
                                    } ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}
                                    onClick={() => handlePageChange(pageNumber)}
                                >
                                    {pageNumber}
                                </Button>
                            ))}
                            <Button 
                                variant="outline" 
                                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                <span className="sr-only">Next</span>
                                <ChevronRight className="h-5 w-5" aria-hidden="true" />
                            </Button>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    )
}
