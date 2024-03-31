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
import CostCentersManager from "@/managers/CostCentersManager";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { useState } from "react";

type DeleteModalProps = {
  costCenterId: number;
  children?: React.ReactNode;
};

const DeleteModal = ({ children, costCenterId }: DeleteModalProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutate: deleteCostCenterMutate, isPending } = useMutation({
    mutationFn: CostCentersManager.deleteCostCenter,
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Failed to delete cost center",
        description: error.message,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["costCenters"] });
      toast({
        title: "Cost Center deleted successfully",
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
          <DialogTitle>You Are About To Delete This Cost Center</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            cost center and remove your data from our servers.
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
              deleteCostCenterMutate(costCenterId);
            }}
            className="bg-red-500"
            disabled={isPending}
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
