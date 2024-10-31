"use client"

import React, { useState } from 'react'
import SalesHeader from '@/app/dashboard/sales/components/SalesHeader'
import SalesSearchAndFilter from '@/app/dashboard/sales/components/SalesSearchAndFilter'
import SalesTable from '@/app/dashboard/sales/components/SalesTable'
import SalesPagination from '@/app/dashboard/sales/components/SalesPagination'
import { useSales } from './hooks/useSales'
import { SaleData } from './types'

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

// Direct salesData declaration within the component
// const salesData: Sale[] = [
//     { id: 1, customerName: "Thomas", reference: "SL0101", date: "19 Jan 2023", status: "Completed", grandTotal: 550, paid: 550, due: 0, paymentStatus: "Paid", biller: "Admin" },
//     { id: 19, customerName: "Ethan", reference: "SL0119", date: "30 Jul 2023", status: "Completed", grandTotal: 890, paid: 890, due: 0, paymentStatus: "Paid", biller: "Admin" },
// ]


const SalesList: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [searchTerm, setSearchTerm] = useState<string>("")
    const [sortField, setSortField] = useState<keyof SaleData>("date")
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
    const itemsPerPage = 10
    const { sales, loading } = useSales()

    // Filtering and sorting logic
    const filteredAndSortedData = sales
        .filter(sale =>
            sale.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            sale.reference.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            if (a[sortField] < b[sortField]) return sortDirection === "asc" ? -1 : 1;
            if (a[sortField] > b[sortField]) return sortDirection === "asc" ? 1 : -1;
            return 0;
        });

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = filteredAndSortedData.slice(indexOfFirstItem, indexOfLastItem)
    const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage)

    const handleSort = (field: keyof SaleData) => {
        if (field === sortField) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortDirection("asc");
        }
    };

    return (
        <div className="container mx-auto p-6">
            <SalesHeader />
            <SalesSearchAndFilter
                setSearchTerm={setSearchTerm}
                sortField={sortField as string}
                sortDirection={sortDirection}
                onSort={(field: string) => handleSort(field as keyof SaleData)}
            />
            <SalesTable
                salesData={currentItems}
                sortField={sortField as string}
                sortDirection={sortDirection}
                onSort={(field: string) => handleSort(field as keyof SaleData)}
            />
            <SalesPagination
                currentPage={currentPage}
                totalPages={totalPages}
                paginate={setCurrentPage}
            />
        </div>
    )
}

export default SalesList
