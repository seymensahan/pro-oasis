
// Props for image uploader component
export interface ImageUploaderProps {
    images: string[]
    setImages: React.Dispatch<React.SetStateAction<string[]>>
}

// Props for date selector component
export interface DateSelectorProps {
    date: Date | undefined
    setDate: React.Dispatch<React.SetStateAction<Date | undefined>>
    label: string
}

// Props for form submission components
export interface FormSubmitProps {
    onSubmit: (data: Record<string, any>) => void
}

// General props for form fields
export interface InputFieldProps {
    id: string
    label: string
    required?: boolean
    type?: string
    placeholder?: string
    error?: string
    value?: any
    [x: string]: any
}

export interface SelectFieldProps {
    id: string
    label: string
    options: string[]
    required?: boolean
    error?: string
    [x: string]: any
}

export interface TextareaFieldProps {
    id: string
    label: string
    required?: boolean
    placeholder?: string
}

export interface CheckboxFieldProps {
    id: string
    label: string
}

export interface SelectFieldProps {
    id: string
    label: string
    options: string[]
    required?: boolean
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
}

