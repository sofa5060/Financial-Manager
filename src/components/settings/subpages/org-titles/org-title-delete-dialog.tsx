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
import { OrgTitle } from "./columns";
import OrganizationsTitlesManager from "@/managers/organizations-titles-manager";
import useOrgTitlesStore from "@/hooks/settings/use-org-titles-store";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "@/hooks/useAuthStore";

interface OrgTitleDeleteDialogProps {
  title: OrgTitle;
}

export function OrgTitleDeleteDialog({ title }: OrgTitleDeleteDialogProps) {
  const token = useAuthStore((state) => state.token);
  const { refetch } = useOrgTitlesStore();

  const { t } = useTranslation("settings");

  const deleteTitle = async () => {
    if (!title) return;
    try {
      await OrganizationsTitlesManager.deleteTitle(token as string, title._id);
      toast({
        description: t("settings.titles.delete.success.description", {
          name: title.name,
        }),
      });
      refetch();
    } catch {
      toast({
        variant: "destructive",
        title: t("settings.titles.delete.failure.title"),
        description: t("settings.titles.delete.failure.description", {
          name: title.name,
        }),
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
          <DialogTitle>{t("settings.titles.delete.title")}</DialogTitle>
          <DialogDescription>
            {t("settings.titles.delete.description")}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button type="submit" onClick={deleteTitle}>
              {t("settings.titles.delete.button")}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
