import { firestore } from '@/firebase/config'
import { collection, doc, setDoc, updateDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore'
import { useState } from 'react'
import { toast } from 'react-toastify'

interface Product {
    id: string
    name: string
    quantity: number
    price: number
}

interface SaleProduct extends Product {
    customer: string
    date: string
    product: string
    quantity: number
    quantityOrdered: number
    subtotal: number
}

interface SaleData {
    customerName: string
    products: SaleProduct[]
    grandTotal: number
    status: 'Completed' | 'Pending'
    paid: number
    due: number
    paymentStatus: 'Paid' | 'Due'
    biller: string
    reference: string
}

export const useSaveSale = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const saveSale = async (saleData: SaleData) => {
        setLoading(true)
        setError(null)

        console.log("Attempting to save sale with data:", saleData)

        if (!saleData.customerName || !saleData.products || saleData.products.length === 0) {
            const errorMsg = 'Sale data is missing required fields (customer name or products list)'
            setError(errorMsg)
            toast.error(errorMsg)
            setLoading(false)
            return false
        }

        try {
            // Step 1: Save the sale document
            const salesRef = collection(firestore, 'sales')
            const newSaleRef = doc(salesRef)
            const saleDoc = {
                ...saleData,
                reference: `SL${Date.now().toString().slice(-4)}`,  // Quick reference generation
                date: serverTimestamp(),
                createdAt: serverTimestamp(),
            }

            await setDoc(newSaleRef, saleDoc)
            console.log("Sale document created successfully:", saleDoc)

            // Step 2: Update product quantities individually
            for (const product of saleData.products) {
                const productRef = collection(firestore, "products")
                const q = query(productRef, where("productName", "==", product.product))

                // Get the current product data to check and update quantity
                const productSnapshot = await getDocs(q)

                if (productSnapshot.empty) {
                    throw new Error(`Product ${product.product} not found in inventory`)
                }

                const productDoc = productSnapshot.docs[0] // Assume only one matching product document
                const currentQuantity = productDoc.data().quantity

                if (currentQuantity < product.quantityOrdered) {
                    throw new Error(`Insufficient quantity for product ${product.product}`)
                }

                // Update product quantity
                const updatedQuantity = currentQuantity - product.quantityOrdered
                const productDocRef = doc(firestore, "products", productDoc.id)
                await updateDoc(productDocRef, {
                    quantity: updatedQuantity
                })
                console.log(`Updated product ${product.product} with new quantity: ${updatedQuantity}`)
            }

            // toast.success('Sale saved successfully')
            return true
        } catch (err: any) {
            const errorMessage = `Failed to save sale: ${err.message || 'An error occurred'}`
            console.error("Error during save:", errorMessage, err)
            setError(errorMessage)
            toast.error(errorMessage)
            return false
        } finally {
            setLoading(false)
        }
    }

    return { saveSale, loading, error }
}
