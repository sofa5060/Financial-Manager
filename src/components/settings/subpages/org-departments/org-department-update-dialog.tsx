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
import { Pencil } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { DialogClose, DialogTrigger } from "@radix-ui/react-dialog";
import { OrgDepartment } from "./columns";
import useOrgDepartmentsStore from "@/hooks/settings/use-org-departments-store";
import OrganizationsDepartmentsManager from "@/managers/organizations-departments-manager";
import { User } from "@/components/users/users-table/columns";
import UserManager from "@/managers/users-manager";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "@/hooks/useAuthStore";

interface OrganizationDepartmentUpdateDialogProps {
  department: OrgDepartment;
}

export function OrganizationDepartmentUpdateDialog({
  department,
}: OrganizationDepartmentUpdateDialogProps) {
  const token = useAuthStore((state) => state.token);
  const [isLoading, setIsLoading] = useState(false);
  const [usersData, setUsersData] = useState<User[]>([]);
  const { refetch } = useOrgDepartmentsStore();

  const { t } = useTranslation("settings");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: { name: department.name, manager: department.manager._id },
  });

  const fetchAllUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      const fetchedData = await UserManager.getAllUsers(token as string);
      setUsersData(fetchedData.data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Couldn't fetch data from server",
      });
    } finally {
      setIsLoading(false);
    }
  }, [token, setUsersData, setIsLoading]);

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  const onSubmit = async (data: FieldValues) => {
    if (data.name && data.manager) {
      try {
        console.log(data.manager);

        setIsLoading(true);
        await OrganizationsDepartmentsManager.updateDepartment(
          token as string,
          department._id,
          data.name,
          data.manager
        );
        toast({
          description: t("settings.departments.update.success.description", {
            name: data.name,
          }),
        });
        reset();
        refetch();
      } catch (error) {
        toast({
          variant: "destructive",
          title: t("settings.departments.update.failure.title"),
          description: (error as Error).message,
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const managersOptions = usersData.map((user) => ({
    value: user._id,
    label: user.name,
  }));

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="ghost">
          <Pencil className="h-4 w-4 text-yellow-700" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] max-w-[90%]">
        {managersOptions.length <= 0 && (
          <div className="flex items-center justify-center w-full h-full">
            <div className="flex justify-center items-center gap-1 text-sm text-gray-700">
              <svg
                fill="none"
                className="w-6 h-6 animate-spin"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
                  fill="currentColor"
                  fillRule="evenodd"
                />
              </svg>

              <div>Loading ...</div>
            </div>
          </div>
        )}
        {managersOptions.length > 0 && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>
                {t("settings.departments.update.title")}
              </DialogTitle>
              <DialogDescription>
                {t("settings.departments.update.description")}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-2">
              <div className="grid grid-cols-5 items-start gap-4 pt-4">
                <Label htmlFor="name" className="pt-3">
                  {t("settings.departments.update.name")}
                </Label>
                <div className="col-span-4">
                  <Input
                    id="name"
                    className=""
                    {...register("name", {
                      required: "Department name is required",
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
                  {t("settings.departments.update.manager")}
                </Label>
                <div className="col-span-4">
                  <Select
                    onValueChange={(val) => setValue("manager", val)}
                    defaultValue={department.manager._id}
                    disabled={managersOptions.length < 0}
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={t("settings.departments.update.manager")}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {managersOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                      {/* <SelectItem value={"1"}>sas</SelectItem> */}
                    </SelectContent>
                  </Select>

                  {errors.manager ? (
                    <p className=" text-xs px-2 pt-2 text-red-500">
                      {errors.manager.message as string}
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
                  {t("settings.departments.update.button")}
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
