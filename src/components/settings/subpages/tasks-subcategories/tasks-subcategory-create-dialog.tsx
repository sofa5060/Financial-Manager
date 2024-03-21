import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import useTasksSubCategoriesStore from "@/hooks/settings/use-tasks-subcategories-store";
import TasksSubCategoriesManager from "@/managers/tasks-subcategories-manager";
import { PlusCircle } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { TaskCategory } from "../tasks-categories/columns";
import TasksCategoriesManager from "@/managers/tasks-categories-manager";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "@/hooks/useAuthStore";

export function TaskSubCategoryCreateDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [categoriesData, setCategoriesData] = useState<TaskCategory[]>([]);
  const token = useAuthStore((state) => state.token);
  const [isLoading, setIsLoading] = useState(false);
  const { refetch } = useTasksSubCategoriesStore();

  const {t} = useTranslation("settings")

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const fetchAllCategories = useCallback(async () => {
    try {
      setIsLoading(true);
      const fetchedData = await TasksCategoriesManager.getTasksCategories(
        token as string
      );
      setCategoriesData(fetchedData.data);
      setValue("category", fetchedData.data[0]._id);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Couldn't fetch data from server",
      });
    } finally {
      setIsLoading(false);
    }
  }, [token, setCategoriesData, setIsLoading, setValue]);

  useEffect(() => {
    fetchAllCategories();
  }, [fetchAllCategories]);

  const onSubmit = async (data: FieldValues) => {
    if (data.name && data.category) {
      try {
        setIsLoading(true);
        await TasksSubCategoriesManager.createTasksSubCategory(
          token as string,
          data.category,
          data.name
        );
        toast({
          description: t("settings.subCategories.create.success.description", {name: data.name}),
        });
        reset();
        setIsOpen(false);
        refetch();
      } catch (error) {
        toast({
          variant: "destructive",
          title: t("settings.subCategories.create.failure.title"),
          description: (error as Error).message,
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  const categoriesOptions = categoriesData.map((category) => ({
    value: category._id,
    label: category.name,
  }));

  return (
    <Dialog open={isOpen} onOpenChange={isOpen ? closeDialog : () => setIsOpen(true)}>
      <Button
        size="sm"
        className="ms-auto hidden h-8 lg:flex bg-green-700"
        onClick={() => setIsOpen(true)}
      >
        <PlusCircle className="me-2 h-4 w-4" />
        {t("settings.subCategories.add")}
      </Button>

      <DialogContent
        className="sm:max-w-[425px] max-w-[90%]"
        onEscapeKeyDown={closeDialog}
        onInteractOutside={closeDialog}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>{t("settings.subCategories.create.title")}</DialogTitle>
            <DialogDescription>
              {t("settings.subCategories.create.description")}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid grid-cols-5 items-start gap-4 pt-4">
              <Label htmlFor="name" className="pt-3">
                {t("settings.subCategories.create.name")}
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
            <div className="grid grid-cols-5 items-start gap-4">
              <Label htmlFor="name" className="pt-3">
                {t("settings.subCategories.create.category")}
              </Label>
              <div className="col-span-4">
                {categoriesOptions.length > 0 && (
                  <Select
                    onValueChange={(val) => setValue("category", val)}
                    defaultValue={categoriesOptions[0].value}
                    disabled={categoriesOptions.length < 0}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoriesOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                      {/* <SelectItem value={"1"}>sas</SelectItem> */}
                    </SelectContent>
                  </Select>
                )}

                {errors.category ? (
                  <p className=" text-xs px-2 pt-2 text-red-500">
                    {errors.category.message as string}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              disabled={isLoading}
              type="submit"
              className="bg-green-800 hover:bg-green-700"
            >
              {t("settings.subCategories.create.button")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
