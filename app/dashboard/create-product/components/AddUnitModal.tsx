import React from "react";
import { UseAddProductUnitbehaviour } from "../hooks/useAddProductUnit";
import GenericModal from "@/lib/GenericModal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const AddUnitModal = ({
  addProductUnitBehaviour,
}: {
  addProductUnitBehaviour: UseAddProductUnitbehaviour;
}) => {
  const {
    addUnitModal,
    cancelAddNewProductUnit,
    isPending,
    handleChangeProductUnit,
    addNewProductUnit,
  } = addProductUnitBehaviour;

  return (
    <GenericModal
      title="Ajouter une nouvelle unité"
      isOpen={addUnitModal.isOpen}
      onClose={cancelAddNewProductUnit}
    >
      <form className="mt-9" action="">
        <Input
          name="unitName"
          onChange={(e) => handleChangeProductUnit(e.target.value)}
          type="text"
          className="w-[400px]"
        />
        <div className="flex items-center justify-center gap-2 mt-6">
          <Button
            disabled={isPending}
            color="error"
            onClick={cancelAddNewProductUnit}
          >
            Annuler
          </Button>
          <Button
            disabled={isPending}
            onClick={addNewProductUnit}
            color="secondary"
          >
            Enregistrer
          </Button>
        </div>
      </form>
    </GenericModal>
  );
};

export default AddUnitModal;
