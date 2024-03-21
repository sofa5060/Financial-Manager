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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { User } from "@/components/users/users-table/columns";
import UserManager from "@/managers/users-manager";
import OrganizationsDepartmentsManager from "@/managers/organizations-departments-manager";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "@/hooks/useAuthStore";

export function OrgDepartmentCreateCatalog({
  onRefetch,
}: {
  onRefetch: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const token = useAuthStore((state) => state.token);
  const [isLoading, setIsLoading] = useState(false);
  const [usersData, setUsersData] = useState<User[]>([]);

  const { t } = useTranslation("settings");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const fetchAllUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      const fetchedData = await UserManager.getAllUsers(token as string);
      setUsersData(fetchedData.data);
      setValue("manager", fetchedData.data[0]._id);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Couldn't fetch data from server",
      });
    } finally {
      setIsLoading(false);
    }
  }, [token, setUsersData, setIsLoading, setValue]);

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  const onSubmit = async (data: FieldValues) => {
    if (data.name && data.manager) {
      try {
        setIsLoading(true);
        // TODO: Implement POST handler
        await OrganizationsDepartmentsManager.createDepartment(
          token as string,
          data.name,
          data.manager
        );

        toast({
          description: t("settings.departments.create.success.description", {
            name: data.name,
          }),
        });
        reset();
        setIsOpen(false);
        onRefetch();
      } catch (error) {
        toast({
          variant: "destructive",
          title: t("settings.departments.create.failure.title"),
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

  const managersOptions = usersData.map((user) => ({
    value: user._id,
    label: user.name,
  }));

  return (
    <Dialog open={isOpen}>
      <Button
        size="sm"
        className="ms-auto hidden h-8 lg:flex bg-green-700"
        onClick={() => setIsOpen(true)}
      >
        <PlusCircle className="me-2 h-4 w-4" />
        {t("settings.departments.add")}
      </Button>

      <DialogContent
        className="sm:max-w-[425px] max-w-[90%]"
        onClose={closeDialog}
        onEscapeKeyDown={closeDialog}
        onInteractOutside={closeDialog}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>{t("settings.departments.create.title")}</DialogTitle>
            <DialogDescription>
              {t("settings.departments.create.description")}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid grid-cols-5 items-start gap-4 pt-4">
              <Label htmlFor="name" className="pt-3">
                {t("settings.departments.create.name")}
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
                {t("settings.departments.create.manager")}
              </Label>
              <div className="col-span-4">
                {managersOptions.length > 0 && (
                  <Select
                    onValueChange={(val) => setValue("manager", val)}
                    defaultValue={managersOptions[0].value}
                    disabled={managersOptions.length < 0}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Manager" />
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
                )}

                {errors.manager ? (
                  <p className=" text-xs px-2 pt-2 text-red-500">
                    {errors.manager.message as string}
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
              {t("settings.departments.create.button")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
