import { Dispatch, SetStateAction, useState } from "react";

export interface ModalBehavior {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  open: () => void;
  close: () => void;
}

export const useModal = (): ModalBehavior => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  return {
    isOpen,
    setIsOpen,
    open: openModal,
    close: closeModal,
  };
};
