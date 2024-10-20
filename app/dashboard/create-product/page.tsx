"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, PlusCircleIcon, ChevronLeft, ChevronUp, Plus, Settings, X } from 'lucide-react'
import { collection, addDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from "firebase/storage" // Firebase Storage functions

import { useForm } from "react-hook-form";
import { firestore, storage  } from '@/firebase/config'
import { toast } from 'react-toastify'
import { getAuth } from 'firebase/auth';
import { useAddProductBrand } from './hooks/useAddProductBrand'

// Get the authenticated user
const auth = getAuth();
const user = auth.currentUser;
const userId = user ? user.uid : null;  

export default function NewProductForm() {
    const [expandedSections, setExpandedSections] = useState({
        productInfo: true,
        pricingStocks: true,
        images: true,
        customFields: true,
    })

    const toggleSection = (section: keyof typeof expandedSections) => {
        setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }))
    }

    const { addBrand, loading } = useAddProductBrand();

    const [formData, setFormData] = useState({
        productName: '',
        category: '',
        brand: '',
        unit: '',
        quantity: '',
        price: '',
        description: '', 
        // Add other fields here
    })

    const [images, setImages] = useState<File[]>([])


    const handleFileChange = (file: File | null) => {
        if (file) {
            setImages((prevImages) => [...prevImages, file]);
        }
    }
    
    
    const handleRemoveImage = (index: number) => {
        const updatedImages = images.filter((_, imgIndex) => imgIndex !== index); 
        setImages(updatedImages);
    }
    

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }


    const [newBrandName, setNewBrandName] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSelectChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAddBrand = async () => {
        if (newBrandName) {
            await addBrand(newBrandName);
            setNewBrandName(''); 
            setIsModalOpen(false); 
        }
    };
    //
    const ProductForm = () => {
        const form = useForm(); // Your form instance
        const errors = form.formState.errors;
      
        // Use the Firebase brand hook
        const {
            addBrandModal,
            productBrand,
            handleChangeProductBrand,
            allProductBrands,
            addNewProductBrand,
            cancelAddNewProductBrand,
            isPending,
        } = useAddProductBrand();
      
        const handleSelectChange = (field, value) => {
            form.setValue(field, value);
            handleChangeProductBrand(value);
        };
    
        //

        const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault()
    
            const mandatoryFields = ['productName', 'category', 'brand', 'unit', 'quantity', 'price'] as const
            const missingFields = mandatoryFields.filter(field => !formData[field])
    
            if (missingFields.length > 0) {
                toast.error(`Please fill in all mandatory fields: ${missingFields.join(', ')}`)
                return
            }
    
            try {
                const user = auth.currentUser;
                if (!user) {
                    toast.error("User is not authenticated");
                    return;
                }
    
               
                const uploadedImageURLs = await Promise.all(
                    images.map(async (image) => {
                        const storageRef = ref(storage, `products/${image.name}`);
                        await uploadBytes(storageRef, image); 
                        return await getDownloadURL(storageRef); 
                    })
                );

                
                const productData = {
                    ...formData,
                    userId: user.uid, 
                    images: uploadedImageURLs, 
                    createdAt: new Date() 
                };

                
                const docRef = await addDoc(collection(firestore, 'products'), productData);
                toast.success("Product saved successfully!");
            } catch (error) {
                console.error("Error adding document: ", error);
                toast.error("Failed to save product. Please try again.");
            }
        }


        return (
            <div className="container mx-auto p-6 bg-gray-50">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">New Product</h1>
                        <p className="text-sm text-gray-600">Create new product</p>
                    </div>
                    <Button variant="outline" className="bg-gray-800 text-white hover:bg-gray-700">
                        <ChevronLeft className="mr-2 h-4 w-4" /> Back to Product
                    </Button>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-md font-medium">
                                <span className="bg-orange-100 text-orange-500 p-1 rounded-full mr-2">ℹ</span>
                                Product Information
                            </CardTitle>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="w-9 p-0"
                                onClick={() => setIsModalOpen(true)}
                            >
                                {expandedSections.productInfo ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                            </Button>
                        </CardHeader>
                        {expandedSections.productInfo && (
                            <CardContent className="pt-4">
                                <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                        <Label htmlFor="category">Category *</Label>
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


                                                                    {/* Brand Section */}
      <div className="flex flex-col items-start w-full">
        <div className="flex items-center justify-between mb-1 w-full">
          <p className="text-secondary-text font-medium text-sm after:content-['*'] after:ml-0.5 after:text-red-600">
            Brand
          </p>
          <button
            onClick={addBrandModal.open}
            className="flex items-center gap-2 text-secondary-text hover:text-secondary transition-all duration-300 ease-linear"
          >
            <PlusCircleIcon className="size-4" />
            <p className="text-sm font-semibold">Add new</p>
          </button>
        </div>

        <Label htmlFor="brand">Brand *</Label>
        <Select
          onValueChange={(value) => handleSelectChange("productBrand", value)}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Choose" />
          </SelectTrigger>
          <SelectContent>
            {allProductBrands.map((brand) => (
              <SelectItem key={brand.value} value={brand.value}>
                {brand.text}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.productBrand && (
          <p className="text-red-600">{errors.productBrand.message}</p>
        )}
      </div>

      {/* Brand Modal */}
      {addBrandModal.isOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add New Brand</h2>
            <input
              type="text"
              value={productBrand}
              onChange={(e) => handleChangeProductBrand(e.target.value)}
              placeholder="Enter new brand"
            />
            <button onClick={addNewProductBrand} disabled={isPending}>
              {isPending ? "Adding..." : "Add Brand"}
            </button>
            <button onClick={cancelAddNewProductBrand}>Cancel</button>
          </div>
        </div>
      )}
    
                                    
                                    <div>
                                        <Label htmlFor="unit">Unit *</Label>
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
                                    <Textarea id="description" placeholder="Enter description" className="h-32" />
                                    <p className="text-sm text-gray-500 mt-1">Maximum 60 Characters</p>
                                </div>
                            </CardContent>
                        )}
                    </Card>

                    {isModalOpen && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                            <div className="bg-white p-6 rounded-lg w-full max-w-sm">
                                <h3 className="text-xl font-semibold mb-4">Add New Brand</h3>
                                <Input
                                    id="newBrandName"
                                    placeholder="Enter new brand name"
                                    value={newBrandName}
                                    onChange={(e) => setNewBrandName(e.target.value)}
                                />
                                <div className="flex justify-end mt-4">
                                    <Button
                                        onClick={() => setIsModalOpen(false)}
                                        variant="outline"
                                        className="mr-2"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={handleAddBrand}
                                        disabled={loading}
                                        className="bg-blue-500 text-white"
                                    >
                                        {loading ? "Saving..." : "Save"}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-md font-medium">
                                <span className="bg-orange-100 text-orange-500 p-1 rounded-full mr-2">$</span>
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
                                        <RadioGroup defaultValue="single" className="flex space-x-4 mt-2">
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
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                                            <Select>
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
                                            <Label htmlFor="discountValue">Discount Value</Label>
                                            <Input id="discountValue" placeholder="Enter discount value" />
                                        </div>
                                        <div>
                                            <Label htmlFor="quantityAlert">Quantity Alert</Label>
                                            <Input id="quantityAlert" type="number" placeholder="Enter quantity alert" />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        )}
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-md font-medium">
                                <span className="bg-orange-100 text-orange-500 p-1 rounded-full mr-2">🖼</span>
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
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                            onChange={(e) =>
                                                handleFileChange(e.target.files ? e.target.files[0] : null)
                                            }
                                        />
                                        <Plus className="h-6 w-6 text-gray-400" />
                                        <span className="sr-only">Add Images</span>
                                    </div>

                                    {/* Display selected images */}
                                    {images.map((image, index) => (
                                        <div key={index} className="w-32 h-32 border border-gray-200 rounded-lg relative">
                                            <img src={URL.createObjectURL(image)} alt={`Image ${index}`} className="w-full h-full object-cover rounded-lg" />
                                            <Button variant="destructive" size="icon" className="absolute top-1 right-1 h-6 w-6" onClick={() => handleRemoveImage(index)}>
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
                                <span className="bg-orange-100 text-orange-500 p-1 rounded-full mr-2">📋</span>
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
                                <div className="flex space-x-4 mb-4">
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
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

                    <div className="flex justify-end space-x-4">
                        <Button variant="outline" type="button">Cancel</Button>
                        <Button className="bg-orange-500 hover:bg-orange-600" type="submit">Save Product</Button>
                    </div>
                </form>
                <Button variant="outline" size="icon" className="fixed bottom-6 right-6 h-10 w-10 rounded-full bg-orange-500 hover:bg-orange-600">
                    <Settings className="h-5 w-5 text-white" />
                </Button>
            </div>
        )
    }


}

