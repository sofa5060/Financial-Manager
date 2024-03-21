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
import useOrgTitlesStore from "@/hooks/settings/use-org-titles-store";
import { useAuthStore } from "@/hooks/useAuthStore";
import OrganizationsTitlesManager from "@/managers/organizations-titles-manager";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

export function OrgTitleCreateDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const token = useAuthStore((state) => state.token);
  const [isLoading, setIsLoading] = useState(false);
  const { refetch } = useOrgTitlesStore();

  const { t } = useTranslation("settings");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    if (data.name) {
      try {
        setIsLoading(true);
        await OrganizationsTitlesManager.createTitle(
          token as string,
          data.name
        );
        toast({
          description: t("settings.titles.create.success.description", {
            name: data.name,
          }),
        });
        reset();
        setIsOpen(false);
        refetch();
      } catch (error) {
        toast({
          variant: "destructive",
          title: t("settings.titles.create.failure.title"),
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

  return (
    <Dialog open={isOpen} onOpenChange={isOpen ? closeDialog : () => setIsOpen(true)}>
      <Button
        size="sm"
        className="ms-auto hidden h-8 lg:flex bg-green-700"
        onClick={() => setIsOpen(true)}
      >
        <PlusCircle className="me-2 h-4 w-4" />
        {t("settings.titles.add")}
      </Button>

      <DialogContent
        className="sm:max-w-[425px] max-w-[90%]"
        onEscapeKeyDown={closeDialog}
        onInteractOutside={closeDialog}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>{t("settings.titles.create.title")}</DialogTitle>
            <DialogDescription>
              {t("settings.titles.create.description")}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid grid-cols-5 items-start gap-4 pt-4">
              <Label htmlFor="name" className="pt-3">
                {t("settings.titles.create.name")}
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
            <Button
              disabled={isLoading}
              type="submit"
              className="bg-green-800 hover:bg-green-700"
            >
              {t("settings.titles.create.button")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
