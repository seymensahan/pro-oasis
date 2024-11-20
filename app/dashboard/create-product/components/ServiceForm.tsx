import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Form } from "react-hook-form";
import { Loader, Loader2, Plus, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { storage } from "@/firebase/config";
import { FormSubmitProps } from "../../../../lib/Types";
import { Progress } from "@/components/ui/progress";
import useProduct from "../hooks/useProduct";
import useCategory from "../hooks/useCategory";
import NewCategoryModal from "./NewCategoryModal";

export default function ServiceForm({ onSubmit }: FormSubmitProps) {
    const router = useRouter();
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)
    const { serviceLoading, handleImageRemove, handleImageUpload, images } = useProduct()
    const { category } = useCategory()

    const [serviceData, setServiceData] = useState({
        name: '',
        description: '',
        category: '',
        price: 0,
        duration: 0,
        availability: '',
        deliveryMethod: '',
        requirements: ''
    });

    const onOpenCategoryModal = () => {
        setIsCategoryModalOpen(true)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setServiceData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSelectChange = (name: string) => (value: string) => {
        setServiceData(prev => ({
            ...prev,
            [name]: value
        }));
    };





    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const formData = {
            ...serviceData,
            images
        };
        onSubmit(formData);
    };

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>New Service</CardTitle>
                    <CardDescription>Enter the details for the new service</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="service-name">Service Name *</Label>
                            <Input
                                id="service-name"
                                placeholder="Enter service name"
                                name="name"
                                value={serviceData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="service-description">Description *</Label>
                        <Textarea
                            id="service-description"
                            placeholder="Enter service description"
                            className="min-h-[100px]"
                            name="description"
                            value={serviceData.description}
                            onChange={handleInputChange}
                            required
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
                                        <SelectItem value="web-development">Web Development</SelectItem>
                                        <SelectItem value="consulting">Consulting</SelectItem>
                                        <SelectItem value="design">Design</SelectItem>
                                        <SelectItem value="accounting">Accounting & Tax</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button variant="ghost" size="icon" className="ml-2" onClick={onOpenCategoryModal}>
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="service-price">Price *</Label>
                            <Input
                                id="service-price"
                                type="number"
                                placeholder="Enter price"
                                name="price"
                                value={serviceData.price}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="service-duration">Duration (hours) *</Label>
                            <Input
                                id="service-duration"
                                type="number"
                                placeholder="Enter duration"
                                name="duration"
                                value={serviceData.duration}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="service-availability">Availability *</Label>
                            <Select name="availability" onValueChange={handleSelectChange('availability')} required>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select availability" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="always">Always Available</SelectItem>
                                    <SelectItem value="scheduled">Scheduled Only</SelectItem>
                                    <SelectItem value="limited">Limited Availability</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="service-delivery-method">Delivery Method *</Label>
                        <Select name="deliveryMethod" onValueChange={handleSelectChange('deliveryMethod')} required>
                            <SelectTrigger>
                                <SelectValue placeholder="Select delivery method" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="online">Online</SelectItem>
                                <SelectItem value="in-person">In-Person</SelectItem>
                                <SelectItem value="hybrid">Hybrid</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="service-requirements">Requirements or Prerequisites</Label>
                        <Textarea
                            id="service-requirements"
                            placeholder="Enter any requirements or prerequisites for the service"
                            className="min-h-[100px]"
                            name="requirements"
                            value={serviceData.requirements}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Service Image (Optional)</Label>
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
                                    onChange={handleImageUpload}
                                />
                            </label>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <div className="mt-6 flex justify-end space-x-4">
                <Button variant="outline" onClick={() => router.back()}>
                    Cancel
                </Button>
                <Button type="submit" onClick={handleSubmit}>
                    {serviceLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        "Save Service"
                    )}
                </Button>
            </div>
            <NewCategoryModal isOpen={isCategoryModalOpen} onClose={() => setIsCategoryModalOpen(false)} />
        </>
    );
}
