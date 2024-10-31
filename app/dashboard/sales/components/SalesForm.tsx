import React, { FormEvent, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, PlusCircle } from "lucide-react";
import { format } from "date-fns";
import useProducts from '../hooks/useProducts';
import useCustomer from '../hooks/useCustomer';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';

const SalesForm = ({ onProductAdd, onClosing }: any) => {
    const { getProductByName, selectedProductData, products } = useProducts();
    const { customers } = useCustomer();
    const [date, setDate] = useState<Date | null>(null);
    const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
    const [quantity, setQuantity] = useState<number | undefined>(undefined);

    const openModal = () => onClosing();

    const handleCustomerChange = (value: string) => setSelectedCustomer(value);

    const handleProductChange = (value: string) => {
        setSelectedProduct(value);
        getProductByName(value); // Fetch product details
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!selectedProductData) return;

        // Check for stock sufficiency
        if (quantity && selectedProductData.quantity && quantity > selectedProductData.quantity) {
            toast.error(`Insufficient stock! Only ${selectedProductData.quantity} available.`);
            return; // Stop form submission
        }

        const productEntry = {
            customer: selectedCustomer,
            product: selectedProduct,
            price: selectedProductData.price, 
            quantity,
            date,
        };

        onProductAdd(productEntry);

        // Reset form fields
        setSelectedProduct(null);
        setSelectedCustomer(null);
        setQuantity(undefined);
        setDate(null);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <Label htmlFor="category">Customer Name *</Label>
                    <Button onClick={openModal} variant="ghost" size="sm">
                        <PlusCircle className="mr-1 h-3 w-3" /> Add New
                    </Button>
                    <Select name="category" required value={selectedCustomer ?? undefined} onValueChange={handleCustomerChange}>
                        <SelectTrigger>
                            <SelectValue placeholder="Choose" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value='Pass-by customer'>Pass-by Customer</SelectItem>
                            {customers?.map((customer) => (
                                <SelectItem key={customer.id} value={customer.name}>
                                    {customer.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {selectedCustomer && selectedCustomer !== 'Pass-by customer' && (
                    <div>
                        <Label htmlFor="date">Due Date</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className={`w-full ${!date && "text-muted-foreground"}`}>
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? format(date, "PPP") : <span>Choose date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent>
                                <Calendar
                                    mode="single"
                                    selected={date || undefined}
                                    onSelect={setDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                )}

                <div>
                    <Label htmlFor="quantity">Quantity *</Label>
                    <Input id="quantity" type="number" placeholder="Enter quantity" value={quantity ?? ''} onChange={(e) => setQuantity(Number(e.target.value))} required />
                </div>
            </div>

            <Label htmlFor="productName">Product Name</Label>
            <Select name="product" required value={selectedProduct ?? undefined} onValueChange={handleProductChange}>
                <SelectTrigger>
                    <SelectValue placeholder="Choose" />
                </SelectTrigger>
                <SelectContent>
                    {products?.map((product) => (
                        <SelectItem key={product.id} value={product.productName}>
                            {product.productName}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <div className="flex w-full justify-end mt-5">
                <Button size="sm" className='bg-blue-500 hover:bg-blue-400' type="submit">
                    <PlusCircle /> Add product
                </Button>
            </div>
        </form>
    );
};

export default SalesForm;
