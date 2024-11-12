import { User } from "firebase/auth";
import { Timestamp } from "firebase/firestore";

export interface FormSubmitProps {
    onSubmit: (data: Record<string, any>) => void
}

export interface ImageProps {
    path: string;
    progress: number;
    url: string;
}



export interface ImageProps {
    url: string;
    alt?: string;
}

export type Supply = {
    id: number;
    name: string;
    image: string;
    category: string;
    price: string;
    unit: string;
    qty: number | string;
    supplier: string;
};
// Type for product data properties, more detailed and specific to product inventory
export type ProductDataProps = {
    id: string;                // Unique identifier for the product
    reference?: string;        // Product reference code or SKU
    name: string;              // Product name
    description?: string;      // Product description
    price: number;             // Product price
    purchasePrice?: number;    // Cost price of the product
    createdAt: Timestamp;      // Timestamp of when the product was created
    category: string;          // Category under which the product falls
    stock: number;             // Current stock of the product
    unit: string;              // Unit of measurement for the product
    expirationDate?: Date | null; // Expiration date if the product has one, otherwise null
    images?: ImageProps[];     // Array of images related to the product
    owner?: string;            // Owner ID (for multi-user systems, if relevant)
}

export interface SupplyDataProps {
    id: string;
    supplyProduct: string;
    category: string;
    purchasePrice: number;
    unit: string;
    quantityPurchased: string;
    supplier: string;
    images?: ImageProps[]; 
}

export interface SupplierModalProps {
    id?: string;
    name: string;
    productName: string;
    contact: string;
    email?: string 
    website?: string 
}

// Type for supply form data, focused on basic supply-related details
export type FormData = {
    id?: string;
    productName: string;       // Name of the product being recorded in a supply form
    category?: string;         // Category of the supply
    price?: string;            // Price as a string (for display only, can be further typed if necessary)
    unit?: string;             // Unit of measurement for the supply item
    quantityPurchased: string ;  // Quantity of the product purchased
    supplier: string;          // Supplier name
};

// Type for service data properties, capturing various service attributes
export type ServiceDataProps = {
    id?: string;
    name: string;              // Name of the service
    description?: string;      // Service description
    category: string;          // Category under which the service falls
    price: number;             // Price for the service
    duration?: number;         // Duration of the service, in minutes/hours
    availability?: string;     // Service availability status
    deliveryMethod?: string;   // Method of delivering the service (online, in-person, etc.)
    requirements?: string;     // Requirements for availing the service
    images?: ImageProps[];     // Array of image props related to the service
}




export interface CartItem extends ProductDataProps {
    quantity: number
}

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}


export interface CategoryProps {
    id?: number;
    name: string;
}

export interface UnitProps {
    id?: number;
    name: string;
}


export interface AuthState {
    user: User | null;
    loading: boolean;
    error: Error | null;
    login: (user: User) => void;
    logout: () => void;
    setUser: (user: User | null) => void;
}

