import { FieldValue, Timestamp } from "firebase/firestore"

interface Product {
    id: string
    name: string
    quantity?: number
    price: number
}

export interface SaleProduct extends Product {
    customer: string
    date?: Timestamp | FieldValue
    product: string
    quantityOrdered: number
    subtotal: number
}


export interface SaleData {
    id?: string
    customerName: string
    products: SaleProduct[]
    grandTotal: number
    status: 'Completed' | 'Pending'
    paid: number
    due: number
    paymentStatus: 'Paid' | 'Due'
    biller?: string
    reference?: string
    date?: Timestamp | FieldValue
}