import { ModalProps, ProductDataProps } from '@/lib/Types'
import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import getProductSales from '../hooks/useProductSales'
import formatDate from '@/lib/FormatDate'
import useProductSales from '../hooks/useProductSales'
import useProductPurchases from '../hooks/useProductPurchases'
import { SaleData } from '../../sales/types'
import { Timestamp } from 'firebase/firestore'
import useFetchRessources from '../hooks/useFetchRessources'

type JoinType = {
    date?: Timestamp | Date | string;
    createAt?: Timestamp | Date | string;
    previousStock?: number;
    quantityPurchased?: number;
    grandTotal?: number;
    quantityOrdered?: number;
    subtotal?: number;
};


interface StockModalProps extends ModalProps {
    products: ProductDataProps | null

}



const StockDetailsModal = ({ isOpen, onClose, products }: StockModalProps) => {
    const { sales, getSalesByProductName } = useProductSales();
    const { purchase, getPurchaseByProductName } = useProductPurchases()
    const { fetchCollectionA, fetchCollectionB } = useFetchRessources()

    useEffect(() => {
        if (products?.name) {
            console.log("Fetching sales for product:", products.name);
            getSalesByProductName(products.name).then((allSales) => {
                console.log("Fetched sales:", allSales);
            });

            getPurchaseByProductName(products.name).then((allSales) => {
                console.log("Fetched sales:", allSales);
            });
        }
    }, [products?.name]);

    

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">
                        Stock sheet: {products?.name || 'Produit non sélectionné'}
                    </DialogTitle>
                </DialogHeader>
                {products ? (
                    <div className="mt-4 space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>General Information</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p><strong>Reference:</strong> {products?.reference}</p>
                                    <p><strong>Initial stock:</strong> {products?.stock}</p>
                                    <p><strong>Average purchase cost:</strong> {products?.purchasePrice} FCFA</p>
                                    <p><strong>Average sales price:</strong> {products?.price} FCFA</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Statistics</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {/* <p><strong>Total des entrées:</strong> {stockMovements.reduce((sum, movement) => sum + movement.entryQty, 0)}</p>
                                    <p><strong>Total des sorties:</strong> {stockMovements.reduce((sum, movement) => sum + movement.exitQty, 0)}</p>
                                    <p><strong>Total des avaries:</strong> {stockMovements.reduce((sum, movement) => sum + movement.damageQty, 0)}</p>
                                    <p><strong>Solde actuel:</strong> {stockMovements[stockMovements.length - 1].balance}</p> */}
                                </CardContent>
                            </Card>
                        </div>

                        <Tabs defaultValue="movements">
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="movements">Stock Movements</TabsTrigger>
                                <TabsTrigger value="chart">Chart</TabsTrigger>
                                <TabsTrigger value="analysis">Analysis</TabsTrigger>
                            </TabsList>
                            <TabsContent value="movements">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Stock Movements</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Date</TableHead>
                                                    <TableHead>Initial Stock</TableHead>
                                                    <TableHead>Type</TableHead>
                                                    <TableHead>Entries Qty</TableHead>
                                                    <TableHead>Entries Amount</TableHead>
                                                    <TableHead>Outputs Qty</TableHead>
                                                    <TableHead>Outflows Amount</TableHead>
                                                    <TableHead>Damage Qty</TableHead>
                                                    <TableHead>Damage Amount</TableHead>
                                                    <TableHead>Total Quantity</TableHead>
                                                    <TableHead>Total Amount</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell>Date</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                        <div>
                                            <h1>Filtered Data</h1>
                                            <div>
                                                <label>
                                                    Start Date:
                                                    <input
                                                        type="date"
                                                        value={startDate}
                                                        onChange={(e) => setStartDate(e.target.value)}
                                                    />
                                                </label>
                                                <label>
                                                    End Date:
                                                    <input
                                                        type="date"
                                                        value={endDate}
                                                        onChange={(e) => setEndDate(e.target.value)}
                                                    />
                                                </label>
                                                <button onClick={handleFilter}>Filter</button>
                                            </div>
                                            <ul>
                                                {data.map(item => (
                                                    <li key={item.id}>
                                                        <strong>{item.type === "A" ? "Collection A" : "Collection B"}</strong>
                                                        - {item.name || item.title}
                                                        - Created At: {item.createdAt?.toLocaleString()}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="chart">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Graphique des Mouvements de Stock</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        {/* <ChartContainer
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
                                        </ChartContainer> */}
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
                                            {/* <div>
                                                <h3 className="text-lg font-semibold">Taux de rotation du stock</h3>
                                                <p>Le taux de rotation du stock est de {calculateTurnoverRate(stockMovements)}. Ce chiffre indique combien de fois le stock a été vendu et remplacé sur la période donnée.</p>
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold">Ventes moyennes journalières</h3>
                                                <p>Les ventes moyennes journalières sont de {calculateAverageDailySales(stockMovements)} unités. Cette information peut aider à prévoir les besoins futurs en stock.</p>
                                            </div> */}
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
    )
}

export default StockDetailsModal