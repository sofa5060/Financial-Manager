import { ColumnDef } from "@tanstack/react-table";
import { OrganizationDepartmentUpdateDialog } from "./org-department-update-dialog";
import { OrganizationDepartmentDeleteDialog } from "./org-department-delete-dialog";
import { useTranslation } from "react-i18next";
import { User } from "@/components/users/users-table/columns";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type OrgDepartment = {
  _id: string;
  id: string;
  name: string;
  manager: User;
};

export const useDepartmentsColumns = () => {
  const { t } = useTranslation("settings");

  const columns: ColumnDef<OrgDepartment>[] = [
    {
      accessorKey: "name",
      header: t("settings.departments.table.header.names"),
    },
    {
      accessorKey: "manager.name",
      header: "Manager",
    },
    {
      id: "actions",
      header: () => (
        <div className="w-[80px] float-right">
          {t("settings.departments.table.header.actions")}
        </div>
      ),
      meta: {
        align: "right",
      },
      cell: ({ row }) => {
        const department = row.original;

        return (
          <div className="float-right min-w-max">
            <OrganizationDepartmentUpdateDialog department={department} />
            <OrganizationDepartmentDeleteDialog department={department} />
          </div>
        );
      },
    },
  ];

  return {
    columns,
  };
};
