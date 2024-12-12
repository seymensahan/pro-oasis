'use client'

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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpDown, ChevronLeft, ChevronRight, FileText, Filter, Printer, RefreshCw, Search } from 'lucide-react'
import useGetProducts from '../product/hooks/useGetProducts'
import formatDate from '@/lib/FormatDate'
import { ProductDataProps } from '@/lib/Types'
import StockDetailsModal from './components/StockDetailsModal'


interface StockMovement {
    date: string
    reference: string
    description: string
    entryQty: number
    entryAmount: number
    exitQty: number
    exitAmount: number
    damageQty: number
    damageAmount: number
    balance: number
}



const stockMovements: StockMovement[] = [
    { date: "12/04/2023", reference: "CDC PACK 6", description: "Stock initial", entryQty: 3894, entryAmount: 14433468, exitQty: 0, exitAmount: 0, damageQty: 0, damageAmount: 0, balance: 3894 },
    { date: "17/04/2023", reference: "CDC PACK 6", description: "Sortie", entryQty: 0, entryAmount: 0, exitQty: 21, exitAmount: 58968, damageQty: 0, damageAmount: 0, balance: 3873 },
    { date: "17/04/2023", reference: "CDC PACK 6", description: "Sortie", entryQty: 0, entryAmount: 0, exitQty: 29, exitAmount: 81461, damageQty: 0, damageAmount: 0, balance: 3844 },
    { date: "18/04/2023", reference: "CDC PACK 6", description: "Sortie", entryQty: 0, entryAmount: 0, exitQty: 38, exitAmount: 106742, damageQty: 0, damageAmount: 0, balance: 3806 },
    { date: "18/04/2023", reference: "CDC PACK 6", description: "Sortie", entryQty: 0, entryAmount: 0, exitQty: 53, exitAmount: 148877, damageQty: 0, damageAmount: 0, balance: 3753 },
]

export default function StockManagement() {
    const [selectedProduct, setSelectedProduct] = useState<ProductDataProps | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { products, loading, error } = useGetProducts()


    const openModal = (product: ProductDataProps) => {
        setSelectedProduct(product)
        setIsModalOpen(true)
    }

    const calculateTurnoverRate = (movements: StockMovement[]) => {
        const totalSales = movements.reduce((sum, movement) => sum + movement.exitQty, 0)
        const averageInventory = movements[0].balance / 2 + movements[movements.length - 1].balance / 2
        return (totalSales / averageInventory).toFixed(2)
    }

    const calculateAverageDailySales = (movements: StockMovement[]) => {
        const totalSales = movements.reduce((sum, movement) => sum + movement.exitQty, 0)
        const daysBetween = (new Date(movements[movements.length - 1].date).getTime() - new Date(movements[0].date).getTime()) / (1000 * 3600 * 24)
        return (totalSales / daysBetween).toFixed(2)
    }

    return (
        <div className="container mx-auto p-6 space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Gestion des Stocks</h1>
                    <p className="text-sm text-gray-600">Gérez et suivez votre inventaire</p>
                </div>
                <div className="flex space-x-2 hidden">
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
                    <Button>
                        Ajouter un Produit
                    </Button>
                </div>
            </div>

            <div className="flex justify-between items-center">
                <div className="relative w-64">
                    <Input
                        type="search"
                        placeholder="Rechercher un produit"
                        className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
                <div className="flex items-center space-x-2">
                    <Button variant="outline" size="icon">
                        <Filter className="h-4 w-4 text-orange-500" />
                    </Button>
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Trier par..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="date">Date</SelectItem>
                            <SelectItem value="product">Produit</SelectItem>
                            <SelectItem value="quantity">Quantité</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <Card>
                <CardContent className="p-5">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-12">
                                    <Checkbox />
                                </TableHead>
                                <TableHead>Produit</TableHead>
                                <TableHead>Référence</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Quantité</TableHead>
                                <TableHead>Prix unitaire</TableHead>
                                <TableHead>Montant total</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        <Checkbox />
                                    </TableCell>
                                    <TableCell className="font-medium">{item.name}</TableCell>
                                    <TableCell>{item.reference}</TableCell>
                                    <TableCell>{formatDate(item.createdAt)}</TableCell>
                                    <TableCell>{item.stock}</TableCell>
                                    <TableCell>{item.price} FCFA</TableCell>
                                    <TableCell>{item.stock * item.price} FCFA</TableCell>
                                    <TableCell>
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => openModal(item)}>
                                            <span className="sr-only">Voir détails</span>
                                            <FileText className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Affichage de <span className="font-medium">1</span> à <span className="font-medium">4</span> sur{' '}
                        <span className="font-medium">4</span> résultats
                    </p>
                </div>
                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        <Button variant="outline" className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                            <span className="sr-only">Précédent</span>
                            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                        </Button>
                        <Button variant="outline" className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                            1
                        </Button>
                        <Button variant="outline" className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                            <span className="sr-only">Suivant</span>
                            <ChevronRight className="h-5 w-5" aria-hidden="true" />
                        </Button>
                    </nav>
                </div>
            </div>
            <StockDetailsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} products={selectedProduct}  />
        </div>
    )
}
