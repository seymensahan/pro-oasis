import React from 'react';
import { Button } from '@/components/ui/button';
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Store } from '../page';
import { createStore } from '@/app/actions/store';
import { useFormState } from 'react-dom';
import { Progress } from '@/components/ui/progress';
import useProduct from '@/app/dashboard/create-product/hooks/useProduct';
import { Upload } from 'lucide-react';

const StoreModal = ({ editingStore }: { editingStore?: Store }) => {
    const [state, action] = useFormState(createStore, undefined);
    const { images, handleImageRemove, handleImageUpload } = useProduct();

    return (
        <DialogContent className="container max-w-5xl h-[80%] rounded-lg shadow-lg p-6 bg-white">
            <DialogHeader className="mb-6">
                <DialogTitle className="text-2xl font-bold text-gray-800">
                    {editingStore ? 'Edit Store' : 'Create New Store'}
                </DialogTitle>
                <DialogDescription className="text-sm text-gray-600">
                    {editingStore
                        ? 'Make changes to your store here.'
                        : 'Add the details of your new store here.'}
                </DialogDescription>
            </DialogHeader>
            <form action={action} className="space-y-6">
                <div className="space-y-2">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="name" className="text-gray-700 font-medium">
                            Name
                        </Label>
                        <Input
                            id="name"
                            name="name"
                            className="rounded-lg border-gray-300 focus:ring focus:ring-blue-300 focus:outline-none"
                            required
                        />
                        {state?.errors?.name && (
                            <p className="text-sm text-red-500">{state.errors.name}</p>
                        )}
                    </div>


                    <div className="flex flex-col gap-2">
                        <Label htmlFor="address" className="text-gray-700 font-medium">
                            Address
                        </Label>
                        <Input
                            id="address"
                            name="address"
                            className="rounded-lg border-gray-300 focus:ring focus:ring-blue-300 focus:outline-none"
                            required
                        />
                        {state?.errors?.address && (
                            <p className="text-sm text-red-500">{state.errors.address}</p>
                        )}
                    </div>

                    {/* <div className="flex flex-col gap-2">
                        <Label htmlFor="address" className="text-gray-700 font-medium">
                            Schedule
                        </Label>
                        <div className="flex space-x-2">
                            <Input
                                id="address"
                                name="address"
                                className="rounded-lg border-gray-300 focus:ring focus:ring-blue-300 focus:outline-none"
                                required
                            />
                            <Input
                                id="address"
                                name="address"
                                className="rounded-lg border-gray-300 focus:ring focus:ring-blue-300 focus:outline-none"
                                required
                            />
                        </div>
                        {state?.errors?.address && (
                            <p className="text-sm text-red-500">{state.errors.address}</p>
                        )}
                    </div> */}

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="description" className="text-gray-700 font-medium">
                            Description
                        </Label>
                        <Textarea
                            id="description"
                            name="description"
                            className="rounded-lg border-gray-300 focus:ring focus:ring-blue-300 focus:outline-none"
                            required
                        />
                        {state?.errors?.description && (
                            <p className="text-sm text-red-500">{state.errors.description}</p>
                        )}
                    </div>

                    {/* <div className="space-y-4">
                        <Label htmlFor="images" className="text-gray-700 font-medium">
                            Upload Images
                        </Label>
                        <div className="grid grid-cols-2 gap-4">
                            {images.map((image, index) => (
                                <div key={index} className="relative group">
                                    {image.url ? (
                                        <img
                                            src={image.url}
                                            alt={`Uploaded ${index}`}
                                        />
                                    ) : (
                                        <Progress
                                            value={image.progress}
                                            className="w-full h-4 rounded bg-gray-200"
                                        />
                                    )}
                                    <button
                                        type="button"
                                        onClick={() => handleImageRemove(index)}
                                        className="absolute top-2 right-2 text-red-500 hover:text-red-600"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                            <label className="flex items-center justify-center h-20 w-40 border-2 border-dashed rounded-lg bg-gray-50 cursor-pointer hover:border-blue-400">
                                <div className=" flex flex-col items-center justify-center text-center">
                                    <Upload className="h-8 w-8 text-gray-400" />
                                    <span className="mt-2 block text-sm text-gray-500">
                                        Upload Image
                                    </span>
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
                    </div> */}
                </div>

                <DialogFooter>
                    <Button
                        className="w-full py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                        type="submit"
                    >
                        {editingStore ? 'Save Changes' : 'Create Store'}
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    );
};

export default StoreModal;
