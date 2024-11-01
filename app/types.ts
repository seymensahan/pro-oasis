export interface Product {
    id: string;
    productName: string;
    image: string;
    userId?: string;
    category: string;
    brand?: string;
    price: number;
    unit?: string;
    quantity: number;
    description?: string;
    reference?: string;
}

export interface CartItem extends Product {
    quantity: number
}
