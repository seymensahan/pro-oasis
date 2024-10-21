import { useEffect, useState, useTransition } from "react";
import { collection, addDoc, getDocs, onSnapshot } from "firebase/firestore"; // Firestore functions
import { ModalBehavior, useModal } from "@/hooks/useModal";
import { OptionsSelect } from "@/lib/utils";
import { firestore } from "@/firebase/config";

export interface UseAddProductBrandBehaviour {
  addBrandModal: ModalBehavior;
  productBrand?: string;
  handleChangeProductBrand: (value: string) => void;
  allprodutsBrands: OptionsSelect[];
  isPending: boolean;
  addNewProductBrand: () => void;
  cancelAddNewProductBrand: () => void;
}

export const useAddProductBrand = (): UseAddProductBrandBehaviour => {
  const addBrandModal = useModal();

  const [productBrand, setProductBrand] = useState<string>();

  const [allprodutsBrands, setAllProdutsBrands] = useState<OptionsSelect[]>([]);

  const [isPending, startTransition] = useTransition();

  const handleChangeProductBrand = (value: string) => {
    setProductBrand(value);
  };

  const addNewProductBrand = async () => {
    startTransition(async () => {
      try {
        await addDoc(collection(firestore, "products-brands"), {
          name: productBrand,
          description: "",
        });
        // Fetch updated brands immediately after adding a new brand
        await getAllProductBrands();
        setProductBrand(undefined);
        addBrandModal.close();
      } catch (error) {
        console.error("Error adding brand: ", error);
      }
    });
  };

  const cancelAddNewProductBrand = () => {
    setProductBrand(undefined);
    addBrandModal.close();
  };

  const getAllProductBrands = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(firestore, "products-brands")
      );
      const brands = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        ...doc.data(),
      }));

      const formattedbrands = brands.map((brand) => ({
        id: brand.id,
        text: brand.name,
        value: brand.id,
      }));
      setAllProdutsBrands([
        { id: "", text: "sélectionner une marque", value: "" },
        ...formattedbrands,
      ]);
    } catch (error) {
      console.error("Error fetching brands: ", error);
    }
  };

  useEffect(() => {
    getAllProductBrands();

    // Realtime updates
    const unsubscribe = onSnapshot(
      collection(firestore, "products-brands"),
      () => {
        getAllProductBrands();
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return {
    addBrandModal,
    productBrand,
    handleChangeProductBrand,
    allprodutsBrands,
    addNewProductBrand,
    cancelAddNewProductBrand,
    isPending,
  };
};
