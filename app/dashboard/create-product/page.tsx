'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, ChevronLeft, ChevronUp, Plus, X, PlusCircle } from 'lucide-react'
import { collection, addDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { getAuth } from 'firebase/auth'
import { firestore } from '@/firebase/config'

export default function NewProductForm() {
    const [expandedSections, setExpandedSections] = useState({
        productInfo: true,
        pricingStocks: true,
        images: true,
        customFields: true,
    })

    const [formData, setFormData] = useState({
        productName: '',
        category: '',
        brand: '',
        unit: '',
        quantity: '',
        price: '',
        description: '',
        productType: 'single',
        taxType: '',
        discountType: '',
        discountValue: '',
        quantityAlert: '',
    })

    const [images, setImages] = useState<File[]>([])

    const toggleSection = (section: keyof typeof expandedSections) => {
        setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }))
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImages(prevImages => [...prevImages, ...Array.from(e.target.files as FileList)])
        }
    }

    const removeImage = (index: number) => {
        setImages(prevImages => prevImages.filter((_, i) => i !== index))
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSelectChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const auth = getAuth()
        const user = auth.currentUser

        if (!user) {
            toast.error("User is not authenticated")
            return
        }

        const mandatoryFields = ['productName', 'category', 'brand', 'unit', 'quantity', 'price'] as const
        const missingFields = mandatoryFields.filter(field => !formData[field])

        if (missingFields.length > 0) {
            toast.error(`Please fill in all mandatory fields: ${missingFields.join(', ')}`)
            return
        }

        try {
            const productData = {
                ...formData,
                userId: user.uid,
                createdAt: new Date()
            }

            const docRef = await addDoc(collection(firestore, 'products'), productData)
            toast.success("Product saved successfully!")
        } catch (error) {
            console.error("Error adding document: ", error)
            toast.error("Failed to save product. Please try again.")
        }
    }

    return (
        <div className="container mx-auto p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">New Product</h1>
                    <p className="text-sm text-gray-600">Create new product</p>
                </div>
                <Button variant="outline" className="bg-gray-800 text-white bg-blue-500 hover:bg-blue-400">
                    <ChevronLeft className="mr-2 h-4 w-4" /> Back to Product
                </Button>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-md font-medium">
                            <span className="bg-blue-100 text-blue-500 p-1 rounded-full mr-2">ℹ</span>
                            Product Information
                        </CardTitle>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="w-9 p-0"
                            onClick={() => toggleSection('productInfo')}
                        >
                            {expandedSections.productInfo ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </Button>
                    </CardHeader>
                    {expandedSections.productInfo && (
                        <CardContent className="pt-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="productName">Product Name *</Label>
                                    <Input
                                        id="productName"
                                        name="productName"
                                        placeholder="Enter product name"
                                        value={formData.productName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <Label htmlFor="category">Category *</Label>
                                        <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                                            <PlusCircle className="mr-1 h-3 w-3" />
                                            Add New
                                        </Button>
                                    </div>
                                    <Select name="category" onValueChange={(value) => handleSelectChange("category", value)} required>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Choose" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="category1">Category 1</SelectItem>
                                            <SelectItem value="category2">Category 2</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <Label htmlFor="brand">Brand *</Label>
                                        <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                                            <PlusCircle className="mr-1 h-3 w-3" />
                                            Add New
                                        </Button>
                                    </div>
                                    <Select name="brand" onValueChange={(value) => handleSelectChange("brand", value)} required>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Choose" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="brand1">Brand 1</SelectItem>
                                            <SelectItem value="brand2">Brand 2</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <Label htmlFor="unit">Unit *</Label>
                                        <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                                            <PlusCircle className="mr-1 h-3 w-3" />
                                            Add New
                                        </Button>
                                    </div>
                                    <Select name="unit" onValueChange={(value) => handleSelectChange("unit", value)} required>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Choose" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="unit1">Unit 1</SelectItem>
                                            <SelectItem value="unit2">Unit 2</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="mt-4">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    placeholder="Enter description"
                                    className="h-32"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                />
                                <p className="text-sm text-gray-500 mt-1">Maximum 60 Characters</p>
                            </div>
                        </CardContent>
                    )}
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-md font-medium">
                            <span className="bg-blue-100 text-blue-500 p-1 rounded-full mr-2">$</span>
                            Pricing & Stocks
                        </CardTitle>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="w-9 p-0"
                            onClick={() => toggleSection('pricingStocks')}
                        >
                            {expandedSections.pricingStocks ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </Button>
                    </CardHeader>
                    {expandedSections.pricingStocks && (
                        <CardContent className="pt-4">
                            <div className="space-y-4">
                                <div>
                                    <Label className="text-base">Product Type</Label>
                                    <RadioGroup
                                        defaultValue="single"
                                        className="flex flex-wrap gap-4 mt-2"
                                        onValueChange={(value) => handleSelectChange("productType", value)}
                                    >
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="single" id="single" />
                                            <Label htmlFor="single">Single Product</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="variable" id="variable" />
                                            <Label htmlFor="variable">Variable Product</Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    <div>
                                        <Label htmlFor="quantity">Quantity *</Label>
                                        <Input
                                            id="quantity"
                                            name="quantity"
                                            type="number"
                                            placeholder="Enter quantity"
                                            value={formData.quantity}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="price">Price *</Label>
                                        <Input
                                            id="price"
                                            name="price"
                                            type="number"
                                            placeholder="Enter price"
                                            value={formData.price}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="taxType">Tax Type</Label>
                                        <Select name="taxType" onValueChange={(value) => handleSelectChange("taxType", value)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Option" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="inclusive">Inclusive</SelectItem>
                                                <SelectItem value="exclusive">Exclusive</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label htmlFor="discountType">Discount Type</Label>
                                        <Select name="discountType" onValueChange={(value) => handleSelectChange("discountType", value)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Choose" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="percentage">Percentage</SelectItem>
                                                <SelectItem value="fixed">Fixed Amount</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label htmlFor="discountValue">Discount Value</Label>
                                        <Input
                                            id="discountValue"
                                            name="discountValue"
                                            placeholder="Enter discount value"
                                            value={formData.discountValue}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="quantityAlert">Quantity Alert</Label>
                                        <Input
                                            id="quantityAlert"
                                            name="quantityAlert"
                                            type="number"
                                            placeholder="Enter quantity alert"
                                            value={formData.quantityAlert}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    )}
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-md font-medium">
                            <span className="bg-blue-100 text-blue-500 p-1 rounded-full mr-2">🖼</span>
                            Images
                        </CardTitle>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="w-9 p-0"
                            onClick={() => toggleSection('images')}
                        >
                            {expandedSections.images ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </Button>
                    </CardHeader>
                    {expandedSections.images && (
                        <CardContent className="pt-4">
                            <div className="flex flex-wrap gap-4">
                                <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-gray-400 relative">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        onChange={handleFileChange}
                                    />
                                    <Plus className="h-6 w-6 text-gray-400" />
                                    <span className="sr-only">Add Images</span>
                                </div>

                                {images.map((image, index) => (
                                    <div key={index} className="w-32 h-32 border border-gray-200 rounded-lg relative">
                                        <img
                                            src={URL.createObjectURL(image)}
                                            alt={`Image ${index}`}
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            className="absolute top-1 right-1 h-6 w-6"

                                            onClick={() => removeImage(index)}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    )}
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-md font-medium">
                            <span className="bg-blue-100 text-blue-500 p-1 rounded-full mr-2">📋</span>
                            Custom Fields
                        </CardTitle>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="w-9 p-0"
                            onClick={() => toggleSection('customFields')}
                        >
                            {expandedSections.customFields ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </Button>
                    </CardHeader>
                    {expandedSections.customFields && (
                        <CardContent className="pt-4">
                            <div className="flex flex-wrap gap-4 mb-4">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="warranties" />
                                    <Label htmlFor="warranties">Warranties</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="manufacturer" />
                                    <Label htmlFor="manufacturer">Manufacturer</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="expiry" />
                                    <Label htmlFor="expiry">Expiry</Label>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                <div>
                                    <Label htmlFor="discountType2">Discount Type</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Choose" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="percentage">Percentage</SelectItem>
                                            <SelectItem value="fixed">Fixed Amount</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label htmlFor="quantityAlert2">Quantity Alert</Label>
                                    <Input id="quantityAlert2" type="number" placeholder="Enter quantity alert" />
                                </div>
                                <div>
                                    <Label htmlFor="manufacturedDate">Manufactured Date</Label>
                                    <Input id="manufacturedDate" type="date" />
                                </div>
                                <div>
                                    <Label htmlFor="expiryDate">Expiry On</Label>
                                    <Input id="expiryDate" type="date" />
                                </div>
                            </div>
                        </CardContent>
                    )}
                </Card>

                <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
                    <Button variant="outline" type="button">Cancel</Button>
                    <Button className="bg-blue-500 hover:bg-blue-400" type="submit">

                        Save Product
                    </Button>
                </div>
            </form>
        </div>
    )
}