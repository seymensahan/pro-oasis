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
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpDown, ChevronLeft, ChevronRight, FileText, Filter, Printer, RefreshCw, Search } from 'lucide-react'
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface StockItem {
    id: number
    product: string
    reference: string
    date: string
    quantity: number
    unitPrice: number
    totalAmount: number
}

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

const stockData: StockItem[] = [
    { id: 1, product: "Coca Cola Pack de 6 (1L)", reference: "COCA COLA 1L PET", date: "25 Jul 2023", quantity: 3894, unitPrice: 2809, totalAmount: 10937806 },
    { id: 2, product: "Fanta Orange 1.5L", reference: "FANTA 1.5L PET", date: "28 Jul 2023", quantity: 2500, unitPrice: 2500, totalAmount: 6250000 },
    { id: 3, product: "Sprite 2L", reference: "SPRITE 2L PET", date: "24 Jul 2023", quantity: 1800, unitPrice: 3000, totalAmount: 5400000 },
    { id: 4, product: "Schweppes Tonic 33cl", reference: "SCHWEPPES 33CL", date: "15 Jul 2023", quantity: 5000, unitPrice: 1500, totalAmount: 7500000 },
]

const stockMovements: StockMovement[] = [
    { date: "12/04/2023", reference: "CDC PACK 6", description: "Stock initial", entryQty: 3894, entryAmount: 14433468, exitQty: 0, exitAmount: 0, damageQty: 0, damageAmount: 0, balance: 3894 },
    { date: "17/04/2023", reference: "CDC PACK 6", description: "Sortie", entryQty: 0, entryAmount: 0, exitQty: 21, exitAmount: 58968, damageQty: 0, damageAmount: 0, balance: 3873 },
    { date: "17/04/2023", reference: "CDC PACK 6", description: "Sortie", entryQty: 0, entryAmount: 0, exitQty: 29, exitAmount: 81461, damageQty: 0, damageAmount: 0, balance: 3844 },
    { date: "18/04/2023", reference: "CDC PACK 6", description: "Sortie", entryQty: 0, entryAmount: 0, exitQty: 38, exitAmount: 106742, damageQty: 0, damageAmount: 0, balance: 3806 },
    { date: "18/04/2023", reference: "CDC PACK 6", description: "Sortie", entryQty: 0, entryAmount: 0, exitQty: 53, exitAmount: 148877, damageQty: 0, damageAmount: 0, balance: 3753 },
]

export default function StockManagement() {
    const [selectedProduct, setSelectedProduct] = useState<StockItem | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const openModal = (product: StockItem) => {
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
                            {stockData.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        <Checkbox />
                                    </TableCell>
                                    <TableCell className="font-medium">{item.product}</TableCell>
                                    <TableCell>{item.reference}</TableCell>
                                    <TableCell>{item.date}</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell>{item.unitPrice.toLocaleString()} FCFA</TableCell>
                                    <TableCell>{item.totalAmount.toLocaleString()} FCFA</TableCell>
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

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">
                            Fiche de Stock: {selectedProduct?.product || 'Produit non sélectionné'}
                        </DialogTitle>
                    </DialogHeader>
                    {selectedProduct ? (
                        <div className="mt-4 space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Informations Générales</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p><strong>Référence:</strong> {selectedProduct?.reference}</p>
                                        <p><strong>Stock initial:</strong> {selectedProduct?.quantity}</p>
                                        <p><strong>Coût d'achat moyen:</strong> {selectedProduct?.unitPrice.toLocaleString()} FCFA</p>
                                        <p><strong>Prix de vente moyen:</strong> {(selectedProduct?.unitPrice * 1.2).toLocaleString()} FCFA</p>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Statistiques</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p><strong>Total des entrées:</strong> {stockMovements.reduce((sum, movement) => sum + movement.entryQty, 0)}</p>
                                        <p><strong>Total des sorties:</strong> {stockMovements.reduce((sum, movement) => sum + movement.exitQty, 0)}</p>
                                        <p><strong>Total des avaries:</strong> {stockMovements.reduce((sum, movement) => sum + movement.damageQty, 0)}</p>
                                        <p><strong>Solde actuel:</strong> {stockMovements[stockMovements.length - 1].balance}</p>
                                    </CardContent>
                                </Card>
                            </div>

                            <Tabs defaultValue="movements">
                                <TabsList className="grid w-full grid-cols-3">
                                    <TabsTrigger value="movements">Mouvements de Stock</TabsTrigger>
                                    <TabsTrigger value="chart">Graphique</TabsTrigger>
                                    <TabsTrigger value="analysis">Analyse</TabsTrigger>
                                </TabsList>
                                <TabsContent value="movements">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Mouvements de Stock</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>Date</TableHead>
                                                        <TableHead>Référence</TableHead>
                                                        <TableHead>Libellé</TableHead>
                                                        <TableHead>Entrées Qté</TableHead>
                                                        <TableHead>Entrées Montant</TableHead>
                                                        <TableHead>Sorties Qté</TableHead>
                                                        <TableHead>Sorties Montant</TableHead>
                                                        <TableHead>Avaries Qté</TableHead>
                                                        <TableHead>Avaries Montant</TableHead>
                                                        <TableHead>Solde</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {stockMovements.map((movement, index) => (
                                                        <TableRow key={index}>
                                                            <TableCell>{movement.date}</TableCell>
                                                            <TableCell>{movement.reference}</TableCell>
                                                            <TableCell>{movement.description}</TableCell>
                                                            <TableCell>{movement.entryQty}</TableCell>

                                                            <TableCell>{movement.entryAmount.toLocaleString()}</TableCell>
                                                            <TableCell>{movement.exitQty}</TableCell>
                                                            <TableCell>{movement.exitAmount.toLocaleString()}</TableCell>
                                                            <TableCell>{movement.damageQty}</TableCell>
                                                            <TableCell>{movement.damageAmount.toLocaleString()}</TableCell>
                                                            <TableCell>{movement.balance}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                                <TabsContent value="chart">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Graphique des Mouvements de Stock</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <ChartContainer
                                                config={{
                                                    balance: {
                                                        label: "Solde",
                                                        color: "hsl(var(--chart-1))",
                                                    },
                                                    entries: {
                                                        label: "Entrées",
                                                        color: "hsl(var(--chart-2))",
                                                    },
                                                    exits: {
                                                        label: "Sorties",
                                                        color: "hsl(var(--chart-3))",
                                                    },
                                                }}
                                                className="h-[400px]"
                                            >
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <LineChart data={stockMovements}>
                                                        <CartesianGrid strokeDasharray="3 3" />
                                                        <XAxis dataKey="date" />
                                                        <YAxis />
                                                        <ChartTooltip content={<ChartTooltipContent />} />
                                                        <Legend />
                                                        <Line type="monotone" dataKey="balance" stroke="var(--color-balance)" name="Solde" />
                                                        <Line type="monotone" dataKey="entryQty" stroke="var(--color-entries)" name="Entrées" />
                                                        <Line type="monotone" dataKey="exitQty" stroke="var(--color-exits)" name="Sorties" />
                                                    </LineChart>
                                                </ResponsiveContainer>
                                            </ChartContainer>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                                <TabsContent value="analysis">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Analyse du Stock</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-4">
                                                <div>
                                                    <h3 className="text-lg font-semibold">Taux de rotation du stock</h3>
                                                    <p>Le taux de rotation du stock est de {calculateTurnoverRate(stockMovements)}. Ce chiffre indique combien de fois le stock a été vendu et remplacé sur la période donnée.</p>
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-semibold">Ventes moyennes journalières</h3>
                                                    <p>Les ventes moyennes journalières sont de {calculateAverageDailySales(stockMovements)} unités. Cette information peut aider à prévoir les besoins futurs en stock.</p>
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-semibold">Recommandations</h3>
                                                    <ul className="list-disc list-inside space-y-2">
                                                        <li>Surveillez de près les produits à faible rotation pour éviter le surstockage.</li>
                                                        <li>Envisagez d'augmenter les commandes pour les produits à forte rotation afin d'éviter les ruptures de stock.</li>
                                                        <li>Analysez les tendances saisonnières pour ajuster les niveaux de stock en conséquence.</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                            </Tabs>
                        </div>
                    ) : (
                        <p>Veuillez sélectionner un produit pour voir les détails.</p>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}
