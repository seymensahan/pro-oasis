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
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"

import { CalendarIcon, ChevronLeft, Plus, Upload } from "lucide-react"
import { cn } from "@/lib/utils"
import ServiceForm from "./components/ServiceForm"
import useProduct from "./hooks/useProduct"
import ProductForm from "./components/ProductForm"

export default function NewInventoryItemPage() {
  const router = useRouter()
  const [date, setDate] = useState<Date>()
  const [images, setImages] = useState<string[]>([])
  const { addProduct, addService, serviceError, serviceLoading } = useProduct()

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
    } else if (formType == "product") {
      addProduct(data)
    }
    router.back() 
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
          <ProductForm onSubmit={data => handleFormSubmit(data, "product")} />
        </TabsContent>

        <TabsContent value="service">
          <ServiceForm onSubmit={data => handleFormSubmit(data, "service")} />
        </TabsContent>


      </Tabs>
    </div>
  )
}