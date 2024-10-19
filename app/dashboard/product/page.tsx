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
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowUpDown, ChevronDown, ChevronLeft, ChevronRight, Download, Eye, FileUp, Pencil, Plus, Printer, RefreshCcw, Trash2, Upload } from 'lucide-react'

// Define types for products and pagination
interface Product {
    id: number;
    name: string;
    image: string;
    sku: string;
    category: string;
    brand: string;
    price: number;
    unit: string;
    qty: number;
    createdBy: {
        name: string;
        avatar: string;
    };
}

export default function page() {
    const products: Product[] = [
        { id: 1, name: "Lenovo 3rd Generation", image: "/placeholder.svg?height=40&width=40", sku: "PT001", category: "Laptop", brand: "Lenovo", price: 12500.00, unit: "Pc", qty: 100, createdBy: { name: "Arroon", avatar: "/placeholder.svg?height=32&width=32" } },
        { id: 2, name: "Bold V3.2", image: "/placeholder.svg?height=40&width=40", sku: "PT002", category: "Electronics", brand: "Bolt", price: 1600.00, unit: "Pc", qty: 140, createdBy: { name: "Kenneth", avatar: "/placeholder.svg?height=32&width=32" } },
        { id: 3, name: "Nike Jordan", image: "/placeholder.svg?height=40&width=40", sku: "PT003", category: "Shoe", brand: "Nike", price: 6000.00, unit: "Pc", qty: 780, createdBy: { name: "Gooch", avatar: "/placeholder.svg?height=32&width=32" } },
        { id: 4, name: "Apple Series 5 Watch", image: "/placeholder.svg?height=40&width=40", sku: "PT004", category: "Electronics", brand: "Apple", price: 25000.00, unit: "Pc", qty: 450, createdBy: { name: "Nathan", avatar: "/placeholder.svg?height=32&width=32" } },
        { id: 5, name: "Amazon Echo Dot", image: "/placeholder.svg?height=40&width=40", sku: "PT005", category: "Speaker", brand: "Amazon", price: 1600.00, unit: "Pc", qty: 477, createdBy: { name: "Alice", avatar: "/placeholder.svg?height=32&width=32" } },
        { id: 6, name: "Lobar Handy", image: "/placeholder.svg?height=40&width=40", sku: "PT006", category: "Furnitures", brand: "Woodmart", price: 4521.00, unit: "Kg", qty: 145, createdBy: { name: "Robb", avatar: "/placeholder.svg?height=32&width=32" } },
        { id: 7, name: "Red Premium Handy", image: "/placeholder.svg?height=40&width=40", sku: "PT007", category: "Bags", brand: "Versace", price: 2024.00, unit: "Kg", qty: 747, createdBy: { name: "Steven", avatar: "/placeholder.svg?height=32&width=32" } },
        { id: 8, name: "Iphone 14 Pro", image: "/placeholder.svg?height=40&width=40", sku: "PT008", category: "Phone", brand: "Iphone", price: 1698.00, unit: "Pc", qty: 897, createdBy: { name: "Gravely", avatar: "/placeholder.svg?height=32&width=32" } },
        { id: 9, name: "Black Slim 200", image: "/placeholder.svg?height=40&width=40", sku: "PT009", category: "Chairs", brand: "Bently", price: 6794.00, unit: "Pc", qty: 741, createdBy: { name: "Kevin", avatar: "/placeholder.svg?height=32&width=32" } },
        { id: 10, name: "Woodcraft Sandal", image: "/placeholder.svg?height=40&width=40", sku: "PT010", category: "Bags", brand: "Woodcraft", price: 4547.00, unit: "Kg", qty: 148, createdBy: { name: "Grillo", avatar: "/placeholder.svg?height=32&width=32" } },
        { id: 11, name: "Lobar Handy", image: "/placeholder.svg?height=40&width=40", sku: "PT006", category: "Furnitures", brand: "Woodmart", price: 4521.00, unit: "Kg", qty: 145, createdBy: { name: "Robb", avatar: "/placeholder.svg?height=32&width=32" } },
        { id: 12, name: "Red Premium Handy", image: "/placeholder.svg?height=40&width=40", sku: "PT007", category: "Bags", brand: "Versace", price: 2024.00, unit: "Kg", qty: 747, createdBy: { name: "Steven", avatar: "/placeholder.svg?height=32&width=32" } },
        { id: 13, name: "Iphone 14 Pro", image: "/placeholder.svg?height=40&width=40", sku: "PT008", category: "Phone", brand: "Iphone", price: 1698.00, unit: "Pc", qty: 897, createdBy: { name: "Gravely", avatar: "/placeholder.svg?height=32&width=32" } },
        { id: 14, name: "Black Slim 200", image: "/placeholder.svg?height=40&width=40", sku: "PT009", category: "Chairs", brand: "Bently", price: 6794.00, unit: "Pc", qty: 741, createdBy: { name: "Kevin", avatar: "/placeholder.svg?height=32&width=32" } },
        { id: 15, name: "Woodcraft Sandal", image: "/placeholder.svg?height=40&width=40", sku: "PT010", category: "Bags", brand: "Woodcraft", price: 4547.00, unit: "Kg", qty: 148, createdBy: { name: "Grillo", avatar: "/placeholder.svg?height=32&width=32" } },
    ];

    const [currentPage, setCurrentPage] = useState<number>(1)
    const itemsPerPage = 10
    const totalPages = Math.ceil(products.length / itemsPerPage)

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = products.slice(indexOfFirstItem, indexOfLastItem)

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

    return (
        <div className="container mx-auto px-4 py-4">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Product List</h1>
                    <p className="text-gray-600">Manage your products</p>
                </div>
                <div className="flex space-x-2">
                    <Button variant="outline" size="icon">
                        <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                        <Upload className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                        <Printer className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                        <RefreshCcw className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                        <ChevronDown className="h-4 w-4" />
                    </Button>
                    <Button className="bg-orange-600">
                        <Plus className="h-4 w-4 mr-2 " />
                        Add New Product
                    </Button>
                    <Button variant="secondary">
                        <FileUp className="h-4 w-4 mr-2" />
                        Import Product
                    </Button>
                </div>
            </div>

            {/* Search & Sort */}
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
                        <svg
                            className="h-4 w-4 text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                            />
                        </svg>
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                                Sort by Date
                                <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>Date Ascending</DropdownMenuItem>
                            <DropdownMenuItem>Date Descending</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Product Table */}
            <div className="bg-white shadow-md p-5 rounded-lg overflow-hidden">
                <Table className="">
                    <TableHeader >
                        <TableRow>
                            <TableHead className="w-12">
                                <Checkbox />
                            </TableHead>
                            <TableHead>Product</TableHead>
                            <TableHead>
                                SKU
                                <ArrowUpDown className="ml-2 h-4 w-4" />
                            </TableHead>
                            <TableHead>
                                Category
                                <ArrowUpDown className="ml-2 h-4 w-4" />
                            </TableHead>
                            <TableHead>
                                Brand
                                <ArrowUpDown className="ml-2 h-4 w-4" />
                            </TableHead>
                            <TableHead>
                                Price
                                <ArrowUpDown className="ml-2 h-4 w-4" />
                            </TableHead>
                            <TableHead>
                                Unit
                                <ArrowUpDown className="ml-2 h-4 w-4" />
                            </TableHead>
                            <TableHead>
                                Qty
                                <ArrowUpDown className="ml-2 h-4 w-4" />
                            </TableHead>
                            <TableHead>
                                Created by
                                <ArrowUpDown className="ml-2 h-4 w-4" />
                            </TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="space-y-5">
                        {currentItems.map((product) => (
                            <TableRow key={product.id} >
                                <TableCell>
                                    <Checkbox />
                                </TableCell>
                                <TableCell className="font-medium">
                                    <div className="flex items-center space-x-3">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="h-10 w-10 rounded-full"
                                        />
                                        <span>{product.name}</span>
                                    </div>
                                </TableCell>
                                <TableCell>{product.sku}</TableCell>
                                <TableCell>{product.category}</TableCell>
                                <TableCell>{product.brand}</TableCell>
                                <TableCell>${product.price.toFixed(2)}</TableCell>
                                <TableCell>{product.unit}</TableCell>
                                <TableCell>{product.qty}</TableCell>
                                <TableCell>
                                    <div className="flex items-center space-x-2">
                                        <img
                                            src={product.createdBy.avatar}
                                            alt={product.createdBy.name}
                                            className="h-8 w-8 rounded-full"
                                        />
                                        <span>{product.createdBy.name}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex space-x-2">
                                        <Button variant="ghost" size="icon">
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon">
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
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
                            <span className="font-medium">{Math.min(indexOfLastItem, products.length)}</span> of{' '}
                            <span className="font-medium">{products.length}</span> results
                        </p>
                    </div>
                    <div>
                        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                            <Button
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                                variant="outline"
                                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            >
                                <span className="sr-only">Previous</span>
                                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                            </Button>
                            {[...Array(totalPages)].map((_, index) => (
                                <Button
                                    key={index}
                                    onClick={() => paginate(index + 1)}
                                    variant={currentPage === index + 1 ? "default" : "outline"}
                                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold  ${currentPage === index + 1
                                            ? 'bg-orange-600 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600'
                                            : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                                        }`}
                                >
                                    {index + 1}
                                </Button>
                            ))}
                            <Button
                                onClick={() => paginate(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                variant="outline"
                                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
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
