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
    <ShadcnAlertDialog
      open={open}
      onOpenChange={onOpenChange}
      aria-modal="true"
    >
      <AlertDialogContent className="bg-white rounded-3xl shadow-xl p-6 max-w-lg mx-4">
        <AlertDialogHeader className="mb-4">
          <AlertDialogTitle className="text-2xl font-extrabold text-gray-800 bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">
            {title}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <div className="py-4 text-gray-700 text-base leading-relaxed">
          <p>{message}</p>
        </div>
        <AlertDialogFooter className="flex justify-end gap-4 mt-6">
          {cancelText && (
            <AlertDialogCancel
              type="button"
              onClick={handleCancel}
              className="px-5 py-2 rounded-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold transition"
            >
              {cancelText}
            </AlertDialogCancel>
          )}
          <AlertDialogAction
            type="button"
            onClick={handleConfirm}
            className="px-6 py-2 rounded-full bg-gradient-to-r from-indigo-300 to-pink-300 text-white font-bold hover:from-pink-300 hover:to-indigo-300 shadow-md transition"
          >
            {okText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </ShadcnAlertDialog>
  );
};

export default AlertDialog;
