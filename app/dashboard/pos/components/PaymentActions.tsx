import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { CreditCard, Loader2, QrCode } from 'lucide-react'
import { CartItem } from '@/lib/Types'
import { useSaveSale } from '../../sales/hooks/useSaveSale'
import { SaleData } from '../../sales/types'
import { serverTimestamp, Timestamp } from 'firebase/firestore'
import { toast } from 'react-toastify'
import SalesConfirmationModal from '../../sales/components/SalesConfirmation'
import useAuth from '@/app/(auth)/Hooks/useAuth'
import { fetchUserData } from '@/lib/fetchUserData'

interface PaymentProps {
    cart: CartItem[];
    customer: string;
    onSaleComplete: () => void; // New prop
}

const PaymentActions = ({ cart, customer, onSaleComplete }: PaymentProps) => {
    const { saveSale, loading } = useSaveSale();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user } = useAuth();
    const [taxRate, setTaxRate] = useState<number>(0);

    useEffect(() => {
        async function getUserInfo(userId: string | undefined) {
            if (!userId) return;

            try {
                const userData = await fetchUserData(userId);
                if (userData) {
                    const parsedTaxRate = parseFloat(userData.taxRate);
                    setTaxRate(isNaN(parsedTaxRate) ? 0 : parsedTaxRate); // Fallback to 0% if taxRate is invalid
                }
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        }

        getUserInfo(user?.uid);
    }, [user]);

    const saleData: SaleData = {
        customerName: customer,
        products: cart.map((item) => ({
            id: item.id,
            name: item.name,
            productName: item.id,
            customerName: customer,
            quantityOrdered: item.quantity,
            subtotal: item.price * item.quantity,
            date: item.expirationDate
                ? Timestamp.fromDate(new Date(item.expirationDate))
                : null,
            price: item.price,
            biller: user?.uid,
        })),
        grandTotal:
            cart.reduce((total, item) => total + item.price * item.quantity, 0) +
            cart.reduce((total, item) => total + item.price * item.quantity, 0) * (taxRate / 100),
        status: 'Completed',
        date: Timestamp.fromDate(new Date()),
        paid: cart.reduce((total, item) => total + item.price * item.quantity, 0),
        due: 0,
        taxRate: taxRate,
        taxAmount: cart.reduce((total, item) => total + item.price * item.quantity, 0) * (taxRate / 100),
        paymentStatus: 'Paid',
        biller: user?.uid,
    };

    const handleSale = async () => {
        const success = await saveSale(saleData);
        if (success) {
            setIsModalOpen(true);
            console.log('Sale saved successfully!');
            onSaleComplete(); // Reset cart
        } else {
            console.error('Failed to save sale');
        }
    };

    return (
        <div className="p-4">
            <div className="flex">
                <Button
                    variant="default"
                    onClick={handleSale}
                    disabled={loading}
                    className="w-full bg-blue-500 hover:bg-blue-400"
                >
                    {loading ? <><Loader2 className='animate-spin' /> Processing...</> : 'Confirm Payment'}
                </Button>
            </div>
            <SalesConfirmationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

export default PaymentActions;