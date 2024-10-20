import { useState, useEffect, useTransition } from "react";
import { collection, addDoc, getDocs, onSnapshot } from "firebase/firestore";
import { useModal, ModalBehavior } from "../hooks/useModal"; // Corrected import path
import { firestore } from "../firebase/config"; // Corrected Firestore instance

export interface OptionsSelect {
  id: string;
  text: string;
  value: string;
}

export interface UseAddProductBrandFirebaseBehaviour {
  addBrandModal: ModalBehavior;
  productBrand?: string;
  handleChangeProductBrand: (value: string) => void;
  allProductBrands: OptionsSelect[];
  isPending: boolean;
  addNewProductBrand: () => void;
  cancelAddNewProductBrand: () => void;
}

export const useAddProductBrandFirebase = (): UseAddProductBrandFirebaseBehaviour => {
  const addBrandModal = useModal();
  const [productBrand, setProductBrand] = useState<string>();
  const [allProductBrands, setAllProductBrands] = useState<OptionsSelect[]>([]);
  const [isPending, startTransition] = useTransition();

  const handleChangeProductBrand = (value: string) => {
    setProductBrand(value);
  };

  const addNewProductBrand = () => {
    startTransition(async () => {
      try {
        // Add the new brand to Firebase
        await addDoc(collection(firestore, "product-brands"), {
          name: productBrand,
          description: "",
        });
        // Fetch updated brands immediately after adding
        await fetchAllProductBrands();
        setProductBrand(undefined);
        addBrandModal.close();
      } catch (error) {
        console.error("Error adding new product brand: ", error);
      }
    });
  };

  const cancelAddNewProductBrand = () => {
    setProductBrand(undefined);
    addBrandModal.close();
  };

  const fetchAllProductBrands = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, "product-brands"));
      const brands = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        text: doc.data().name,
        value: doc.id,
      }));
      setAllProductBrands([{ id: "", text: "Select a brand", value: "" }, ...brands]);
    } catch (error) {
      console.error("Error fetching product brands: ", error);
    }
  };

  useEffect(() => {
    // Initial fetch of brands
    fetchAllProductBrands();

    // Subscribe to Firebase real-time updates
    const unsubscribe = onSnapshot(collection(firestore, "product-brands"), fetchAllProductBrands);

    return () => {
      unsubscribe();
    };
  }, []);

  return {
    addBrandModal,
    productBrand,
    handleChangeProductBrand,
    allProductBrands,
    addNewProductBrand,
    cancelAddNewProductBrand,
    isPending,
  };
};