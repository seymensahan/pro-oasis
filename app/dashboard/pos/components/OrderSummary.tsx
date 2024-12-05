import useAuth from '@/app/(auth)/Hooks/useAuth';
import { fetchUserData } from '@/lib/fetchUserData';
import { CartItem } from '@/lib/Types';
import React, { useEffect, useState } from 'react';

interface OrderSummaryProps {
    cart: CartItem[];
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ cart }) => {
    const { user } = useAuth();
    const [taxRate, setTaxRate] = useState<number>(0); // Default to 0%

    useEffect(() => {
        async function getUserInfo(userId: string | undefined) {
            if (!userId) return;

            try {
                const userData = await fetchUserData(userId);
                if (userData) {
                    const parsedTaxRate = parseFloat(userData.taxRate);
                    setTaxRate(isNaN(parsedTaxRate) ? 0 : parsedTaxRate); // Fallback to 0% if taxRate is invalid
                    console.log('User Data:', userData);
                } else {
                    console.log('User not found.');
                }
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        }

        getUserInfo(user?.uid);
    }, [user]);

    const calculateTotals = () => {
        const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const tax = subtotal * (taxRate / 100); 
        const discount = 0;
        const total = subtotal + tax - discount;

        return { subtotal, tax, discount, total };
    };

    const totals = calculateTotals();

    return (
        <div className="border-t p-4">
            <div className="space-y-2 mb-4 text-sm">
                <div className="flex justify-between">
                    <span>Sub Total</span>
                    <span>{totals.subtotal.toFixed(2)} FCFA</span>
                </div>
                <div className="flex justify-between">
                    <span>Tax (TVA {taxRate}%)</span>
                    <span>{totals.tax.toFixed(2)} FCFA</span>
                </div>
                <div className="flex justify-between text-red-500">
                    <span>Discount (0%)</span>
                    <span>-{totals.discount.toFixed(2)} FCFA</span>
                </div>
                <div className="flex justify-between font-bold text-md pt-2">
                    <span>Total</span>
                    <span>{totals.total.toFixed(2)} FCFA</span>
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;
