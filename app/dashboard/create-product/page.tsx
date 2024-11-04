'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, ChevronLeft, Plus, Upload } from "lucide-react"
import { cn } from "@/lib/utils"
import ServiceForm from "./components/ServiceForm"
import useProduct from "./hooks/useProduct"

export default function NewInventoryItemPage() {
  const router = useRouter()
  const [date, setDate] = useState<Date>()
  const [images, setImages] = useState<string[]>([])
  const { addService, serviceError, serviceLoading } = useProduct()

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file))
      setImages(prev => [...prev, ...newImages])
    }
  }

  const handleFormSubmit = (data: any, formType: "product" | "service") => {
    // Mock submission logic
    console.log(`Submitted ${formType} data:`, data)
    if (formType == "service") {
      addService(data)
    }
    // router.back() 
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">New Inventory Item</h1>
          <p className="text-muted-foreground">Add a new product or service to your inventory</p>
        </div>
        <Button variant="outline" onClick={() => router.back()}>
          <ChevronLeft className="mr-2 h-4 w-4" /> Back
        </Button>
      </div>

      <Tabs defaultValue="product">
        <TabsList className="mb-4">
          <TabsTrigger value="product">Product</TabsTrigger>
          <TabsTrigger value="service">Service</TabsTrigger>
        </TabsList>

        <TabsContent value="product">
          <Card>
            <CardHeader>
              <CardTitle>New Product</CardTitle>
              <CardDescription>Enter the details for the new product</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="product-name">Product Name *</Label>
                  <Input id="product-name" placeholder="Enter product name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product-sku">SKU *</Label>
                  <Input id="product-sku" placeholder="Enter SKU" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="product-description">Description</Label>
                <Textarea
                  id="product-description"
                  placeholder="Enter product description"
                  className="min-h-[100px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="product-category">Category *</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="clothing">Clothing</SelectItem>
                      <SelectItem value="food">Food & Beverage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product-price">Price *</Label>
                  <Input id="product-price" type="number" placeholder="Enter price" required />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="product-quantity">Quantity in Stock *</Label>
                  <Input id="product-quantity" type="number" placeholder="Enter quantity" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product-reorder-point">Reorder Point</Label>
                  <Input id="product-reorder-point" type="number" placeholder="Enter reorder point" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Product Images</Label>
                <div className="grid grid-cols-4 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                      <img src={image} alt={`Product ${index + 1}`} className="object-cover w-full h-full" />
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

              <div className="flex items-center space-x-2">
                <Checkbox id="product-taxable" />
                <Label htmlFor="product-taxable">Taxable</Label>
              </div>

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
        </TabsContent>

        <TabsContent value="service">
          <ServiceForm onSubmit={data => handleFormSubmit(data, "service")} />
        </TabsContent>


      </Tabs>
    </div>
  )
}