"use client";

import React, { useState, useEffect } from 'react';
import { ProductTable } from '@/app/dashboard/product/components/ProductTable';
import { SearchAndSort } from '@/app/dashboard/product/components/SearchAndSort';
import ProductPagination from '@/app/dashboard/product/components/ProductPagination';
import { ChevronDown, Download, FileUp, Plus, Printer, RefreshCcw, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import useGetService from './hooks/useGetService';
import { ServiceDataProps } from '@/lib/Types';
import { ServiceTable } from './components/ServiceTable';

export default function Page() {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [sortBy, setSortBy] = useState<string>('name'); // Default sort by 'name'
    const itemsPerPage = 10;
    const { services, loading, error } = useGetService()

    const filteredProducts = services?.filter(service =>
        service?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        // product?.userId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service?.category?.toLowerCase().includes(searchTerm.toLowerCase())
        // product?.brand?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];


    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, sortBy]);

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Service List</h1>
                    <p className="text-gray-600">Manage your services</p>
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
                    <Link href={"./create-product"}>
                        <Button className="bg-blue-500 hover:bg-blue-400 text-white">
                            <Plus className="h-4 w-4 mr-2" />
                            Add New Service
                        </Button>
                    </Link>
                    {/* <Button variant="secondary">
                        <FileUp className="h-4 w-4 mr-2" />
                        Import serv
                    </Button> */}
                </div>
            </div>
            {loading ? (
                <p>Loading services...</p>
            ) : error ? (
                <p>Error fetching services: {error.message}</p>
            ) : (
                <>
                    <SearchAndSort
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                    />
                    <div className="bg-white shadow-md p-5 rounded-lg overflow-hidden">
                        <ServiceTable services={currentItems as ServiceDataProps[]} />
                    </div>
                    <ProductPagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={paginate}
                    />
                </>
            )}
        </div>
    );
}
