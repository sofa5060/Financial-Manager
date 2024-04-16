import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { Category, NewCategory, NewCategorySchema } from "../schema";
import CategoriesManager from "@/managers/CategoriesManager";
import { useTranslation } from "react-i18next";

type CategoryFormProps = {
  type?: "add" | "edit";
  children?: React.ReactNode;
  category?: Category;
};

const CategoryFormDialog = ({
  children,
  category,
  type = "add",
}: CategoryFormProps) => {
  const { t } = useTranslation("settings");
  useEffect(() => {
    form.reset({
      ...category,
    });
  }, [category]);

  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<NewCategory>({
    resolver: zodResolver(NewCategorySchema),
    defaultValues: {
      ...category,
    },
  });

  const TITLES = {
    add: t("addCategory"),
    edit: t("editCategory"),
  };

  const DESCRIPTIONS = {
    add: t("form.message"),
    edit: t("form.message"),
  };

  const { mutate: addCategoryMutate, isPending } = useMutation({
    mutationFn: CategoriesManager.createCategory,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["categories"] });
      form.reset();
      setIsOpen(false);
    },
    onError: (error) => {
      console.log(error.message);
      toast({
        variant: "destructive",
        title: t("category.add.failed"),
        description: error.message,
      });
    },
  });

  const { mutate: updateCategoryMutate, isPending: isPendingUpdate } =
    useMutation({
      mutationFn: (data: NewCategory) =>
        CategoriesManager.updateCategory(data, category!.id),
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["categories"] });
        setIsOpen(false);
      },
      onError: (error) => {
        console.log(error.message);
        toast({
          variant: "destructive",
          title: t("category.edit.failed"),
          description: error.message,
        });
      },
    });

  const onSubmit: SubmitHandler<NewCategory> = (data) => {
    if (type === "add") {
      addCategoryMutate(data);
    } else if (type === "edit") {
      updateCategoryMutate(data);
    }
  };

  const closeDialog = () => {
    if (isPending || isPendingUpdate) return;
    form.reset();
    setIsOpen(false);
  };

  const openDialog = () => setIsOpen(true);

  return (
    <Dialog open={isOpen} onOpenChange={isOpen ? closeDialog : openDialog}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{TITLES[type]}</DialogTitle>
          <DialogDescription>{DESCRIPTIONS[type]}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name_en"
              render={({ field }) => (
                <FormItem className="flex gap-4 items-center justify-end">
                  <FormLabel className="whitespace-nowrap">
                    {t("nameEnglish")}
                  </FormLabel>
                  <div className="flex-col w-full max-w-[65%]">
                    <FormControl>
                      <Input
                        placeholder="Category 1"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name_ar"
              render={({ field }) => (
                <FormItem className="flex gap-4 items-center justify-end w-full">
                  <FormLabel className="whitespace-nowrap">
                    {t("nameArabic")}
                  </FormLabel>
                  <div className="flex-col w-full max-w-[65%]">
                    <FormControl>
                      <Input
                        placeholder="الفئة 1"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <div className="flex items-center justify-between mt-2">
              <Button
                type="button"
                className="bg-destructive"
                onClick={closeDialog}
                disabled={isPending || isPendingUpdate}
              >
                {t("cancel")}
              </Button>
              <Button type="submit" disabled={isPending || isPendingUpdate}>
                {t("save")}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default CategoryFormDialog;
