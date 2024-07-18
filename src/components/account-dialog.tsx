import { useState } from "react";

import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";

interface EditAccountDialogProps {
  children?: React.ReactNode;
  label: string;
  description?: string;
  action?: string;
  onSave: (value: string) => void;
}

export const EditAccountDialog = ({
  children,
  label,
  description,
  action,
  onSave,
}: EditAccountDialogProps) => {
  const [accountName, setAccountName] = useState<string>("");

  const onSubmit = (value: string) => {
    onSave(value);
    setAccountName("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="italic">{label}</DialogTitle>
          <DialogDescription className="italic">
            {description}
          </DialogDescription>
        </DialogHeader>

        <Input
          value={accountName}
          onChange={(e) => setAccountName(e.target.value)}
        />

        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit" onClick={() => onSubmit(accountName)}>
              {action ? action : "Save changes"}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
