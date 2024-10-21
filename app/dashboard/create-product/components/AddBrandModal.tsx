import React from "react";
import { UseAddProductBrandBehaviour } from "../hooks/useAddProductBrand";
import { Loader } from "lucide-react";
import GenericModal from "@/lib/GenericModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AddBrandModal = ({
  addProductBrandBehaviour,
}: {
  addProductBrandBehaviour: UseAddProductBrandBehaviour;
}) => {
  const {
    addBrandModal,
    handleChangeProductBrand,
    addNewProductBrand,
    cancelAddNewProductBrand,
    isPending,
  } = addProductBrandBehaviour;

  return (
    <GenericModal
      title="Ajouter une nouvelle marque"
      isOpen={addBrandModal.isOpen}
      onClose={cancelAddNewProductBrand}
    >
      <form className="mt-9" action="">
        <Input
          name="brandName"
          onChange={(e) => handleChangeProductBrand(e.target.value)}
          type="text"
          className="w-[400px]"
        />
        <div className="flex items-center justify-center gap-2 mt-6">
          <Button disabled={isPending} onClick={cancelAddNewProductBrand}>
            Annuler
          </Button>
          <Button disabled={isPending} onClick={addNewProductBrand}>
            Enregistrer
          </Button>
        </div>
      </form>
    </GenericModal>
  );
};

export default AddBrandModal;
