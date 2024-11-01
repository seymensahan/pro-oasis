'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
    Plus,
    Minus,
    FileText,
    Download,
    Printer,
    RotateCcw,
    PenSquare,
    X,
} from "lucide-react";
import { useState, useMemo } from "react";
import { SaleData } from "../types";

interface OrderItem {
    id: string;
    name: string;
    image: string;
    quantity: number;
    purchasePrice: number;
    discount: number;
    tax: number; // Tax in percentage
    taxAmount: number;
    unitCost: number;
    totalCost: number;
}

interface SalesModalProps {
    isOpen: boolean;
    onClose: () => void;
    salesData: SaleData;
}

export default function SalesDetail({ isOpen, onClose, salesData }: SalesModalProps) {
    const [orderItems, setOrderItems] = useState<OrderItem[]>([
        {
            id: '1',
            name: 'Nike Jordan',
            image: '/placeholder.svg?height=50&width=50',
            quantity: 2,
            purchasePrice: 2000,
            discount: 500,
            tax: 5,
            taxAmount: 0,
            unitCost: 0,
            totalCost: 0,
        },
        {
            id: '2',
            name: 'Apple Series 5 Watch',
            image: '/placeholder.svg?height=50&width=50',
            quantity: 2,
            purchasePrice: 3000,
            discount: 400,
            tax: 5,
            taxAmount: 0,
            unitCost: 0,
            totalCost: 0,
        },
        {
            id: '3',
            name: 'Lobar Handy',
            image: '/placeholder.svg?height=50&width=50',
            quantity: 2,
            purchasePrice: 2500,
            discount: 500,
            tax: 5,
            taxAmount: 0,
            unitCost: 0,
            totalCost: 0,
        },
    ]);

    // Recalculate totals and item costs on quantity update
    const calculateItemCosts = (item: OrderItem) => {
        const taxAmount = (item.purchasePrice * item.tax) / 100;
        const unitCost = item.purchasePrice + taxAmount - item.discount;
        const totalCost = unitCost * item.quantity;
        return { ...item, taxAmount, unitCost, totalCost };
    };

    // Update quantity and recalculate costs
    const updateQuantity = (id: string, increment: boolean) => {
        setOrderItems(items =>
            items.map(item =>
                item.id === id
                    ? calculateItemCosts({
                        ...item,
                        quantity: increment ? item.quantity + 1 : Math.max(1, item.quantity - 1),
                    })
                    : item
            )
        );
    };

    // Use useMemo to calculate total values
    const totals = useMemo(() => {
        return orderItems.reduce(
            (acc, item) => {
                acc.subtotal += item.purchasePrice * item.quantity;
                acc.totalDiscount += item.discount * item.quantity;
                acc.totalTax += item.taxAmount * item.quantity;
                acc.grandTotal += item.totalCost;
                return acc;
            },
            { subtotal: 0, totalDiscount: 0, totalTax: 0, grandTotal: 0 }
        );
    }, [orderItems]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-50 bg-opacity-50 w-full h-full flex items-center justify-center z-50 m-10">
            <div className="bg-white rounded-lg w-[1100px] p-5 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center p-4 border-b">
                        <h1 className="text-2xl font-bold">Sales Detail: {salesData.reference}</h1>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                <div className="flex justify-between items-center mt-2">
                    <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">
                            View and manage sale details
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="icon">
                            <PenSquare className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                            <Printer className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                            <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                            <RotateCcw className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold">Customer Info</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div>
                                <span className="text-sm font-medium">Name:</span>
                                <span className="text-sm ml-2">{salesData.customerName}</span>
                            </div>
                            <div>
                                <span className="text-sm font-medium">Email:</span>
                                <span className="text-sm ml-2">-</span>
                            </div>
                            <div>
                                <span className="text-sm font-medium">Phone:</span>
                                <span className="text-sm ml-2">-</span>
                            </div>
                            <div>
                                <span className="text-sm font-medium">Address:</span>
                                <span className="text-sm ml-2">-</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold">Company Info</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div>
                                <span className="text-sm font-medium">Name:</span>
                                <span className="text-sm ml-2">-</span>
                            </div>
                            <div>
                                <span className="text-sm font-medium">Email:</span>
                                <span className="text-sm ml-2">-</span>
                            </div>
                            <div>
                                <span className="text-sm font-medium">Phone:</span>
                                <span className="text-sm ml-2">-</span>
                            </div>
                            <div>
                                <span className="text-sm font-medium">Address:</span>
                                <span className="text-sm ml-2">-</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold">Invoice Info</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div>
                                <span className="text-sm font-medium">Reference:</span>
                                <span className="text-sm ml-2">{salesData.reference}</span>
                            </div>
                            <div>
                                <span className="text-sm font-medium">Payment Status:</span>
                                <Badge variant="success" className="ml-2">{salesData.status}</Badge>
                            </div>
                            <div>
                                <span className="text-sm font-medium">Status:</span>
                                <Badge variant="success" className="ml-2">{salesData.paid}</Badge>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold">Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Product</TableHead>
                                    <TableHead>Qty</TableHead>
                                    <TableHead>Purchase Price(FCFA)</TableHead>
                                    <TableHead>Discount(FCFA)</TableHead>
                                    <TableHead>Tax(%)</TableHead>
                                    <TableHead>Tax Amount(FCFA)</TableHead>
                                    <TableHead>Unit Cost(FCFA)</TableHead>
                                    <TableHead>Total Cost(FCFA)</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {orderItems.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>
                                            <div className="flex items-center space-x-3">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="h-10 w-10 rounded-md"
                                                />
                                                <span className="font-medium">{item.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center space-x-2">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-8 w-8"
                                                    onClick={() => updateQuantity(item.id, false)}
                                                >
                                                    <Minus className="h-4 w-4" />
                                                </Button>
                                                <span className="w-8 text-center">{item.quantity}</span>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-8 w-8"
                                                    onClick={() => updateQuantity(item.id, true)}
                                                >
                                                    <Plus className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                        <TableCell>{item.purchasePrice}</TableCell>
                                        <TableCell>{item.discount}</TableCell>
                                        <TableCell>{item.tax}</TableCell>
                                        <TableCell>{item.taxAmount}</TableCell>
                                        <TableCell>{item.unitCost}</TableCell>
                                        <TableCell className="font-medium">{item.totalCost}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        <div className="mt-6 flex justify-end">
                            <div className="w-72 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Subtotal:</span>
                                    <span className="font-medium">5,200 FCFA</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Total Discount:</span>
                                    <span className="font-medium text-red-600">-1,400.00 FCFA</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Order Tax:</span>
                                    <span className="font-medium">0.00 FCFA</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between text-base font-medium">
                                    <span>Total:</span>
                                    <span>3,800.00 FCFA</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end space-x-2 p-4 border-t">
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button
                        className="bg-blue-500 hover:bg-blue-400"
                    >
                        Submit
                    </Button>
                </div>
            </div>

        </div>
    );
}
