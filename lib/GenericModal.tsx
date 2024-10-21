import { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { twMerge } from "tailwind-merge";
import { XCircleIcon } from "lucide-react";

interface OwnProps {
  title?: string;
  children: ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
  titleClassName?: string;
  description?: string;
}

const GenericModal = ({
  title,
  className,
  children,
  isOpen,
  onClose,
  titleClassName,
  description,
}: OwnProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={twMerge("", className)}>
        <DialogHeader className="flex items-center justify-between">
          {title && (
            <DialogTitle
              className={twMerge(
                "text-2xl font-bold text-primary",
                titleClassName
              )}
            >
              {title}
            </DialogTitle>
          )}
        </DialogHeader>
        {description && <DialogDescription>{description}</DialogDescription>}
        <div className="flex justify-center">{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default GenericModal;
