import { ColumnDef } from "@tanstack/react-table";
import GroupFormDialog from "../Dialogs/GroupFormDialog";
import { Pencil, Trash2 } from "lucide-react";
import { Group } from "../schema";
import DeleteGroupDialog from "../Dialogs/DeleteGroupDialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useTranslation } from "react-i18next";

export const useGroupsColumns = () => {
  const { t } = useTranslation("settings");

  const columns: ColumnDef<Group>[] = [
    {
      accessorKey: "id",
      header: t("serial"),
    },
    {
      accessorKey: "name_en",
      header: t("enName"),
    },
    {
      accessorKey: "name_ar",
      header: t("arName"),
    },
    {
      accessorKey: "members",
      header: t("members"),
      cell({ row }) {
        const group = row.original;
        return (
          <div className="flex -space-x-2">
            <TooltipProvider>
              {group.users.map((user) => (
                <Tooltip key={user.id}>
                  <TooltipTrigger asChild>
                    <Avatar className="cursor-pointer inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-800">
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{user.name}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          </div>
        );
      },
    },
    {
      id: "actions",
      header: () => <div className="w-[80px]">{t("actions")}</div>,
      cell: ({ row }) => {
        const group = row.original;

        return (
          <div className="flex items-center gap-4">
            <GroupFormDialog group={group} type="edit">
              <Pencil className="cursor-pointer text-primary w-5" />
            </GroupFormDialog>
            <DeleteGroupDialog groupId={group.id}>
              <Trash2 className="cursor-pointer text-red-400 w-5" />
            </DeleteGroupDialog>
          </div>
        );
      },
    },
  ];

  return {
    columns,
  };
};
