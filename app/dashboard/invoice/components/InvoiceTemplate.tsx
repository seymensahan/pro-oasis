import React, { forwardRef } from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import { SaleData } from '../../sales/types';
import formatDate from '@/lib/FormatDate';
import { TEXT_ALIGN } from 'html2canvas/dist/types/css/property-descriptors/text-align';



const TAX_RATE = 0.1; // 10% tax rate

interface invoiceType extends SaleData {
    companyName?: string | null
    companyEmail?: string | null
    companyPhone?: string | null
    companyAddress?: string | null
    logo?: string | null
    tax?: number
    customerEmail?: string
    customerTel?: string
}


const InvoiceTemplate = ({ companyName, companyEmail, companyPhone, companyAddress, logo, date, reference, customerName, customerEmail, customerTel,  products, tax, grandTotal }: invoiceType) => {
    // const logoUrl = '/placeholder.svg';
    const subtotal = products?.reduce(
        (sum, item) => sum + item.price * item.quantityOrdered,
        0
    ) ?? 0;
    // const tax = subtotal * 0.03; // Assuming 3% tax
    const total = subtotal;


    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                {/* Header */}
                <div className="relative px-8 py-10 bg-gradient-to-br from-blue-400 to-blue-500 text-white">
                    <div className="relative flex justify-between items-center">
                        <div>
                            <Image src={logo || '/ProOasis.webp'} alt="Company Logo" width={150} height={50} className="mb-4" />
                            <h1 className="text-4xl font-bold">Invoice {reference}</h1>
                        </div>
                        <div className="text-right">
                            <p className="text-xl font-semibold"></p>
                            <p>Date: {formatDate(date)}</p>
                            {/* <p>Due Date: {format(date, 'dd/MM/yyyy')}</p> */}
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
                            <p className="font-medium">{customerName}</p>
                            <p className="font-medium">{customerEmail}</p>
                            <p className="font-medium">{customerTel}</p>
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
                            {products.map((item, index) => (
                                <tr key={index} className="border-b border-gray-200">
                                    <td className="py-2">{item.name}</td>
                                    <td className="text-right py-2">{item.quantityOrdered}</td>
                                    <td className="text-right py-2">{item.price}FCFA</td>
                                    <td className="text-right py-2">
                                        {(item.price * item.quantityOrdered)}FCFA
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Totals */}
                    <div className="flex justify-end">
                        <div className="w-1/2">
                            <div className="flex justify-between mb-2">
                                <span>Subtotal:</span>
                                <span>{subtotal.toFixed(2)}FCFA</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>Tax ({tax}%):</span>
                                {/* <span>{tax.toFixed(2)}FCFA</span> */}
                            </div>
                            <div className="flex justify-between font-semibold text-lg">
                                <span>Total:</span>
                                <span>{total.toFixed(2)}FCFA</span>
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
}



export default InvoiceTemplate;