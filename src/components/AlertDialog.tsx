import React from "react";
import {
  AlertDialog as ShadcnAlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

interface AlertDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  message: string;
  title: string;
}

const AlertDialog: React.FC<AlertDialogProps> = ({ open, onOpenChange, message, title }) => (
  <ShadcnAlertDialog open={open} onOpenChange={onOpenChange}>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{title}</AlertDialogTitle>
      </AlertDialogHeader>
      <div className="py-4">{message}</div>
      <AlertDialogFooter>
        <AlertDialogAction onClick={() => onOpenChange(false)}>
          OK
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </ShadcnAlertDialog>
);

export default AlertDialog;