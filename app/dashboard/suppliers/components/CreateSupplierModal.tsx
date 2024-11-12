import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SupplierModalProps } from '@/lib/Types';
import React, { useEffect, useState } from 'react'
import useSaveSupplier from '../hooks/useSaveSupplier';
import { Loader2 } from 'lucide-react';


type SupplyFormDialogProps = {
    isOpen: boolean;
    onClose: () => void;
};

const CreateSupplierModal = ({ isOpen,
    onClose }: SupplyFormDialogProps) => {
    const [isFormValid, setIsFormValid] = useState(false);
    const { saveSupplier, loading } = useSaveSupplier()


    const [formData, setFormData] = useState<SupplierModalProps>({
        name: "",
        productName: "",
        contact: '',
        email: '',
        website: ''
    });

    useEffect(() => {
        // Check if all required fields are filled
        const isFilled = formData.productName && formData.contact;
        setIsFormValid(!!isFilled);
    }, [formData]);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid) return;

        await saveSupplier(formData)
        // console.log(formData);
        onClose();
    };


    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New Supplier</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">Name *</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">Supplied product *</Label>
                            <Input
                                id="productName"
                                value={formData.productName}
                                onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="contact" className="text-right">Contact *</Label>
                            <Input
                                id="contact"
                                value={formData.contact}
                                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="website" className="text-right">Website</Label>
                            <Input
                                id="website"
                                value={formData.website}
                                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button className='bg-blue-400 hover-bg-blue-500'
                            disabled={loading}
                            type="submit"
                        >
                            {loading ? (
                                <Loader2 className='animate-spin' />
                            ) : (
                                "Add Supplier"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateSupplierModal