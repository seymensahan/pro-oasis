import React from 'react'
import { Button } from "@/components/ui/button"
import { CreditCard, QrCode } from 'lucide-react'

const PaymentActions: React.FC = () => (
    <div className="p-4">
        <div className="grid grid-cols-3 gap-4 mb-4">
            <Button variant="outline" className="w-full">
                Cash
            </Button>
            <Button variant="outline" className="w-full">
                <CreditCard className="mr-2 h-4 w-4" />
                Card
            </Button>
            <Button variant="outline" className="w-full">
                <QrCode className="mr-2 h-4 w-4" />
                Scan
            </Button>
        </div>

        <div className="grid grid-cols-3 gap-4">
            <Button variant="default" className="w-full bg-[#0ea5e9]">
                Hold
            </Button>
            <Button variant="destructive" className="w-full">
                Void
            </Button>
            <Button variant="default" className="w-full bg-[#22c55e]">
                Payment
            </Button>
        </div>
    </div>
)

export default PaymentActions
