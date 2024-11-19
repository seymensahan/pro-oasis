'use client';

import { useState } from 'react';
import { ArrowLeft, Calendar } from 'lucide-react';
import { format } from 'date-fns';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useRouter } from 'next/navigation';

// Types
interface Customer {
    firstName: string;
    lastName: string;
    location: string;
    phone: string;
    address: string;
    dateOfBirth: Date | null;
}

interface Order {
    id: string;
    date: string;
    status: 'pending' | 'completed' | 'processing' | 'cancelled';
    price: string;
}

// Mock customer data
const initialCustomer: Customer = {
    firstName: "William",
    lastName: "Johnson",
    location: "Douala",
    phone: "237674537760",
    address: "Country, Region, City",
    dateOfBirth: new Date("1990-01-01"),
};

// Mock orders data
const orders: Order[] = [
    { id: "#23534D", date: "May 25, 3:12 PM", status: "pending", price: "1,342 XAF" },
    { id: "#12512B", date: "May 10, 2:03 PM", status: "completed", price: "1,342 XAF" },
    { id: "#23534D", date: "April 18, 8:00 AM", status: "completed", price: "1,342 XAF" },
    { id: "#76543E", date: "April 12, 8:00 AM", status: "processing", price: "1,342 XAF" },
    { id: "#51323C", date: "April 10, 4:12 PM", status: "cancelled", price: "1,342 XAF" },
];

interface ParamsProps {
    params: {
        name: string;
    };
}

export default function CustomerInformation({ params }: ParamsProps) {
    const router = useRouter()

    const customerName = decodeURIComponent(params.name);

    const [customer, setCustomer] = useState<Customer>(initialCustomer);
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCustomer((prev) => ({ ...prev, [name]: value }));
    };

    const handleDateSelect = (date: Date | undefined) => {
        setCustomer((prev) => ({ ...prev, dateOfBirth: date || null }));
    };

    const handleSave = () => {
        // Here you would typically save the customer data to your backend
        console.log('Saving customer data:', customer);
        setIsEditing(false);
    };

    const getStatusColor = (status: Order['status']) => {
        switch (status) {
            case 'completed':
                return 'bg-green-100 text-green-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'processing':
                return 'bg-blue-100 text-blue-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="container mx-auto p-6 max-w-6xl">
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-4">
                    <Button variant="outline" onClick={() => router.back()} className="gap-2 ">
                        <ArrowLeft className="h-4 w-4" /> Back
                    </Button>
                    <h1 className="text-lg font-bold">Customer Information</h1>
                </div>
                <div className="flex gap-2 ">
                    <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                    <Button className='bg-blue-400 hover:bg-blue-500' onClick={handleSave}>Save</Button>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="flex items-center gap-4 text-sm">
                        <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-sm font-semibold">
                            {customer.firstName?.[0]}{customer.lastName?.[0]}
                        </div>
                        <div>
                            <h2 className="text-md font-semibold">{customer.firstName} {customer.lastName}</h2>
                            <p className="text-gray-500">{customer.location}</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="grid gap-2">
                            <Label className='text-sm' htmlFor="firstName">First Name</Label>
                            <Input
                                id="firstName"
                                name="firstName"
                                className='text-sm'
                                value={customer.firstName}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input
                                id="lastName"
                                name="lastName"
                                value={customer.lastName}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                                id="phone"
                                name="phone"
                                value={customer.phone}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="address">Address</Label>
                            <Input
                                id="address"
                                name="address"
                                value={customer.address}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="dateOfBirth">Date of Birth</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start text-left font-normal"
                                    >
                                        <Calendar className="mr-2 h-4 w-4" />
                                        {customer.dateOfBirth ? format(customer.dateOfBirth, 'PPP') : 'Pick a date'}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <CalendarComponent
                                        mode="single"
                                        // selected={customer.dateOfBirth}
                                        onSelect={handleDateSelect}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-4">Customer Orders</h2>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>OrderID</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Order Status</TableHead>
                                <TableHead className="text-right">Price</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell className="font-medium">{order.id}</TableCell>
                                    <TableCell>{order.date}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant="secondary"
                                            className={getStatusColor(order.status)}
                                        >
                                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">{order.price}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}
