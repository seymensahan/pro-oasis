import { FieldValue, Timestamp } from "firebase/firestore"

interface Product {
    id: string
    name: string
    quantity?: number
    price: number
}

export interface SaleProduct extends Product {
    customerName: string
    date?: Timestamp | FieldValue
    productName: string
    quantitySold: number
    subtotal: number
    biller?: string
    saleReference?: string;
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
    saleReference?: string
    date?: Timestamp | FieldValue
}