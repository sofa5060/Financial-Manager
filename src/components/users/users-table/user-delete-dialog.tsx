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
import { User } from "./columns";
import UserManager from "@/managers/users-manager";
import useUsersStore from "@/hooks/users/use-users-store";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "@/hooks/useAuthStore";

interface UserDeleteDialogProps {
  user: User;
}

export function UserDeleteDialog({ user }: UserDeleteDialogProps) {
  const token = useAuthStore((state) => state.token);
  const { refetch } = useUsersStore();

  const { t } = useTranslation("users");

  const deleteUser = async () => {
    if (!user) return;
    try {
      await UserManager.deleteUser(token as string, user._id);
      toast({
        description: `User '${user.name}' was deleted successfully!`,
      });
      refetch();
    } catch {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: `User ${user.name} is already involved in a process`,
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("users.delete.title")}</DialogTitle>
          <DialogDescription>{t("users.delete.message")}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button type="submit" onClick={deleteUser}>
              {t("users.delete.button")}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
