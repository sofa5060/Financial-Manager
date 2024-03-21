import { ColumnDef } from "@tanstack/react-table";

import { TasksCategoryUpdateDialog } from "./tasks-category-update-dialog";
import { TasksCategoryDeleteDialog } from "./tasks-category-delete-dialog";
import { useTranslation } from "react-i18next";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type TaskCategory = {
  _id: string;
  id: string;
  name: string;
};

export const useCategoriesColumns = () => {
  const { t } = useTranslation("settings");
  
  const columns: ColumnDef<TaskCategory>[] = [
    {
      accessorKey: "name",
      header: t("settings.categories.table.header.name"),
    },

    {
      id: "actions",
      header: () => <div className="w-[80px] float-right">{t("settings.categories.table.header.actions")}</div>,
      meta: {
        align: "right",
      },
      cell: ({ row }) => {
        const taskCategory = row.original;

        return (
          <div className="float-right">
            <TasksCategoryUpdateDialog category={taskCategory} />
            <TasksCategoryDeleteDialog category={taskCategory} />
          </div>
        );
      },
    },
  ];

  return { columns };
};
