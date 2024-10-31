interface Product {
    id: string
    name: string
    quantity: number
    price: number
}

export interface SaleProduct extends Product {
    customer: string
    date: string
    product: string
    quantity: number
    quantityOrdered: number
    subtotal: number
}


export interface SaleData {
    id: string
    customerName: string
    // products: SaleProduct[]
    grandTotal: number
    status: 'Completed' | 'Pending'
    paid: number
    due: number
    paymentStatus: 'Paid' | 'Due'
    biller: string
    reference: string
    date: string
}