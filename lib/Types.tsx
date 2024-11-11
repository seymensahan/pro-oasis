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


export interface ServiceDataProps {
    id?: string
    name: string
    description?: string
    category: string
    price: number
    duration?: number
    availability?: string
    deliveryMethod?: string
    requirements?: string
    images?: ImageProps[];
}

export interface ProductDataProps {
    id: string;
    reference?: string;
    name: string;
    description?: string;
    price: number;
    purchasePrice?: number;
    createdAt: Timestamp; 
    category: string;
    stock: number;
    unit: string;
    expirationDate?: Date | null;
    images?: ImageProps[];
    owner?: string;
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

