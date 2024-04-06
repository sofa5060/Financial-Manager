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
import AccountingEntriesManager from "@/managers/AccountingEntriesManager";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BadgePlus } from "lucide-react";
import { useState } from "react";

type PostModalProps = {
  entryId: number;
  children?: React.ReactNode;
};

const PostModal = ({ children, entryId }: PostModalProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutate: postEntryMutate, isPending } = useMutation({
    mutationFn: AccountingEntriesManager.postEntry,
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Failed to post entry",
        description: error.message,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["entries"] });
      await queryClient.invalidateQueries({ queryKey: ["transactions"] });

      toast({
        title: "Entry posted successfully",
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
          <DialogTitle>You Are About To Post This Entry</DialogTitle>
          <DialogDescription>
            This action cannot be undone.
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
              postEntryMutate(entryId);
            }}
            className="bg-primary"
            disabled={isPending}
          >
            <BadgePlus className="mr-2 w-4" />
            Post This Entry
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default PostModal;
