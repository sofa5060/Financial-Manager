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
import TemplatesManager from "@/managers/TemplatesManager";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

type DeleteModalProps = {
  templateId: number;
  children?: React.ReactNode;
};

const DeleteModal = ({ children, templateId }: DeleteModalProps) => {
  const { t } = useTranslation("templates");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutate: deleteTemplateMutate, isPending } = useMutation({
    mutationFn: TemplatesManager.deleteTemplate,
    onError: (error) => {
      toast({
        variant: "destructive",
        title: t("delete.failed"),
        description: error.message,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["templates"] });
      toast({
        title: t("delete.success"),
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
          <DialogTitle>{t("delete.title")}</DialogTitle>
          <DialogDescription>{t("delete.description")}</DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-4 mt-4 justify-between">
          <Button
            onClick={() => {
              closeDialog();
            }}
            disabled={isPending}
            className="bg-white text-black ring-1 ring-gray-300"
          >
            {t("cancel")}
          </Button>
          <Button
            onClick={() => {
              deleteTemplateMutate(templateId);
            }}
            disabled={isPending}
            className="bg-red-500"
          >
            <Trash className="w-4 h-4 me-2" />
            {t("delete.confirm")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default DeleteModal;
