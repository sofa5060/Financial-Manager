import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { TaskSubCategory } from "./columns";
import { DialogClose, DialogTrigger } from "@radix-ui/react-dialog";
import TasksSubCategoriesManager from "@/managers/tasks-subcategories-manager";
import useTasksSubCategoriesStore from "@/hooks/settings/use-tasks-subcategories-store";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "@/hooks/useAuthStore";

interface TasksSubCategoryUpdateDialogProps {
  subCategory: TaskSubCategory;
}

export function TasksSubCategoryUpdateDialog({
  subCategory,
}: TasksSubCategoryUpdateDialogProps) {
  const token = useAuthStore((state) => state.token);
  const [isLoading, setIsLoading] = useState(false);

  const { t } = useTranslation("settings");
  const { refetch } = useTasksSubCategoriesStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { name: subCategory.name } });

  const onSubmit = async (data: FieldValues) => {
    if (data.name) {
      try {
        setIsLoading(true);
        await TasksSubCategoriesManager.updateTasksSubCategory(
          token as string,
          subCategory.category._id,
          subCategory._id,
          data.name
        );
        toast({
          description: t("settings.subCategories.update.success.description", {
            name: data.name,
          }),
        });
        reset();
        refetch();
      } catch (error) {
        toast({
          variant: "destructive",
          title: t("settings.subCategories.update.failure.title"),
          description: (error as Error).message,
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="ghost">
          <Pencil className="h-4 w-4 text-yellow-700" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] max-w-[90%]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>
              {t("settings.subCategories.update.title")}
            </DialogTitle>
            <DialogDescription>
              {t("settings.subCategories.update.description")}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid grid-cols-5 items-start gap-4 pt-4">
              <Label htmlFor="name" className="pt-3">
                {t("settings.subCategories.update.name")}
              </Label>
              <div className="col-span-4">
                <Input
                  id="name"
                  className=""
                  {...register("name", {
                    required: "Category name is required",
                  })}
                />
                {errors.name ? (
                  <p className=" text-xs px-2 pt-2 text-red-500">
                    {errors.name.message as string}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose disabled={isLoading}>
              <Button
                disabled={isLoading}
                type="submit"
                className="bg-green-800 hover:bg-green-700"
              >
                {t("settings.subCategories.update.button")}
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
