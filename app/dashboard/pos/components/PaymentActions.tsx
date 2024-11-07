import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { CreditCard, QrCode } from 'lucide-react'
import { CartItem } from '@/lib/Types'
import { useSaveSale } from '../../sales/hooks/useSaveSale'
import { SaleData } from '../../sales/types'
import { serverTimestamp, Timestamp } from 'firebase/firestore'
import { useAuth } from '@/context/AuthContext'
import { toast } from 'react-toastify'
import SalesConfirmationModal from '../../sales/components/SalesConfirmation'

interface PaymentProps {
    cart: CartItem[]
    customer: string
}

const PaymentActions = ({ cart, customer }: PaymentProps) => {
    const { saveSale, loading } = useSaveSale()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { user } = useAuth()

    const saleData: SaleData = {
        customerName: customer,  // Replace with actual customer name
        products: cart.map((item) => ({
            id: item.id,
            name: item.name,
            productName: item.id,
            customerName: customer,  // Replace with actual customer
            quantityOrdered: item.quantity, // Quantity ordered in this sale
            subtotal: item.price * item.quantity, // Calculate subtotal
            date: item.expirationDate ? Timestamp.fromDate(new Date(item.expirationDate)) : null, // Corrected date handling
            price: item.price,
            biller: user?.uid,
        })),
        grandTotal: cart.reduce((total, item) => total + item.price * item.quantity, 0), // Calculate grand total
        status: 'Pending',
        date: Timestamp.fromDate(new Date()),
        paid: 0,
        due: cart.reduce((total, item) => total + item.price * item.quantity, 0), // Due is initially the grand total
        paymentStatus: 'Due',
        biller: user?.uid,
    };


    const handleSale = async () => {
        const success = await saveSale(saleData);
        if (success) {
            setIsModalOpen(true)
            console.log("Sale saved successfully!");
        } else {
            console.error("Failed to save sale");
        }
    }


    return (
        < div className="p-4" >
            <div className="grid grid-cols-3 gap-4 mb-4">
                <Button variant="outline" className="w-full text-sm" >
                    Cash
                </Button>
                <Button variant="outline" className="w-full text-xs">
                    <CreditCard className="mr-1 h-4 w-2" />
                    MOMO
                </Button>
                <Button variant="outline" className="w-full text-xs">
                    <QrCode className="mr-1 h-4 w-2" />
                    OM
                </Button>
            </div>

            <div className="flex">
                <Button variant="default"
                    onClick={handleSale}
                    disabled={loading}
                    className="w-full bg-blue-400">
                    Confirm Payment
                </Button>
            </div>
            <SalesConfirmationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div >
    )
}

export default PaymentActions
