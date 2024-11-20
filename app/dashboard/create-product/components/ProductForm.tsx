import React, { ChangeEvent, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import { Label } from "@/components/ui/label"
import { FormSubmitProps, ProductDataProps } from "../../../../lib/Types"
import { Button } from "@/components/ui/button"
import { CalendarIcon, Plus, Upload } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import useProduct from "../hooks/useProduct"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"
import NewCategoryModal from "./NewCategoryModal"
import useCategory from "../hooks/useCategory"
import NewUnitModal from "./NewUnitModal"
import useUnit from "../hooks/useUnit"

export default function zProductForm({ onSubmit }: FormSubmitProps) {
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)
    const [isUnitModalOpen, setIsUnitModalOpen] = useState(false)
    const router = useRouter()
    const [date, setDate] = useState<Date>()
    const { images, handleImageRemove, handleImageUpload } = useProduct()
    const { category } = useCategory()
    const { unit } = useUnit()
    const [productData, setProductData] = useState({
        name: '',
        description: '',
        price: 0,
        purchasePrice: 0,
        category: '',
        unit: '',
        stock: 0,
    })

    const onOpenCategoryModal = () => {
        setIsCategoryModalOpen(true)
    }

    const handleInpuChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setProductData(data => ({
            ...data,
            [name]: value
        })
        )
    }

    const handleSelectChange = (name: string) => (value: string) => {
        setProductData(data => ({
            ...data,
            [name]: value
        }))
    }


    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const formData = {
            ...productData,
            images,
            date: date || "-"
        };
        onSubmit(formData);
    };

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>New Product</CardTitle>
                    <CardDescription>Enter the details for the new product</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="product-name">Product Name *</Label>
                            <Input
                                id="product-name"
                                placeholder="Enter product name"
                                name="name"
                                value={productData.name}
                                onChange={handleInpuChange}
                                required />
                        </div>
                        {/* <div className="space-y-2">
                        <Label htmlFor="product-sku">SKU *</Label>
                        <Input id="product-sku" placeholder="Enter SKU" required />
                    </div> */}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="product-description">Description</Label>
                        <Textarea
                            id="product-description"
                            placeholder="Enter product description"
                            name="description"
                            value={productData.description}
                            onChange={handleInpuChange}
                            className="min-h-[100px]"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="product-category">Category *</Label>
                            <div className="flex items-center">
                                <Select name="category" onValueChange={handleSelectChange('category')} required>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {category?.map((category) => (
                                            <SelectItem key={category.id} value={category.name}>
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                        <SelectItem value="electronics">Electronics</SelectItem>
                                        <SelectItem value="clothing">Clothing</SelectItem>
                                        <SelectItem value="food">Food & Beverage</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button variant="ghost" size="icon" className="ml-2" onClick={onOpenCategoryModal}>
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="product-price">Purchase Price *</Label>
                            <Input
                                id="product-price"
                                type="number"
                                placeholder="Enter price"
                                name="purchasePrice"
                                value={productData.purchasePrice}
                                onChange={handleInpuChange}
                                required />
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="product-price">Unit Price *</Label>
                            <Input
                                id="product-price"
                                type="number"
                                placeholder="Enter price"
                                name="price"
                                value={productData.price}
                                onChange={handleInpuChange}
                                required />
                        </div>

                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="unit">Unit</Label>
                            <div className="flex items-center">
                                <Select name="unit" onValueChange={handleSelectChange('unit')} required>
                                    <SelectTrigger id="unit">
                                        <SelectValue placeholder="Choose" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {unit?.map((unit) => (
                                            <SelectItem key={unit.id} value={unit.name}>
                                                {unit.name}
                                            </SelectItem>
                                        ))}
                                        <SelectItem value="unit1">Pack</SelectItem>
                                        <SelectItem value="unit2">Kilogram</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button variant="ghost" size="icon" className="ml-2" onClick={() => setIsUnitModalOpen(true)}>
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="product-quantity">Quantity in Stock *</Label>
                            <Input
                                id="product-quantity"
                                type="number"
                                placeholder="Enter quantity"
                                name="stock"
                                value={productData.stock}
                                onChange={handleInpuChange}
                                required />
                        </div>
                        {/* <div className="space-y-2">
                        <Label htmlFor="product-reorder-point">Reorder Point</Label>
                        <Input id="product-reorder-point" type="number" placeholder="Enter reorder point" />
                    </div> */}
                    </div>

                    <div className="space-y-2">
                        <Label>Product Images</Label>
                        <div className="grid grid-cols-4 gap-4">
                            {images.map((image, index) => (
                                <div key={index} className="relative">
                                    {image.url ? (
                                        <img src={image.url} alt={`Uploaded ${index}`} className="w-full h-32 object-cover rounded" />
                                    ) : (
                                        <Progress value={image.progress} className="w-full mt-20 h-4 rounded bg-gray-200" />
                                    )}
                                    <button
                                        type="button"
                                        onClick={() => handleImageRemove(index)}
                                        className="absolute top-0 right-0 text-red-500"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                            <label className="border-2 border-dashed rounded-lg aspect-square flex items-center justify-center cursor-pointer hover:border-primary">
                                <div className="text-center">
                                    <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                                    <span className="mt-2 block text-sm text-muted-foreground">Upload Image</span>
                                </div>
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageUpload}
                                />
                            </label>
                        </div>
                    </div>

                    {/* <div className="flex items-center space-x-2">
                    <Checkbox id="product-taxable" />
                    <Label htmlFor="product-taxable">Taxable</Label>
                </div> */}

                    <div className="space-y-2">
                        <Label>Expiration Date (if applicable)</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !date && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? format(date, "PPP") : "Pick a date"}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                </CardContent>
            </Card>
            <div className="mt-6 flex justify-end space-x-4">
                <Button variant="outline" onClick={() => router.back()}>
                    Cancel
                </Button>
                <Button type="submit" onClick={handleSubmit}>
                    Save Product
                </Button>
            </div>
            <NewCategoryModal isOpen={isCategoryModalOpen} onClose={() => setIsCategoryModalOpen(false)} />
            <NewUnitModal isOpen={isUnitModalOpen} onClose={() => setIsUnitModalOpen(false)} />
        </>
    )
}


