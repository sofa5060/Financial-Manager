import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import BanksManager from "@/managers/BanksManager";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { useState } from "react";

type DeleteBankDialogProps = {
  bankId: number;
  children?: React.ReactNode;
};

const DeleteBankDialog = ({ children, bankId }: DeleteBankDialogProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutate: deleteBankMutate, isPending } = useMutation({
    mutationFn: BanksManager.deleteBank,
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Failed to delete bank",
        description: error.message,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["banks"] });
      toast({
        title: "Bank deleted successfully",
      });
      closeDialog();
    },
  });

  const [isOpen, setIsOpen] = useState(false);

  const closeDialog = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(val) => setIsOpen(val)}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>You Are About To Delete This Bank</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            bank and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-4 mt-4 justify-between">
          <Button
            onClick={() => {
              closeDialog();
            }}
            className="bg-white text-black ring-1 ring-gray-300"
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              deleteBankMutate(bankId);
            }}
            className="bg-red-500"
            disabled={isPending}
          >
            <Trash className="w-4 h-4 mr-2" />
            Delete This Bank
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default DeleteBankDialog;
