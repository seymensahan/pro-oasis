import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2 } from 'lucide-react'
import { CartItem } from '@/app/types'

interface OrderListProps {
    cart: CartItem[]
    updateQuantity: (productId: string, newQuantity: number) => void
    removeFromCart: (productId: string) => void
    transactionId: string
}

const OrderList: React.FC<OrderListProps> = ({ cart, updateQuantity, removeFromCart, transactionId }) => (
    <div className=" bg-white border-l">
        <div className="p-4 border-b">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Order List</h2>
                <span className="text-sm text-gray-500">Transaction ID: #{transactionId}</span>
            </div>
        </div>

        <div className="p-4">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Item</TableHead>
                        <TableHead>Qty</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {cart.map(item => (
                        <TableRow key={item.id}>
                            <TableCell>{item.productName}</TableCell>
                            <TableCell>
                                <Input
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                                    className="w-16"
                                />
                            </TableCell>
                            <TableCell>{(item.price * item.quantity).toFixed(2)} FCFA</TableCell>
                            <TableCell>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeFromCart(item.id)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    </div>
)

export default OrderList
