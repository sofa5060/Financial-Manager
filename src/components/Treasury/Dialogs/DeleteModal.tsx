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
import TreasuryManager from "@/managers/TreasuryManager";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { useState } from "react";

type DeleteModalProps = {
  bondId: number;
  children?: React.ReactNode;
};

const DeleteModal = ({ children, bondId }: DeleteModalProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutate: deleteBondMutate, isPending } = useMutation({
    mutationFn: TreasuryManager.deleteBond,
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Failed to delete bond",
        description: error.message,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["bonds"] });
      toast({
        title: "Bond deleted successfully",
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
          <DialogTitle>You Are About To Delete This Bond</DialogTitle>
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
            disabled={isPending}
            className="bg-white text-black ring-1 ring-gray-300"
          >
            Cancel
          </Button>
          <Button
             onClick={() => {
              deleteBondMutate(bondId);
            }}
            disabled={isPending}
            className="bg-red-500"
          >
            <Trash className="w-4 h-4 mr-2" />
            Delete This Bond
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default DeleteModal;
