import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type OptionsSelect = {
  text: string;
  value: string;
  id: string;
};

export const ERROR_MESSAGE =
  "une erreur s'est produite lors du traitement de votre requête";
