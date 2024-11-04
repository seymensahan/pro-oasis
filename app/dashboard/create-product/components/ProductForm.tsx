import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import TextareaField from "./TextareaField"
import { FormSubmitProps } from "../utils/Types"
import SelectField from "./SelectField"
import ImageUploader from "./ImageUploader"
import CheckboxField from "./CheckboxField"
import DateSelector from "./DateSelector"
import InputField from "./InputField"

export default function ProductForm({ onSubmit }: FormSubmitProps) {
    const [date, setDate] = useState<Date>()
    const [images, setImages] = useState<string[]>([])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.target as HTMLFormElement)
        const data = Object.fromEntries(formData)
        // data.images = images
        // data.date = date
        onSubmit(data)
    }

    return (
        <form onSubmit={handleSubmit} id="product-form">
            <Card>
                <CardHeader>
                    <CardTitle>New Product</CardTitle>
                    <CardDescription>Enter the details for the new product</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <InputField id="product-name" label="Product Name *" required />
                        <InputField id="product-sku" label="SKU *" required />
                    </div>
                    <TextareaField id="product-description" label="Description" placeholder="Enter product description" />
                    <div className="grid grid-cols-2 gap-4">
                        <SelectField id="product-category" label="Category *" options={["Electronics", "Clothing", "Food & Beverage"]} required />
                        <InputField id="product-price" label="Price *" type="number" required />
                    </div>
                    <ImageUploader images={images} setImages={setImages} />
                    <CheckboxField id="product-taxable" label="Taxable" />
                    <DateSelector date={date} setDate={setDate} label="Expiration Date (if applicable)" />
                </CardContent>
            </Card>
        </form>
    )
}


