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
import { OrganizationChartFlatEntry } from "./columns";
import OrganizationsDepartmentsManager from "@/managers/organizations-departments-manager";
import { useTranslation } from "react-i18next";
import { Switch } from "@/components/ui/switch";
import OrganizationsTitlesManager from "@/managers/organizations-titles-manager";
import { OrgTitle } from "@/components/settings/subpages/org-titles/columns";
import useOrgChartStore from "@/hooks/org-chart/use-org-chart-store";
import { OrgDepartment } from "@/components/settings/subpages/org-departments/columns";
import OrganizationsChartManager from "@/managers/organization-chart-manager";
import { useAuthStore } from "@/hooks/useAuthStore";

interface OrgChartUpdateDialogProps {
  entry: OrganizationChartFlatEntry;
}

export function OrgChartUpdateDialog({ entry }: OrgChartUpdateDialogProps) {
  const token = useAuthStore((state) => state.token);
  const [isLoading, setIsLoading] = useState(false);
  const [titlesData, setTitlesData] = useState<OrgTitle[]>([]);
  const [depsData, setDepsData] = useState<OrgDepartment[]>([]);
  const { refetch } = useOrgChartStore();

  const { t } = useTranslation("orgchart");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      level: entry.level,
      title: entry.title_id,
      department_id: entry.department_id,
      isAdmin: entry.type === "admin",
    },
  });

  const fetchAllLookups = useCallback(async () => {
    try {
      setIsLoading(true);
      const fetchedTitlesData = await OrganizationsTitlesManager.getTitles(
        token as string
      );
      setTitlesData(fetchedTitlesData.data);
      const fetchedDepsData =
        await OrganizationsDepartmentsManager.getDepartments(token as string);
      setDepsData(fetchedDepsData.data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Couldn't fetch data from server",
      });
    } finally {
      setIsLoading(false);
    }
  }, [token, setDepsData, setTitlesData, setIsLoading]);

  useEffect(() => {
    fetchAllLookups();
  }, [fetchAllLookups]);

  const onSubmit = async (data: FieldValues) => {
    try {
      setIsLoading(true);
      await OrganizationsChartManager.updateEntry(
        token as string,
        entry._id,
        data.title,
        data.department_id,
        data.level,
        data.isAdmin ? "admin" : "user"
      );
      toast({
        description: "Entry updated",
      });
      reset();
      refetch();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Couldn't update organization chart",
        description: (error as Error).message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // const managersOptions = usersData.map((user) => ({
  //   value: user._id,
  //   label: user.name,
  // }));

  const titleOptions = titlesData.map((t) => ({ label: t.name, value: t._id }));
  const departmentOptions = depsData.map((d) => ({
    label: d.name,
    value: d._id,
  }));

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="ghost">
          <Pencil className="h-4 w-4 text-yellow-700" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        {isLoading && (
          <div className="flex items-center justify-center w-full h-full">
            <div className="flex justify-center items-center space-x-1 text-sm text-gray-700">
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

              <div>{t("orgChart.form.update.loading")}</div>
            </div>
          </div>
        )}
        {!isLoading && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>{t("orgChart.form.update")}</DialogTitle>
              <DialogDescription>
                {t("orgChart.form.update.subTitle")}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-2">
              <div className="grid grid-cols-5 items-start gap-14 pt-4">
                <Label htmlFor="name" className="pt-3">
                  {t("orgChart.form.update.level")}
                </Label>
                <div className="col-span-4">
                  <Input
                    id="level"
                    type="number"
                    className=""
                    {...register("level")}
                  />
                  {errors.level ? (
                    <p className=" text-xs px-2 pt-2 text-red-500">
                      {errors.level.message as string}
                    </p>
                  ) : null}
                </div>
              </div>
              <div className="grid grid-cols-5 items-start gap-14">
                <Label htmlFor="title" className="pt-3">
                  {t("orgChart.form.update.title")}
                </Label>
                <div className="col-span-4">
                  <Select
                    onValueChange={(val) => setValue("title", val)}
                    defaultValue={entry.title_id}
                    disabled={titleOptions.length < 0}
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={t("orgChart.form.update.title.select")}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {titleOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                      {/* <SelectItem value={"1"}>sas</SelectItem> */}
                    </SelectContent>
                  </Select>

                  {/* {errors.manager ? (
                    <p className=" text-xs px-2 pt-2 text-red-500">
                      {errors.manager.message as string}
                    </p>
                  ) : null} */}
                </div>
              </div>
              <div className="grid grid-cols-5 items-start gap-14">
                <Label htmlFor="departments" className="pt-3">
                  {t("orgChart.form.update.department")}
                </Label>
                <div className="col-span-4">
                  <Select
                    onValueChange={(val) => setValue("department_id", val)}
                    defaultValue={entry.department_id}
                    // disabled={managersOptions.length < 0}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t("Choose department")} />
                    </SelectTrigger>
                    <SelectContent>
                      {departmentOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                      {/* <SelectItem value={"1"}>sas</SelectItem> */}
                    </SelectContent>
                  </Select>

                  {/* {errors.manager ? (
                    <p className=" text-xs px-2 pt-2 text-red-500">
                      {errors.manager.message as string}
                    </p>
                  ) : null} */}
                </div>
              </div>
              <div className="flex items-center gap-2 pt-2">
                <Switch
                  id="isadmin"
                  defaultChecked={entry.type === "admin"}
                  className="data-[state=checked]:bg-green-700"
                  onCheckedChange={(val) => {
                    setValue("isAdmin", val);
                  }}
                  dir="ltr"
                />
                <Label htmlFor="isadmin">
                  {t("orgChart.form.update.admin")}
                </Label>
              </div>
            </div>
            <DialogFooter>
              <DialogClose disabled={isLoading}>
                <Button
                  disabled={isLoading}
                  type="submit"
                  className="bg-green-800 hover:bg-green-700"
                >
                  {t("orgChart.form.update.button")}
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
