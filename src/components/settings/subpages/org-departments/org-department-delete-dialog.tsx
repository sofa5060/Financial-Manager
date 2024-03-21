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
import { Trash } from "lucide-react";
import { OrgDepartment } from "./columns";
import OrganizationsDepartmentsManager from "@/managers/organizations-departments-manager";
import useOrgDepartmentsStore from "@/hooks/settings/use-org-departments-store";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "@/hooks/useAuthStore";

interface OrganizationDepartmentDeleteDialogProps {
  department: OrgDepartment;
}

export function OrganizationDepartmentDeleteDialog({
  department,
}: OrganizationDepartmentDeleteDialogProps) {
  const token = useAuthStore((state) => state.token);
  const { refetch } = useOrgDepartmentsStore();

  const { t } = useTranslation("settings");

  const deleteDepartment = async () => {
    if (!department) return;
    try {
      await OrganizationsDepartmentsManager.deleteDepartment(
        token as string,
        department._id
      );
      toast({
        description: t("settings.departments.delete.success.description", {
          name: department.name,
        }),
      });
      refetch();
    } catch {
      toast({
        variant: "destructive",
        title: t("settings.departments.delete.failure.title"),
        description: `Couldn't delete department ${department.name}`,
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
          <DialogTitle>{t("settings.departments.delete.title")}</DialogTitle>
          <DialogDescription>
            {t("settings.departments.delete.description")}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button type="submit" onClick={deleteDepartment}>
              {t("settings.departments.delete.button")}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
