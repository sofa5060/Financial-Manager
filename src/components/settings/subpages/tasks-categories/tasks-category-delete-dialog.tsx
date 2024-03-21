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
import TasksCategoriesManager from "@/managers/tasks-categories-manager";
import { Trash } from "lucide-react";
import { TaskCategory } from "./columns";
import useTasksCategoriesStore from "@/hooks/settings/use-tasks-categories-store";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "@/hooks/useAuthStore";

interface TasksCategoryDeleteDialogProps {
  category: TaskCategory;
}

export function TasksCategoryDeleteDialog({
  category,
}: TasksCategoryDeleteDialogProps) {
  const token = useAuthStore((state) => state.token);
  const { refetch } = useTasksCategoriesStore();

  const { t } = useTranslation("settings");

  const deleteCategory = async () => {
    if (!category) return;
    try {
      await TasksCategoriesManager.deleteTasksCategory(
        token as string,
        category._id
      );
      toast({
        description: t("settings.categories.delete.success.description", {
          name: category.name,
        }),
      });
      refetch();
    } catch {
      toast({
        variant: "destructive",
        title: t("settings.categories.delete.failure.title"),
        description: t("settings.categories.delete.failure.description", {
          name: category.name,
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
          <DialogTitle>{t("settings.categories.delete.title")}</DialogTitle>
          <DialogDescription>
            {t("settings.categories.delete.description")}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button type="submit" onClick={deleteCategory}>
              {t("settings.categories.delete.button")}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
