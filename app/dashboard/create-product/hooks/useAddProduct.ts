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

export interface UseAddProductBehaviour {
  addProductBrandBehaviour: UseAddProductBrandBehaviour;
  addProductCategoryBehaviour: UseAddProductCategoryBehaviour;
  addProductUnitBehaviour: UseAddProductUnitbehaviour;
  addSupplierBehaviour: UseAddSupplierBehaviour;
}

export const useAddProduct = (): UseAddProductBehaviour => {
  const addProductBrandBehaviour = useAddProductBrand();
  const addProductCategoryBehaviour = useAddProductCategory();
  const addProductUnitBehaviour = useAddProductUnit();
  const addSupplierBehaviour = useAddSupplier();

  return {
    addProductBrandBehaviour,
    addProductCategoryBehaviour,
    addProductUnitBehaviour,
    addSupplierBehaviour,
  };
};
