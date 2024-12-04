import React from 'react';

interface InvoiceItem {
    description: string;
    quantity: number;
    price: number;
    total: number;
}

interface InvoiceTemplateProps {
    companyName: string;
    logo: string;
    date: string;
    invoiceNumber: string;
    billTo: string[];
    items: InvoiceItem[];
    subtotal: number;
    tax: number;
    total: number;
    notes: string[];
}

const InvoiceTemplate = ({ companyName, logo, date, invoiceNumber, billTo, items, subtotal, tax, total, notes } : InvoiceTemplateProps) => {
    return (
        <div className="bg-white rounded-lg shadow-lg px-8 py-10 max-w-xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                    <img className="h-8 w-8 mr-2" src="/ProOasis-logo.webp" alt="Logo" />
                    <div className="text-gray-700 font-semibold text-lg">{companyName}</div>
                </div>
                <div className="text-gray-700">
                    <div className="font-bold text-xl mb-2">INVOICE</div>
                    <div className="text-sm">Date: {date}</div>
                    <div className="text-sm">Invoice #: {invoiceNumber}</div>
                </div>
            </div>
            <div className="border-b-2 border-gray-300 pb-8 mb-8">
                <h2 className="text-2xl font-bold mb-4">Bill To:</h2>
                {billTo.map((line, idx) => (
                    <div key={idx} className="text-gray-700 mb-2">{line}</div>
                ))}
            </div>
            <table className="w-full text-left mb-8">
                <thead>
                    <tr>
                        <th className="text-gray-700 font-bold uppercase py-2">Description</th>
                        <th className="text-gray-700 font-bold uppercase py-2">Quantity</th>
                        <th className="text-gray-700 font-bold uppercase py-2">Price</th>
                        <th className="text-gray-700 font-bold uppercase py-2">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, idx) => (
                        <tr key={idx}>
                            <td className="py-4 text-gray-700">{item.description}</td>
                            <td className="py-4 text-gray-700">{item.quantity}</td>
                            <td className="py-4 text-gray-700">${item.price.toFixed(2)}</td>
                            <td className="py-4 text-gray-700">${item.total.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-end mb-8">
                <div className="text-gray-700 mr-2">Subtotal:</div>
                <div className="text-gray-700">${subtotal.toFixed(2)}</div>
            </div>
            <div className="text-right mb-8">
                <div className="text-gray-700 mr-2">Tax:</div>
                <div className="text-gray-700">${tax.toFixed(2)}</div>
            </div>
            <div className="flex justify-end mb-8">
                <div className="text-gray-700 mr-2">Total:</div>
                <div className="text-gray-700 font-bold text-xl">${total.toFixed(2)}</div>
            </div>
            <div className="border-t-2 border-gray-300 pt-8 mb-8">
                {notes.map((note, idx) => (
                    <div key={idx} className="text-gray-700 mb-2">{note}</div>
                ))}
            </div>
        </div>
    );
};

export default InvoiceTemplate;
