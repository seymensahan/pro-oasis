import React, { forwardRef } from 'react';
import Image from 'next/image';
import { format } from 'date-fns';

// Logo placeholder URL
const logoUrl = '/placeholder.svg';

// Types for invoice data
type InvoiceItem = {
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
};

type InvoiceData = {
    invoiceNumber: string;
    date: Date;
    dueDate: Date;
    companyName: string;
    companyAddress: string;
    companyEmail: string;
    companyPhone: string;
    clientName: string;
    clientAddress: string;
    items: InvoiceItem[];
};

// Mock invoice data
const invoiceData: InvoiceData = {
    invoiceNumber: 'INV-2024-001',
    date: new Date(),
    dueDate: new Date(new Date().setDate(new Date().getDate() + 30)),
    companyName: 'Your Company Name',
    companyAddress: '123 Business St, City, Country, ZIP',
    companyEmail: 'contact@yourcompany.com',
    companyPhone: '+1 234 567 890',
    clientName: 'Client Company Ltd.',
    clientAddress: '456 Client Ave, Town, Country, ZIP',
    items: [
        { description: 'Web Development Services', quantity: 1, unitPrice: 5000, total: 5000 },
        { description: 'UI/UX Design', quantity: 1, unitPrice: 2000, total: 2000 },
        { description: 'Content Creation', quantity: 10, unitPrice: 100, total: 1000 },
    ],
};

const TAX_RATE = 0.1; // 10% tax rate

const InvoiceTemplate = forwardRef<HTMLDivElement>((_, ref) => {
    const { items, invoiceNumber, date, dueDate, companyName, companyAddress, companyEmail, companyPhone, clientName, clientAddress } =
        invoiceData;

    const subtotal = items.reduce((acc, item) => acc + item.total, 0);
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax;

    return (
        <div ref={ref} className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                {/* Header */}
                <div className="relative px-8 py-10 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                    <div className="relative flex justify-between items-center">
                        <div>
                            <Image src={logoUrl} alt="Company Logo" width={150} height={50} className="mb-4" />
                            <h1 className="text-4xl font-bold">Invoice</h1>
                        </div>
                        <div className="text-right">
                            <p className="text-xl font-semibold">{invoiceNumber}</p>
                            <p>Date: {format(date, 'dd/MM/yyyy')}</p>
                            <p>Due Date: {format(dueDate, 'dd/MM/yyyy')}</p>
                        </div>
                    </div>
                </div>

                {/* Body */}
                <div className="px-8 py-10">
                    {/* Sender and Recipient */}
                    <div className="flex justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-semibold mb-2">From:</h2>
                            <p className="font-medium">{companyName}</p>
                            <p>{companyAddress}</p>
                            <p>{companyEmail}</p>
                            <p>{companyPhone}</p>
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold mb-2">To:</h2>
                            <p className="font-medium">{clientName}</p>
                            <p>{clientAddress}</p>
                        </div>
                    </div>

                    {/* Invoice Items */}
                    <table className="w-full mb-8">
                        <thead>
                            <tr className="border-b-2 border-gray-300">
                                <th className="text-left py-2">Description</th>
                                <th className="text-right py-2">Quantity</th>
                                <th className="text-right py-2">Unit Price</th>
                                <th className="text-right py-2">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, index) => (
                                <tr key={index} className="border-b border-gray-200">
                                    <td className="py-2">{item.description}</td>
                                    <td className="text-right py-2">{item.quantity}</td>
                                    <td className="text-right py-2">${item.unitPrice.toFixed(2)}</td>
                                    <td className="text-right py-2">${item.total.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Totals */}
                    <div className="flex justify-end">
                        <div className="w-1/2">
                            <div className="flex justify-between mb-2">
                                <span>Subtotal:</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>Tax (10%):</span>
                                <span>${tax.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between font-semibold text-lg">
                                <span>Total:</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-8 py-6 bg-gray-100">
                    <h2 className="text-xl font-semibold mb-2">Payment Details</h2>
                    <p>Please make payment to the following bank account:</p>
                    <p>Bank: Your Bank Name</p>
                    <p>Account Number: XXXX-XXXX-XXXX-XXXX</p>
                    <p>SWIFT/BIC: ABCDEFGH</p>
                </div>
                <div className="px-8 py-4 bg-gray-200 text-center text-sm text-gray-600">
                    Thank you for your business!
                </div>
            </div>
        </div>
    );
});

InvoiceTemplate.displayName = 'InvoiceTemplate';

export default InvoiceTemplate;
