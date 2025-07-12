import React, { createContext, useContext, useState, ReactNode } from "react";
import AlertDialog from "@/components/AlertDialog";

interface AlertOptions {
  title: string;
  message: string;
  okText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

interface AlertDialogContextProps {
  showAlert: (options: Omit<AlertOptions, "cancelText" | "onCancel">) => void;
  showConfirm: (options: AlertOptions) => void;
}

const AlertDialogContext = createContext<AlertDialogContextProps | undefined>(
  undefined
);

export const useAlertDialog = () => {
  const context = useContext(AlertDialogContext);
  if (!context) {
    throw new Error(
      "useAlertDialog must be used within an AlertDialogProvider"
    );
  }
  return context;
};

export const AlertDialogProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dialogOptions, setDialogOptions] = useState<AlertOptions | null>(null);

  const showAlert = (
    options: Omit<AlertOptions, "cancelText" | "onCancel">
  ) => {
    setDialogOptions(options);
    setIsOpen(true);
  };

  const showConfirm = (options: AlertOptions) => {
    setDialogOptions(options);
    setIsOpen(true);
  };

  return (
    <AlertDialogContext.Provider value={{ showAlert, showConfirm }}>
      {children}
      {dialogOptions && (
        <AlertDialog
          open={isOpen}
          onOpenChange={setIsOpen}
          {...dialogOptions}
        />
      )}
    </AlertDialogContext.Provider>
  );
};
