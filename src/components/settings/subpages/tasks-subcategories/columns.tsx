import { ColumnDef } from "@tanstack/react-table";

import { TasksSubCategoryUpdateDialog } from "./tasks-subcategory-update-dialog";
import { TasksSubCategoryDeleteDialog } from "./tasks-subcategory-delete-dialog";
import { TaskCategory } from "../tasks-categories/columns";
import { useTranslation } from "react-i18next";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type TaskSubCategory = {
  _id: string;
  id: string;
  name: string;
  category: TaskCategory;
};

export const useSubCategoriesColumns = () => {
  const { t } = useTranslation("settings");
  const columns: ColumnDef<TaskSubCategory>[] = [
    {
      accessorKey: "name",
      header: t("settings.subCategories.table.header.names"),
    },
    {
      accessorKey: "category.name",
      header: t("settings.subCategories.table.header.category"),
    },
    {
      id: "actions",
      header: () => (
        <div className="w-[80px] float-right">
          {t("settings.subCategories.table.header.actions")}
        </div>
      ),
      meta: {
        align: "right",
      },
      cell: ({ row }) => {
        const taskSubCategory = row.original;

        return (
          <div className="float-right min-w-max">
            <TasksSubCategoryUpdateDialog subCategory={taskSubCategory} />
            <TasksSubCategoryDeleteDialog subCategory={taskSubCategory} />
          </div>
        );
      },
    },
  ];

  return {
    columns,
  };
};
