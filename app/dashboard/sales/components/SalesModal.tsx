// SalesModal.tsx
import React, { useState, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import SalesForm from './SalesForm'
import { X } from 'lucide-react'
import NewCustomerModal from './NewCustomerModal'
import { format } from 'date-fns'
import { useSaveSale } from '../hooks/useSaveSale'
import { auth } from '@/firebase/config'
import { useAuthState } from 'react-firebase-hooks/auth'
import { toast } from 'react-toastify'
import SalesConfirmationModal from './SalesConfirmation'

interface SalesModalProps {
    isOpen: boolean
    onClose: () => void
}

export default function SalesModal({ isOpen, onClose }: SalesModalProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)
    const [productList, setProductList] = useState<any[]>([])
    const { saveSale, loading } = useSaveSale()
    const [user] = useAuthState(auth)

    const handleMessage = () => {
        setIsModalOpen(true)
    }

    const handleProductAdd = (product: any) => {
        setProductList(prevList => [...prevList, product])
    }

    const handleSaveSale = useCallback(async () => {
        const grandTotal = productList.reduce((sum, product) => sum + (Number(product.price) * product.quantity), 0)

        const saleData = {
            customerName: productList[0]?.customer || 'Unknown Customer',
            products: productList.map(product => ({
                ...product,
                price: Number(product.price),
                quantityOrdered: product.quantity,
                subtotal: Number(product.price) * product.quantity,
                date: product.date ? format(product.date, "yyyy-MM-dd") : '',
            })),
            grandTotal,
            status: 'Pending' as const,
            paid: 0,
            due: grandTotal,
            paymentStatus: 'Due' as const,
            biller: user?.uid || 'unknown',
        }

        console.log("Prepared saleData:", saleData)

        try {
            const success = await saveSale(saleData)
            if (success) {
                toast.success('Sale saved successfully')
                setProductList([]) // Reset product list

                // First, close the main sales modal
                onClose()

                
            }
        } catch (error: any) {
            toast.error(`Failed to save sale: ${error.message || 'An error occurred'}`)
        }
    }, [productList, saveSale, user, onClose])

    const handleCloseConfirmation = () => {
        setIsConfirmationOpen(false)
        console.log("Closing Sales Confirmation Modal")
    }

    const handleEmailInvoice = () => {
        toast.info("Invoice will be emailed!")
    }

    const handlePrintInvoice = () => {
        toast.info("Invoice will be printed!")
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-[800px] max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-semibold">Add Sales</h2>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>
                <div className="p-4 space-y-4">
                    <SalesForm onClosing={handleMessage} onProductAdd={handleProductAdd} />
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Customer</TableHead>
                                <TableHead>Product</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Due Date</TableHead>
                                <TableHead>Total Price</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {productList.map((product, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{product.customer}</TableCell>
                                    <TableCell className="font-medium">{product.product}</TableCell>
                                    <TableCell>{product.quantity}</TableCell>
                                    <TableCell>{product.price}</TableCell>
                                    <TableCell>{product.date ? format(product.date, "PPP") : '-'}</TableCell>
                                    <TableCell>{product.price * product.quantity}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <div className="flex justify-end space-x-4">
                        <div className="text-right">
                            <p className="font-bold">Grand Total</p>
                        </div>
                        <div className="text-right">
                            {productList.map((product, index) => (
                                <p className="font-bold">{product.price * product.quantity} FCFA</p>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex justify-end space-x-2 p-4 border-t">
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button
                        className="bg-blue-500 hover:bg-blue-400"
                        onClick={handleSaveSale}
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : 'Submit'}
                    </Button>
                </div>
            </div>

            <NewCustomerModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            {/* Sales Confirmation Modal */}
            <SalesConfirmationModal
                isOpen={isConfirmationOpen}
                onClose={handleCloseConfirmation}
                onEmailInvoice={handleEmailInvoice}
                onPrintInvoice={handlePrintInvoice}
            />
        </div>
    )
}
