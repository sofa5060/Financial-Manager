import { Button } from "@/components/ui/button";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { UserUpdateDialog } from "./user-update-dialog";
import { UserDeleteDialog } from "./user-delete-dialog";
import { useTranslation } from "react-i18next";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type User = {
  id: string;
  _id: string;
  name: string;
  email: string;
  phone: string;
  organization_name: string;
  type: "admin" | "user";
};

export const useUsersColumns = () => {
  const { t } = useTranslation("users");

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {t("users.table.header.name")}
            <ArrowUpDown className="ms-2 h-4 w-4" />
          </Button>
        );
      },
      meta: {
        header: t("users.table.header.name"),
      },
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {t("users.table.header.email")}
            <ArrowUpDown className="ms-2 h-4 w-4" />
          </Button>
        );
      },
      meta: {
        header: t("users.table.header.email"),
      },
    },
    {
      accessorKey: "phone",
      header: t("users.table.header.phone"),
      meta: {
        header: t("users.table.header.phone"),
      },
    },
    {
      accessorKey: "organization_name",
      header: t("users.table.header.organization"),
      meta: {
        header: t("users.table.header.organization"),
      },
    },
    // {
    //   accessorKey: "type",
    //   header: ({ column }) => {
    //     return (
    //       <Button
    //         variant="ghost"
    //         className="p-0"
    //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //       >
    //         {t("users.table.header.type")}
    //         <ArrowUpDown className="ms-2 h-4 w-4" />
    //       </Button>
    //     );
    //   },
    //   meta: {
    //     header: t("users.table.header.type"),
    //   },
    //   cell: ({ getValue }) => {
    //     const value = getValue() as ReactNode;
    //     return (
    //       <Badge
    //         className={cn(
    //           "bg-green-100 text-green-700 capitalize",
    //           value === "admin" && "bg-blue-100 text-blue-700"
    //         )}
    //       >
    //         {value}
    //       </Badge>
    //     );
    //   },
    // },
    {
      id: "actions",
      header: () => (
        <div className="w-[80px] float-right">
          {t("users.table.header.actions")}
        </div>
      ),
      cell: ({ row }) => {
        const user = row.original;

        return (
          <div className="float-right min-w-max">
            <UserUpdateDialog user={user} />
            <UserDeleteDialog user={user} />
          </div>
        );
      },
      meta: {
        header: t("users.table.header.actions"),
      },
    },
  ];

  return { columns };
};
