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
import CategoriesManager from "@/managers/CategoriesManager";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

type DeleteCategoryDialogProps = {
  categoryId: number;
  children?: React.ReactNode;
};

const DeleteCategoryDialog = ({
  children,
  categoryId,
}: DeleteCategoryDialogProps) => {
  const { t } = useTranslation("settings");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutate: deleteCategoryMutate, isPending } = useMutation({
    mutationFn: CategoriesManager.deleteCategory,
    onError: (error) => {
      toast({
        variant: "destructive",
        title: t("category.delete.failed"),
        description: error.message,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast({
        title: t("category.delete.success"),
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
          <DialogTitle>{t("category.delete.title")}</DialogTitle>
          <DialogDescription>
            {t("category.delete.message")}
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
            {t("cancel")}
          </Button>
          <Button
            onClick={() => {
              deleteCategoryMutate(categoryId);
            }}
            className="bg-red-500"
            disabled={isPending}
          >
            <Trash className="w-4 h-4 me-2" />
            {t("category.delete.confirm")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default DeleteCategoryDialog;
