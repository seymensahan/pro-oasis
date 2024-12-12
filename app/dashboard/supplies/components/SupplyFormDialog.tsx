import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormData, Supply, SupplyDataProps } from '@/lib/Types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState, useEffect } from 'react';
import { Loader2, Plus } from 'lucide-react';
import useSaveSupply from '../hooks/useSaveSupply';
import useGetProducts from '../../product/hooks/useGetProducts';
import useGetSupplier from '../../suppliers/hooks/useGetSupplier';
import Link from 'next/link';
import { toast } from 'react-toastify';

type SupplyFormDialogProps = {
    isOpen: boolean;
    onClose: () => void;
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
    selectedSupply: SupplyDataProps | null;
};

export default function SupplyFormDialog({
    isOpen,
    onClose,
    formData,
    setFormData,
    selectedSupply
}: SupplyFormDialogProps) {
    const [isFormValid, setIsFormValid] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
    const { getProductByName, selectedProductData, products } = useGetProducts();
    const { supplier } = useGetSupplier()
    const [loading, setLoading] = useState(false)


    const { saveSupply } = useSaveSupply()

    useEffect(() => {
        // Check if all required fields are filled
        const isFilled = formData.productName && formData.quantityPurchased && formData.supplier;
        setIsFormValid(!!isFilled);
    }, [formData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid) return;

        try {
            setLoading(true)
            await saveSupply(formData)
        } catch (error: any) {
            toast.error("An error occured trying to make the order")
        } finally {
            setLoading(false)
        }

        // console.log(formData);
        onClose();
    };

    const handleProductChange = (value: string) => {
        formData.productName = value
        setSelectedProduct(value);
        getProductByName(value); // Fetch product details
    };


    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{selectedSupply ? 'Edit Supply' : 'Add New Supply'}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className=" items-center gap-4">
                            <Label htmlFor="productName" className="text-right">Product Name (Please create the product first if not found)</Label>
                            <Select
                                name="product"
                                onValueChange={handleProductChange}
                                value={formData.productName}
                                // onValueChange={(value) => setFormData({ ...formData, productName: value })}
                                required
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Choose"
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    {products?.map((product) => (
                                        <SelectItem key={product.id} value={product.name}>
                                            {product.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className=" items-center gap-4">
                            <Label htmlFor="quantityPurchased" className="text-right">Quantity</Label>
                            <Input
                                id="quantityPurchased"
                                type="number"
                                value={formData.quantityPurchased}
                                onChange={(e) => setFormData({ ...formData, quantityPurchased: e.target.value })}
                                placeholder="Enter quantity"
                                className="col-span-3"
                                min={1}
                                required
                            />
                        </div>
                        <div className="flex items-center ">
                            <div className="w-full">
                                <Label htmlFor="product-category">Supplier *</Label>
                                <div className="flex items-center">
                                    <Select
                                        value={formData.supplier}
                                        onValueChange={(value) => setFormData({ ...formData, supplier: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {supplier?.map((supplier) => (
                                                <SelectItem key={supplier.id} value={supplier.name}>
                                                    {supplier.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {/* onClick={onOpenCategoryModal} */}
                                    <Link href="./suppliers">
                                        <Button variant="ghost" size="icon" className="ml-2" >
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center ">
                            <div className="w-full">
                                <Label htmlFor="product-category">Status *</Label>
                                <div className="flex items-center">
                                    <Select
                                        value={formData.status}
                                        onValueChange={(value) => setFormData({ ...formData, status: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="delivered">Delivered</SelectItem>
                                            <SelectItem value="partially delivered">Partially Delivered</SelectItem>
                                            <SelectItem value="not delivered">Not Deliverd</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            type="submit"
                            className="bg-blue-800 hover:bg-blue-500"
                            disabled={!isFormValid || loading}
                        >
                            {loading ? (
                                <Loader2 className="animate-spin" />
                            ) : (
                                `${selectedSupply ? 'Update' : 'Add'} Supply`
                            )}
                        </Button>

                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog >
    );
}
