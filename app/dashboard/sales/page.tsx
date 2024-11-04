"use client"

import React, { useState } from 'react';
import SalesHeader from '@/app/dashboard/sales/components/SalesHeader';
import SalesSearchAndFilter from '@/app/dashboard/sales/components/SalesSearchAndFilter';
import SalesTable from '@/app/dashboard/sales/components/SalesTable';
import SalesPagination from '@/app/dashboard/sales/components/SalesPagination';
import { useSales } from './hooks/useSales';
import { SaleData } from './types';

const SalesList = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [sortField, setSortField] = useState<keyof SaleData>('date');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
    const itemsPerPage = 10;
    const { sales, loading } = useSales();

    // Filtering and sorting logic
    const filteredAndSortedData = sales
        .filter(sale =>
            sale.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            sale.reference.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
            if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredAndSortedData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);

    const handleSort = (field: keyof SaleData) => {
        if (field === sortField) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    return (
        <div className="container mx-auto p-6">
            <SalesHeader />
            <SalesSearchAndFilter
                setSearchTerm={setSearchTerm}
                sortField={sortField} // Pass sortField as keyof SaleData
                sortDirection={sortDirection}
                onSort={handleSort} // Updated to pass handleSort directly
            />
            <SalesTable
                salesData={currentItems}
                sortField={sortField} // Pass sortField as keyof SaleData
                sortDirection={sortDirection}
                onSort={handleSort} // Updated to pass handleSort directly
            />
            <SalesPagination
                currentPage={currentPage}
                totalPages={totalPages}
                paginate={setCurrentPage}
            />
        </div>
    );
};

export default SalesList;
