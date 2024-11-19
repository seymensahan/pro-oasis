import { CartItem } from '@/lib/Types'
import React from 'react'

interface OrderSummaryProps {
    cart: CartItem[]
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ cart }) => {
    const calculateTotals = () => {
        const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
        const tax = subtotal * 0.09// 0% GST
        // const shipping = 40.21
        const discount = subtotal * 0
        const total = subtotal + tax  - discount
        return { subtotal, tax, discount, total }
    }

    const totals = calculateTotals()

    return (
        <div className="border-t p-4">
            <div className="space-y-2 mb-4 text-sm">
                <div className="flex justify-between">
                    <span>Sub Total</span>
                    <span>{totals.subtotal} FCFA</span>
                </div>
                <div className="flex justify-between">
                    <span>Tax (TVA 3%)</span>
                    <span>{totals.tax} FCFA</span>
                </div>
                <div className="flex justify-between text-red-500">
                    <span>Discount (0%)</span>
                    <span>-{totals.discount} FCFA</span>
                </div>
                <div className="flex justify-between font-bold text-md pt-2 ">
                    <span>Total</span>
                    <span>{totals.total} FCFA</span>
                </div>
            </div>
        </div>
    )
}

export default OrderSummary
