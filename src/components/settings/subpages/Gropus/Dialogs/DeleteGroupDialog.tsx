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
import GroupsManager from "@/managers/GroupsManager";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

type DeleteGroupDialogProps = {
  groupId: number;
  children?: React.ReactNode;
};

const DeleteGroupDialog = ({ children, groupId }: DeleteGroupDialogProps) => {
  const { t } = useTranslation("settings");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutate: deleteGroupMutate, isPending } = useMutation({
    mutationFn: GroupsManager.deleteGroup,
    onError: (error) => {
      toast({
        variant: "destructive",
        title: t("group.delete.failed"),
        description: error.message,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["groups"] });
      toast({
        title: t("group.delete.success"),
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
          <DialogTitle>{t("group.delete.title")}</DialogTitle>
          <DialogDescription>{t("group.delete.message")}</DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-4 mt-4 justify-between">
          <Button
            onClick={() => {
              closeDialog();
            }}
            className="bg-white text-black ring-1 ring-gray-300"
            disabled={isPending}
          >
            {t("cancel")}
          </Button>
          <Button
            onClick={() => {
              deleteGroupMutate(groupId);
            }}
            className="bg-red-500"
            disabled={isPending}
          >
            <Trash className="w-4 h-4 me-2" />
            {t("group.delete.confirm")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default DeleteGroupDialog;
