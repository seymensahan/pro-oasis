import { Trash2, MoreVertical, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";
import useCustomer from "../../sales/hooks/useCustomer";

interface OrderHeaderProps {
    customer: string | null;
    onClosing: () => void;
    onCustomerSelect: (customer: string) => void;  // New prop for customer selection callback
}

export default function OrderListHeader({ customer, onClosing, onCustomerSelect }: OrderHeaderProps) {
    const [selectedCustomer, setSelectedCustomer] = useState<string>('');
    const { customers } = useCustomer();

    const openModal = () => onClosing();

    const handleCustomerChange = (value: string) => {
        setSelectedCustomer(value);
    };

    // Notify parent component of selected customer change
    useEffect(() => {
        onCustomerSelect(selectedCustomer);
    }, [selectedCustomer, onCustomerSelect]);

    return (
        <div className="p-4 bg-white">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-medium">Order List</h2>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
                        <Trash2 className="h-5 w-5" />
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
                                <MoreVertical className="h-5 w-5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>Clear Order</DropdownMenuItem>
                            <DropdownMenuItem>Cancel Order</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <div className="text-sm text-gray-600 mb-4">
                Transaction ID : #65565
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Customer Information</label>
                    <div className="flex gap-2">
                        <Select
                            name="category"
                            required
                            value={selectedCustomer ?? undefined}
                            onValueChange={handleCustomerChange}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Choose" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Pass-by customer">Pass-by Customer</SelectItem>
                                {customers?.map((customer) => (
                                    <SelectItem key={customer.id} value={customer.name}>
                                        {customer.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Button size="icon" onClick={openModal} className="bg-blue-500 hover:bg-blue-600">
                            <UserPlus className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
