import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash } from "lucide-react";
import { useState } from "react";

type DeleteModalProps = {
  costCenterId: string;
  children?: React.ReactNode;
};

const DeleteModal = ({ children }: DeleteModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeDialog = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(val) => setIsOpen(val)}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>You Are About To Delete This Cost Center</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-4 mt-4 justify-between">
          <Button
            onClick={() => {
              closeDialog();
            }}
            className="bg-white text-black ring-1 ring-gray-300"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              closeDialog();
            }}
            className="bg-red-500"
          >
            <Trash className="w-4 h-4 mr-2" />
            Delete This Cost Center
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default DeleteModal;
