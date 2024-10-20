export interface Product {
    id: number;
    name: string;
    image: string;
    sku: string;
    category: string;
    brand: string;
    price: number;
    unit: string;
    qty: number;
    createdBy: {
        name: string;
        avatar: string;
    };
}
