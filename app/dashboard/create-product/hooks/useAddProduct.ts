import { AddProductFormInputs } from "../validators/AddProductInputs";
import {
  useAddProductBrand,
  UseAddProductBrandBehaviour,
} from "./useAddProductBrand";
import {
  useAddProductCategory,
  UseAddProductCategoryBehaviour,
} from "./useAddProductCategory";
import {
  useAddProductUnit,
  UseAddProductUnitbehaviour,
} from "./useAddProductUnit";
import { useAddSupplier, UseAddSupplierBehaviour } from "./useAddSupplier";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addProductInputsSchemaValidate } from "../validators/addProductInputsSchemaValidate";
import { ERROR_MESSAGE, OptionsSelect } from "@/lib/utils";
import { toast } from "react-toastify";
import { useState, useTransition } from "react";
import { addDoc, collection } from "firebase/firestore";
import { firestore, storage } from "@/firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export interface UseAddProductBehaviour {
  addProductBrandBehaviour: UseAddProductBrandBehaviour;
  addProductCategoryBehaviour: UseAddProductCategoryBehaviour;
  addProductUnitBehaviour: UseAddProductUnitbehaviour;
  addSupplierBehaviour: UseAddSupplierBehaviour;
  form: UseFormReturn<AddProductFormInputs>;
  isPending: boolean;
}

export const useAddProduct = (): UseAddProductBehaviour => {
  const addProductBrandBehaviour = useAddProductBrand();
  const addProductCategoryBehaviour = useAddProductCategory();
  const addProductUnitBehaviour = useAddProductUnit();
  const addSupplierBehaviour = useAddSupplier();

  const [isPending, startTransition] = useTransition();

  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>();

  const form = useForm<AddProductFormInputs>({
    resolver: zodResolver(addProductInputsSchemaValidate()),
  });

  const selectedProductCategory = (): OptionsSelect => {
    return (
      addProductCategoryBehaviour.produtCategories.find(
        (option) => option.value === form.watch("productCategory")
      ) ?? addProductCategoryBehaviour.produtCategories[0]
    );
  };

  const selectedProductBrand = (): OptionsSelect => {
    return (
      addProductBrandBehaviour.allprodutsBrands.find(
        (option) => option.value === form.watch("productBrand")
      ) ?? addProductBrandBehaviour.allprodutsBrands[0]
    );
  };

  const selectedProductUnit = (): OptionsSelect => {
    return (
      addProductUnitBehaviour.allprodutsUnits.find(
        (option) => option.value === form.watch("unit")
      ) ?? addProductUnitBehaviour.allprodutsUnits[0]
    );
  };

  const selectedSupplier = (): OptionsSelect => {
    return (
      addSupplierBehaviour.allSuppliers.find(
        (option) => option.value === form.watch("supplier")
      ) ?? addSupplierBehaviour.allSuppliers[0]
    );
  };

  const clearForm = () => {
    form.reset({
      alertQuantity: "",
      description: "",
      expireDate: "",
      manufacturedDate: "",
      price: "",
      productBrand: "",
      productCategory: "",
      productName: "",
      quantity: "",
      supplier: "",
      unit: "",
    });
  };

  const handleUpload = async () => {
    if (!image) return;

    const fileExt = image.name.split(".").pop(); // Get the file extension
    const fileName = `${Math.random()}.${fileExt}`; // Create a random file name
    const filePath = `images/${fileName}`; // Define the file path in storage

    const storageRef = ref(storage, filePath); // Create a reference to the file location

    try {
      // Upload the file
      await uploadBytes(storageRef, image);

      // Get the public URL after upload
      const url = await getDownloadURL(storageRef);
      setImageUrl(url); // Set the image URL in your state
      return url; // Return the URL
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const saveProduct = async (data: AddProductFormInputs) => {
    startTransition(async () => {
      try {
        const newProductRef = await addDoc(collection(firestore, "products"), {
          productname: data.productName,
          productcategory: selectedProductCategory().text,
          productbrand: selectedProductBrand().text,
          description: data.description,
          quantity: +data.quantity,
          price: +data.price,
          alertquantity: +data.alertQuantity,
          unit: selectedProductUnit().text,
          supplier: selectedSupplier().text,
          imageUrl: "",
          manufactureddate:
            data.manufacturedDate === "" ? null : data.manufacturedDate,
          expiredate: data.expireDate === "" ? null : data.expireDate,
        });

        // Optionally, you can log the new product ID or other info if needed
        console.log("Product added with ID:", newProductRef.id);

        // Clear the form and show success notification
        clearForm();
        toast("Produit enregistré avec succès");
      } catch (error) {
        toast.error(ERROR_MESSAGE);
        console.error("Error adding product: ", error);
      }
    });
  };

  return {
    addProductBrandBehaviour,
    addProductCategoryBehaviour,
    addProductUnitBehaviour,
    addSupplierBehaviour,
    form,
    isPending,
  };
};
