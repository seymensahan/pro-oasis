"use client"

import React, { useState, useEffect } from 'react'
import { Product } from './types'
import { products as initialProducts } from './data'
import { ProductTable } from '@/components/product/ProductTable'
import { SearchAndSort } from '@/components/product/SearchAndSort'
import ProductPagination from '@/components/product/ProductPagination'
import { ChevronDown, Download, FileUp, Plus, Printer, RefreshCcw, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'


export default function Page() {
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [sortBy, setSortBy] = useState<string>('');
    const itemsPerPage = 10

    useEffect(() => {
        let filteredProducts = initialProducts.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.brand.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (sortBy) {
            filteredProducts.sort((a, b) => {
                if (a[sortBy as keyof Product] < b[sortBy as keyof Product]) return -1;
                if (a[sortBy as keyof Product] > b[sortBy as keyof Product]) return 1;
                return 0;
            });
        }

        setProducts(filteredProducts);
        setCurrentPage(1);
    }, [searchTerm, sortBy]);

    const totalPages = Math.ceil(products.length / itemsPerPage)
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = products.slice(indexOfFirstItem, indexOfLastItem)

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

    return (
        <div className="container mx-auto px-4 py-4">
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
                    <Button className="bg-blue-500 hover:bg-blue-400 text-white">
                        <Plus className="h-4 w-4 mr-2 " />
                        Add New Product
                    </Button>
                    <Button variant="secondary">
                        <FileUp className="h-4 w-4 mr-2" />
                        Import Product
                    </Button>
                </div>
            </div>
            <SearchAndSort
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                sortBy={sortBy}
                setSortBy={setSortBy}
            />
            <div className="bg-white shadow-md p-5 rounded-lg overflow-hidden">
                <ProductTable products={currentItems} />
            </div>
            <ProductPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={paginate}
            />
        </div>
    )
}
