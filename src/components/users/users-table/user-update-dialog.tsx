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
import { DialogTrigger } from "@radix-ui/react-dialog";
import { User } from "./columns";
import UserManager from "@/managers/users-manager";
import useUsersStore from "@/hooks/users/use-users-store";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "@/hooks/useAuthStore";

interface UserUpdateDialogProps {
  user: User;
}

export function UserUpdateDialog({ user }: UserUpdateDialogProps) {
  const token = useAuthStore((state) => state.token);
  const [isLoading, setIsLoading] = useState(false);
  const { refetch } = useUsersStore();

  const { t } = useTranslation("users");

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user.name,
      organization_name: user.organization_name,
      email: user.email,
      phone: user.phone,
      old_password: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const onSubmit = async (data: FieldValues) => {
    if (data.name) {
      if (data.old_password.trim()) {
        if (!data.password.trim()) {
          setError("password", { message: "Please enter valid passowrd" });
          return;
        }
        if (!data.passwordConfirmation.trim()) {
          setError("passwordConfirmation", {
            message: "Please enter valid passowrd",
          });
          return;
        }
        if (data.passwordConfirmation.trim() !== data.password.trim()) {
          setError("passwordConfirmation", {
            message: "Password and confirmation don't match",
          });
          return;
        }
      }

      const userData = {
        name: data.name,
        organization_name: data.organization_name,
        email: data.email,
        phone: data.phone,
        old_password: data.old_password,
        password: data.password,
        passwordConfirmation: data.passwordConfirmation,
      };
      try {
        setIsLoading(true);
        await UserManager.updateUser(token as string, user._id, userData);
        toast({
          description: `User '${data.name}' was updated successfully!`,
        });
        reset();
        refetch();
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Please check form values (email, passowrd)",
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

      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>{t("users.update.title")}</DialogTitle>
            <DialogDescription>{t("users.update.subTitle")}</DialogDescription>
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
              <Label htmlFor="old_password" className="pt-3 text-xs">
                {t("users.update.form.oldPassword")}
              </Label>
              <div>
                <Input
                  id="old_password"
                  type="password"
                  {...register("old_password")}
                />
                {errors.old_password ? (
                  <p className=" text-xs px-2 pt-2 text-red-500">
                    {errors.old_password.message as string}
                  </p>
                ) : null}
              </div>
            </div>

            <div>
              <Label htmlFor="old_password" className="pt-3 text-xs">
                {t("users.update.form.newPassword")}
              </Label>
              <div>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
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
                {t("users.update.form.newPasswordConfirmation")}
              </Label>
              <div>
                <Input
                  id="passwordConfirmation"
                  type="password"
                  {...register("passwordConfirmation")}
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
