import React from "react";
import { UseAddSupplierBehaviour } from "../hooks/useAddSupplier";
import GenericModal from "@/lib/GenericModal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const AddSupplierModal = ({
  addSupplierBehaviour,
}: {
  addSupplierBehaviour: UseAddSupplierBehaviour;
}) => {
  const {
    addNewSupplier,
    addSupplierModal,
    cancelAddNewSupplier,
    isPending,
    handleChangeSupplier,
  } = addSupplierBehaviour;

  return (
    <GenericModal
      title="Ajouter un nouveau fournisseur"
      isOpen={addSupplierModal.isOpen}
      onClose={cancelAddNewSupplier}
    >
      <form className="mt-9" action="">
        <Input
          name="unitName"
          onChange={(e) => handleChangeSupplier(e.target.value)}
          type="text"
          className="w-[400px]"
        />
        <div className="flex items-center justify-center gap-2 mt-6">
          <Button
            disabled={isPending}
            color="error"
            onClick={cancelAddNewSupplier}
          >
            Annuler
          </Button>
          <Button
            disabled={isPending}
            onClick={addNewSupplier}
            color="secondary"
          >
            Enregistrer
          </Button>
        </div>
      </form>
    </GenericModal>
  );
};

export default AddSupplierModal;
