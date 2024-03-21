import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { Trash } from "lucide-react";
import { TaskSubCategory } from "./columns";
import TasksSubCategoriesManager from "@/managers/tasks-subcategories-manager";
import useTasksSubCategoriesStore from "@/hooks/settings/use-tasks-subcategories-store";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "@/hooks/useAuthStore";

interface TasksSubCategoryDeleteDialogProps {
  subCategory: TaskSubCategory;
}

export function TasksSubCategoryDeleteDialog({
  subCategory,
}: TasksSubCategoryDeleteDialogProps) {
  const token = useAuthStore((state) => state.token);
  const { refetch } = useTasksSubCategoriesStore();

  const { t } = useTranslation("settings");

  const deleteCategory = async () => {
    if (!subCategory) return;
    try {
      await TasksSubCategoriesManager.deleteTasksSubCategory(
        token as string,
        subCategory.category._id,
        subCategory._id
      );
      toast({
        description: t("settings.subCategories.delete.success.description", {
          name: subCategory.name,
        }),
      });
      refetch();
    } catch {
      toast({
        variant: "destructive",
        title: t("settings.subCategories.delete.failure.title"),
        description: t("settings.subCategories.delete.failure.description", {
          name: subCategory.name,
        }),
      });
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <Trash className="h-4 w-4 text-red-700" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-w-[90%]">
        <DialogHeader>
          <DialogTitle>{t("settings.subCategories.delete.title")}</DialogTitle>
          <DialogDescription>
            {t("settings.subCategories.delete.description")}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button type="submit" onClick={deleteCategory}>
              {t("settings.subCategories.delete.button")}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
