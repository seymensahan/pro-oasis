import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormData, Supply, SupplyDataProps } from '@/lib/Types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import useSaveSupply from '../hooks/useSaveSupply';
import useGetProducts from '../../product/hooks/useGetProducts';

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


    const { saveSupply } = useSaveSupply()

    useEffect(() => {
        // Check if all required fields are filled
        const isFilled = formData.productName && formData.quantityPurchased && formData.supplier;
        setIsFormValid(!!isFilled);
    }, [formData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid) return;

        await saveSupply(formData)
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
                                required value={selectedProduct ?? undefined}
                                onValueChange={handleProductChange}
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
                                            {/* {category?.map((category) => (
                                                <SelectItem key={category.id} value={category.name}>
                                                    {category.name}
                                                </SelectItem>
                                            ))} */}
                                            <SelectItem value="jons">Jons</SelectItem>
                                            <SelectItem value="jacjy">Jacjy</SelectItem>
                                            <SelectItem value="brice">Brice</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {/* onClick={onOpenCategoryModal} */}
                                    <Button variant="ghost" size="icon" className="ml-2" >
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" className='bg-blue-800 hover:bg-blue-500' disabled={!isFormValid}>
                            {selectedSupply ? 'Update' : 'Add'} Supply
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog >
    );
}
