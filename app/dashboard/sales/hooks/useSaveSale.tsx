import { firestore } from '@/firebase/config';
import {
    collection,
    doc,
    setDoc,
    updateDoc,
    serverTimestamp,
    query,
    where,
    getDocs,
    Timestamp,
} from 'firebase/firestore';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { SaleData } from '../types';


export const useSaveSale = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const saveSale = async (saleData: SaleData) => {
        setLoading(true);
        setError(null);

        console.log("Attempting to save sale with data:", saleData);

        if (!saleData.customerName || !saleData.products || saleData.products.length === 0) {
            const errorMsg = 'Sale data is missing required fields (customer name or products list)';
            setError(errorMsg);
            toast.error(errorMsg);
            setLoading(false);
            return false;
        }

        try {
            // Step 1: Save the main invoice document
            const invoiceRef = collection(firestore, 'invoices');
            const newInvoiceRef = doc(invoiceRef);
            const invoiceReference = `INV${Date.now().toString().slice(-4)}`; // Unique invoice reference
            const invoiceDoc = {
                ...saleData,
                reference: invoiceReference,
                date: serverTimestamp(),
                createdAt: serverTimestamp(),
            };

            await setDoc(newInvoiceRef, invoiceDoc);
            console.log("Invoice document created successfully:", invoiceDoc);

            // Step 2: Save each product as a separate sale document in the `sales` collection
            for (const product of saleData.products) {
                const salesRef = collection(firestore, 'sales');
                const newSaleRef = doc(salesRef);
                const saleReference = `SL${Date.now().toString().slice(-4)}`; // Unique sale reference for each product
                const saleItemDoc = {
                    saleReference,
                    customerName: product.customer,
                    invoiceReference, 
                    biller: product.biller,
                    productId: product.id,
                    productName: product.name,
                    quantitySold: product.quantityOrdered,
                    subtotal: product.subtotal,
                    date: serverTimestamp(),
                };

                await setDoc(newSaleRef, saleItemDoc);
                console.log(`Sale document created for product ${product.name}:`, saleItemDoc);

                // Step 3: Update product quantities individually
                const productRef = collection(firestore, "products");
                const q = query(productRef, where("name", "==", product.name));

                // Get the current product data to check and update quantity
                const productSnapshot = await getDocs(q);

                if (productSnapshot.empty) {
                    toast.error(`Product ${product.name} not found in inventory`);
                    return
                }

                const productDoc = productSnapshot.docs[0];
                const currentQuantity = productDoc.data().stock;

                if (currentQuantity < product.quantityOrdered) {
                    toast.error(`Insufficient quantity for product ${product.name}`);
                    return
                }

                // Update product quantity
                const updatedQuantity = currentQuantity - product.quantityOrdered;
                const productDocRef = doc(firestore, "products", productDoc.id);
                await updateDoc(productDocRef, {
                    stock: updatedQuantity,
                });
                console.log(`Updated product ${product.name} with new quantity: ${updatedQuantity}`);
            }

            // toast.success('Invoice and sales saved successfully');
            return true;
        } catch (err: any) {
            const errorMessage = `Failed to save sale: ${err.message || 'An error occurred'}`;
            console.error("Error during save:", errorMessage, err);
            setError(errorMessage);
            toast.error(errorMessage);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { saveSale, loading, error };
};
