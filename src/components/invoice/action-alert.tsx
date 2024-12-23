import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ReactNode } from "react";

type ActionAlertPropsType = {
  toggleButton: ReactNode;
  continueHandler: () => void;
  showingMessage?: string;
  showingDescription?: string;
};

export function ActionAlert({
  toggleButton,
  showingMessage,
  showingDescription,
  continueHandler,
}: ActionAlertPropsType) {

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{toggleButton}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {showingMessage || "Are you absolutely sure?"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {showingDescription ||
              "This action cannot be undone. This will permanently delete your account and remove your data from our servers."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
