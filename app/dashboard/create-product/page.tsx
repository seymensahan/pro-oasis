"use client";
import InputForm from "@/app/components/forms/InputForm";
import InputSelect from "@/app/components/forms/InputSelect";
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Textarea,
} from "@headlessui/react";
import {
    ArrowLeft,
    ChevronDown,
    Info,
    PlusCircle,
} from "lucide-react"; 
import { Button } from "@/app/components/ui/Button"; 
import React from "react";
import { useAddProduct } from "./useAddProduct";
import AddProductCategoryModal from "./components/AddProductCategoryModal";
import AddBrandModal from "./components/AddBrandModal";
import AddUnitModal from "./components/AddUnitModal";
import InputDate from "@/app/components/forms/InputDate";
import Loader from "@/app/components/Loader";
import { useRouter } from "next/navigation";

const Page = () => {
    const router = useRouter();
    const addProductBehaviour = useAddProduct();

    const {
        form,
        saveProduct,
        addProductBrandBehaviour,
        addProductCategoryBehaviour,
        addProductUnitBehaviour,
        isPending,
    } = addProductBehaviour;

    const { addBrandModal, allprodutsBrands } = addProductBrandBehaviour;
    const { addCategoryModal, produtCategories } = addProductCategoryBehaviour;
    const { addUnitModal, allprodutsUnits } = addProductUnitBehaviour;

    const { register, formState, handleSubmit } = form;
    const { errors } = formState;

    return (
        <section className="p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-primary text-xl font-bold">New product</h1>
                    <p className="text-secondary-text text-sm pt-1">Add new product</p>
                </div>
                <div className="flex items-center gap-3.5">
                    <Button
                        onClick={() => router.push("/dashboard/products")}
                        variant="primary" // Changed to shadcn button variant
                        startIcon={<ArrowLeft className="size-4" />} // Updated icon
                    >
                        Back to products
                    </Button>
                </div>
            </div>
            <form className="mt-6" onSubmit={handleSubmit(saveProduct)}>
                <div className="p-5 border border-tertiary rounded">
                    <Disclosure as="div" defaultOpen={true}>
                        <DisclosureButton className="group flex w-full items-center justify-between border-b border-tertiary p-4">
                            <div className="flex items-center gap-2">
                                <Info className="size-4 text-secondary" /> {/* Updated icon */}
                                <p className="text-primary font-medium">Product information</p>
                            </div>
                            <div className="size-5 border border-primary rounded-full flex items-center justify-between text-primary">
                                <ChevronDown />
                            </div>
                        </DisclosureButton>
                        <DisclosurePanel className="p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-4">
                                <InputForm
                                    type="text"
                                    name="productName"
                                    label="Product Name"
                                    required
                                    className="w-full"
                                    registerValidate={register}
                                    onChange={(e: ) => {
                                        form.setValue("productName", e.target.value);
                                    }}
                                    errorMessage={errors.productName?.message}
                                />
                                <div className="flex flex-col items-start w-full">
                                    <div className="flex items-center justify-between mb-1 w-full">
                                        <p className="text-secondary-text font-medium text-sm after:content-['*'] after:ml-0.5 after:text-red-600">
                                            Category
                                        </p>
                                        <button
                                            type="button" // Added type attribute for button
                                            onClick={addCategoryModal.open}
                                            className="flex items-center gap-2 text-secondary-text hover:text-secondary transition-all duration-300 ease-linear"
                                        >
                                            <PlusCircle className="size-4" /> {/* Updated icon */}
                                            <p className="text-sm font-semibold">Add new</p>
                                        </button>
                                    </div>
                                    <InputSelect
                                        required
                                        options={produtCategories}
                                        className="w-full"
                                        onChange={(e) => {
                                            form.setValue("productCategory", e.value);
                                        }}
                                        errorMessage={errors.productCategory?.message}
                                    />
                                </div>
                                <div className="flex flex-col items-start w-full">
                                    <div className="flex items-center justify-between mb-1 w-full">
                                        <p className="text-secondary-text font-medium text-sm after:content-['*'] after:ml-0.5 after:text-red-600">
                                            Brand
                                        </p>
                                        <button
                                            type="button" // Added type attribute for button
                                            onClick={addBrandModal.open}
                                            className="flex items-center gap-2 text-secondary-text hover:text-secondary transition-all duration-300 ease-linear"
                                        >
                                            <PlusCircle className="size-4" /> {/* Updated icon */}
                                            <p className="text-sm font-semibold">Add new</p>
                                        </button>
                                    </div>
                                    <InputSelect
                                        required
                                        options={allprodutsBrands}
                                        className="w-full"
                                        onChange={(e) => {
                                            form.setValue("productBrand", e.value);
                                        }}
                                        errorMessage={errors.productBrand?.message}
                                    />
                                </div>
                                <div className="col-span-2 w-full">
                                    <p className="text-secondary-text font-medium text-sm after:content-['*'] after:ml-0.5 after:text-red-600 mb-1">
                                        Description
                                    </p>
                                    <Textarea
                                        {...register("description", { required: true })}
                                        onChange={(e) => {
                                            form.setValue("description", e.target.value);
                                        }}
                                        className="border border-tertiary p-3 rounded w-full outline-primary text-primary-text"
                                    />
                                    {errors.description?.message && (
                                        <div className="w-full">
                                            <span className=" text-xs text-red-600">
                                                {errors.description.message}
                                            </span>
                                        </div>
                                    )}
                                    <p className="text-secondary-text font-medium text-xs">
                                        Max 60 characters
                                    </p>
                                </div>
                            </div>
                        </DisclosurePanel>
                    </Disclosure>
                    <Disclosure as="div" defaultOpen={true}>
                        <DisclosureButton className="group flex w-full items-center justify-between border-b border-tertiary p-4">
                            <div className="flex items-center gap-2">
                                <Info className="size-4 text-secondary" /> {/* Updated icon */}
                                <p className="text-primary font-medium">Pricing & Stocks</p>
                            </div>
                            <div className="size-5 border border-primary rounded-full flex items-center justify-between text-primary">
                                <ChevronDown />
                            </div>
                        </DisclosureButton>
                        <DisclosurePanel className="p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-4">
                                <InputForm
                                    type="text"
                                    name="quantity"
                                    label="Quantity"
                                    required
                                    className="w-full"
                                    registerValidate={register}
                                    onChange={(e) => {
                                        form.setValue("quantity", e.target.value);
                                    }}
                                    errorMessage={errors.quantity?.message}
                                />
                                <InputForm
                                    type="text"
                                    name="price"
                                    label="Price"
                                    required
                                    className="w-full"
                                    registerValidate={register}
                                    onChange={(e) => {
                                        form.setValue("price", e.target.value);
                                    }}
                                    errorMessage={errors.price?.message}
                                />
                                <InputForm
                                    type="text"
                                    name="alertQuantity"
                                    label="Alert Quantity"
                                    required
                                    className="w-full"
                                    registerValidate={register}
                                    onChange={(e) => {
                                        form.setValue("alertQuantity", e.target.value);
                                    }}
                                    errorMessage={errors.alertQuantity?.message}
                                />
                                <div className="flex flex-col items-start w-full">
                                    <div className="flex items-center justify-between mb-1 w-full">
                                        <p className="text-secondary-text font-medium text-sm after:content-['*'] after:ml-0.5 after:text-red-600">
                                            Unit
                                        </p>
                                        <button
                                            type="button" // Added type attribute for button
                                            onClick={addUnitModal.open}
                                            className="flex items-center gap-2 text-secondary-text hover:text-secondary transition-all duration-300 ease-linear"
                                        >
                                            <PlusCircle className="size-4" /> {/* Updated icon */}
                                            <p className="text-sm font-semibold">Add new</p>
                                        </button>
                                    </div>
                                    <InputSelect
                                        required
                                        options={allprodutsUnits}
                                        className="w-full"
                                        onChange={(e) => {
                                            form.setValue("unit", e.value);
                                        }}
                                        errorMessage={errors.unit?.message}
                                    />
                                </div>
                            </div>
                        </DisclosurePanel>
                    </Disclosure>
                    <Disclosure as="div" defaultOpen={true}>
                        <DisclosureButton className="group flex w-full items-center justify-between border-b border-tertiary p-4">
                            <div className="flex items-center gap-2">
                                <Info className="size-4 text-secondary" /> {/* Updated icon */}
                                <p className="text-primary font-medium">Custom Fields</p>
                            </div>
                            <div className="size-5 border border-primary rounded-full flex items-center justify-between text-primary">
                                <ChevronDown />
                            </div>
                        </DisclosureButton>
                        <DisclosurePanel className="p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-4">
                                <InputDate
                                    label="Manufactured Date"
                                    name="manufacturedDate"
                                    className="w-full"
                                    registerValidate={register}
                                    errorMessage={errors.manufacturedDate?.message}
                                />
                                <InputDate
                                    label="Expiry On"
                                    name="expireDate"
                                    className="w-full"
                                    registerValidate={register}
                                    errorMessage={errors.expireDate?.message}
                                />
                            </div>
                        </DisclosurePanel>
                    </Disclosure>
                </div>
                <div className="flex items-center gap-4 justify-end py-5">
                    <Button
                        disabled={isPending}
                        type="submit"
                        variant="secondary" // Changed to shadcn button variant
                        startIcon={
                            isPending && (
                                <Loader className="size-5 text-tertiary fill-secondary" />
                            )
                        }
                    >
                        Save Product
                    </Button>
                </div>
            </form>
            <AddProductCategoryModal
                addProductCategoryBehaviour={addProductCategoryBehaviour}
            />
            <AddBrandModal addProductBrandBehaviour={addProductBrandBehaviour} />
            <AddUnitModal addProductUnitBehaviour={addProductUnitBehaviour} />
        </section>
    );
};

export default Page;
