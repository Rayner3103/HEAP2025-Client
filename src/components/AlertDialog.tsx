import React from "react";
import {
  AlertDialog as ShadcnAlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

interface AlertDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  message: string;
  okText?: string; // Defaults to "OK"
  cancelText?: string; // If provided, shows cancel button
  onConfirm?: () => void; // Called when user confirms
  onCancel?: () => void; // Called when user cancels
}

const AlertDialog = ({
  open,
  onOpenChange,
  title,
  message,
  okText = "OK",
  cancelText,
  onConfirm,
  onCancel,
}: AlertDialogProps) => {
  const handleConfirm = () => {
    onConfirm?.();
    onOpenChange(false);
  };

  const handleCancel = () => {
    onCancel?.();
    onOpenChange(false);
  };

  return (
    <ShadcnAlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
        </AlertDialogHeader>
        <div className="py-4">{message}</div>
        <AlertDialogFooter>
          {cancelText && (
            <AlertDialogCancel onClick={handleCancel}>
              {cancelText}
            </AlertDialogCancel>
          )}
          <AlertDialogAction onClick={handleConfirm}>
            {okText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </ShadcnAlertDialog>
  );
};

export default AlertDialog;
