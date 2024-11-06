import React from 'react'
import { Button } from "@/components/ui/button"
import { ListOrdered, RefreshCcw, ShoppingCart } from 'lucide-react'

const TopNavigation = () => (
    <div className="p-2">
        <div className="flex space-x-4">
            {/* <Button variant="default" className="bg-[#0f172a]">
                <ListOrdered className="mr-2 h-4 w-4" /> View Orders
            </Button> */}
            <Button variant="default" className="bg-[#0ea5e9]">
                <RefreshCcw className="mr-2 h-4 w-4" /> Reset
            </Button>
            {/* <Button variant="default" className="bg-[#f97316]">
                <ShoppingCart className="mr-2 h-4 w-4" /> Transaction
            </Button> */}
        </div>
    </div>
)

export default TopNavigation
