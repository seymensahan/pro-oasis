import React from "react";
import { UseAddProductCategoryBehaviour } from "../hooks/useAddProductCategory";
import { Input } from "@/components/ui/input";
import GenericModal from "@/lib/GenericModal";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

const AddProductCategoryModal = ({
  addProductCategoryBehaviour,
}: {
  addProductCategoryBehaviour: UseAddProductCategoryBehaviour;
}) => {
  const {
    addCategoryModal,
    handleChangeProductCategory,
    addNewProductCategory,
    isPending,
    cancelAddNewProductCategory,
  } = addProductCategoryBehaviour;

  return (
    <GenericModal
      title="Ajouter une nouvelle catégorie"
      isOpen={addCategoryModal.isOpen}
      onClose={cancelAddNewProductCategory}
    >
      <form className="mt-9" action="">
        <Input
          name="categoryName"
          onChange={(e) => handleChangeProductCategory(e.target.value)}
          type="text"
          className="w-[400px]"
        />
        <div className="flex items-center justify-center gap-2 mt-6">
          <Button
            disabled={isPending}
            color="error"
            onClick={cancelAddNewProductCategory}
          >
            Annuler
          </Button>
          <Button
            disabled={isPending}
            onClick={addNewProductCategory}
            color="secondary"
          >
            Enregistrer
          </Button>
        </div>
      </form>
    </GenericModal>
  );
};

export default AddProductCategoryModal;
