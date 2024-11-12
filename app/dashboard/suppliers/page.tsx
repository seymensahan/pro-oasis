'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Plus, Phone, Mail, Globe } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import CreateSupplierModal from './components/CreateSupplierModal'

// Mock data for suppliers
const allSuppliers = [
    { id: 1, name: "CleanCo", contact: "John Doe", phone: "+1234567890", email: "john@cleanco.com", website: "www.cleanco.com" },
    { id: 2, name: "OfficeSupplies Inc", contact: "Jane Smith", phone: "+0987654321", email: "jane@officesupplies.com", website: "www.officesupplies.com" },
    { id: 3, name: "KitchenWare Ltd", contact: "Bob Johnson", phone: "+1122334455", email: "bob@kitchenware.com", website: "www.kitchenware.com" },
    { id: 4, name: "TechGadgets Co", contact: "Alice Brown", phone: "+5566778899", email: "alice@techgadgets.com", website: "www.techgadgets.com" },
    { id: 5, name: "FurniturePlus", contact: "Charlie Davis", phone: "+9988776655", email: "charlie@furnitureplus.com", website: "www.furnitureplus.com" },
]

export default function SuppliersPage() {
    const [currentPage, setCurrentPage] = useState(1)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        contact: '',
        phone: '',
        email: '',
        website: ''
    })

    const itemsPerPage = 4
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentSuppliers = allSuppliers.slice(indexOfFirstItem, indexOfLastItem)
    const totalPages = Math.ceil(allSuppliers.length / itemsPerPage)

    const handleAddNew = () => {
        setFormData({
            name: '',
            contact: '',
            phone: '',
            email: '',
            website: ''
        })
        setIsModalOpen(true)
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        // Handle form submission here
        console.log(formData)
        setIsModalOpen(false)
    }

    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Suppliers</h1>
                    <p className="text-gray-600">Manage your suppliers</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button onClick={handleAddNew} className='bg-blue-400 hover:bg-blue-500'>
                        <Plus className="h-4 w-4 mr-2 " /> Add New Supplier
                    </Button>
                    <Link href="/supplies">
                        <Button variant="outline">Manage Supplies</Button>
                    </Link>
                </div>
            </div>

            <div className="flex justify-between items-center mb-6">
                <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <Input type="search" placeholder="Search suppliers..." className="pl-10" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentSuppliers.map((supplier) => (
                    <Card key={supplier.id}>
                        <CardHeader>
                            <CardTitle>{supplier.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p><strong>Contact:</strong> {supplier.contact}</p>
                            <p className="flex items-center mt-2">
                                <Phone className="h-4 w-4 mr-2" />
                                {supplier.phone}
                            </p>
                            <p className="flex items-center mt-2">
                                <Mail className="h-4 w-4 mr-2" />
                                {supplier.email}
                            </p>
                            <p className="flex items-center mt-2">
                                <Globe className="h-4 w-4 mr-2" />
                                {supplier.website}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="mt-6 flex items-center justify-between">
                <p className="text-sm text-gray-500">
                    Showing page {currentPage} of {totalPages}
                </p>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </Button>
                </div>
            </div>

            <CreateSupplierModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    )
}