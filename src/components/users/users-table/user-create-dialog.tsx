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
import useUsersStore from "@/hooks/users/use-users-store";
import UserManager from "@/managers/users-manager";
import { PlusCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useAuthStore } from "@/hooks/useAuthStore";

export function UserCreateDialog() {
  const token = useAuthStore((state) => state.token);
  const [isLoading, setIsLoading] = useState(false);
  const { refetch } = useUsersStore();

  const { t } = useTranslation("users");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      organization_name: "",
      email: "",
      phone: "",
      password: "",
      passwordConfirmation: "",
      isAdmin: false,
    },
  });

  const onSubmit = async (data: FieldValues) => {
    try {
      setIsLoading(true);
      const {
        name,
        organization_name,
        email,
        phone,
        password,
        passwordConfirmation,
        isAdmin,
      } = data;

      await UserManager.createUser(
        token as string,
        name,
        organization_name,
        phone,
        email,
        password,
        passwordConfirmation,
        isAdmin ? "admin" : "user"
      );
      toast({
        description: `User '${data.name}' was created successfully!`,
      });
      reset();
      refetch();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: (error as Error).message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button size="sm" className="h-8 lg:flex bg-green-800">
          <PlusCircle className="me-2 h-4 w-4" />
          {t("users.table.add")}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>{t("users.create.title")}</DialogTitle>
            <DialogDescription>{t("users.create.subTitle")}</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2 py-4">
            <div>
              <Label htmlFor="name" className="pt-3 text-xs">
                {t("users.create.form.name")}
              </Label>
              <div>
                <Input
                  id="name"
                  className=""
                  {...register("name", {
                    required: t("users.create.form.name.required"),
                  })}
                />
                {errors.name ? (
                  <p className=" text-xs px-2 pt-2 text-red-500">
                    {errors.name.message as string}
                  </p>
                ) : null}
              </div>
            </div>
            <div>
              <Label htmlFor="organization_name" className="pt-3 text-xs">
                {t("users.create.form.organization")}
              </Label>
              <div>
                <Input
                  id="organization_name"
                  className=""
                  {...register("organization_name", {
                    required: t("users.create.form.organization.required"),
                  })}
                />
                {errors.organization_name ? (
                  <p className=" text-xs px-2 pt-2 text-red-500">
                    {errors.organization_name.message as string}
                  </p>
                ) : null}
              </div>
            </div>
            <div>
              <Label htmlFor="email" className="pt-3 text-xs">
                {t("users.create.form.email")}
              </Label>
              <div>
                <Input
                  id="email"
                  type="email"
                  {...register("email", {
                    required: t("users.create.form.email.required"),
                  })}
                />
                {errors.email ? (
                  <p className=" text-xs px-2 pt-2 text-red-500">
                    {errors.email.message as string}
                  </p>
                ) : null}
              </div>
            </div>
            <div>
              <Label htmlFor="phone" className="pt-3 text-xs">
                {t("users.create.form.phone")}
              </Label>
              <div>
                <Input
                  id="phone"
                  {...register("phone", {
                    required: t("users.create.form.phone.required"),
                  })}
                  onKeyDown={(evt) => {
                    if (
                      !(evt.key >= "0" && evt.key <= "9") &&
                      evt.key !== "Backspace" &&
                      evt.key !== "Tab"
                    )
                      evt.preventDefault();
                  }}
                />
                {errors.phone ? (
                  <p className=" text-xs px-2 pt-2 text-red-500">
                    {errors.phone.message as string}
                  </p>
                ) : null}
              </div>
            </div>
            <div>
              <Label htmlFor="password" className="pt-3 text-xs">
                {t("users.create.form.password")}
              </Label>
              <div>
                <Input
                  id="password"
                  type="password"
                  {...register("password", {
                    required: t("users.create.form.password.required"),
                  })}
                />
                {errors.password ? (
                  <p className=" text-xs px-2 pt-2 text-red-500">
                    {errors.password.message as string}
                  </p>
                ) : null}
              </div>
            </div>
            <div>
              <Label htmlFor="passwordConfirmation" className="pt-3 text-xs">
                {t("users.create.form.passwordConfirmation")}
              </Label>
              <div>
                <Input
                  id="passwordConfirmation"
                  type="password"
                  {...register("passwordConfirmation", {
                    required: t(
                      "users.create.form.passwordConfirmation.required"
                    ),
                  })}
                />
                {errors.passwordConfirmation ? (
                  <p className=" text-xs px-2 pt-2 text-red-500">
                    {errors.passwordConfirmation.message as string}
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
              {t("users.create.form.button")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
