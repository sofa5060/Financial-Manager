"use client";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { X } from "lucide-react";
import { TaskSubCategoryCreateDialog } from "./tasks-subcategory-create-dialog";
import { useTranslation } from "react-i18next";

interface TasksSubCategoriesTableToolbarProps<TData> {
  table: Table<TData>;
}

export function TasksSubCategoriesTableToolbar<TData>({
  table,
}: TasksSubCategoriesTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const { t } = useTranslation("settings");

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder={t("settings.subCategories.filter.placeholder")}
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {/* {table.getColumn("type") && (
          <TasksSubCategoriesTableFacetedFilter
            column={table.getColumn("type")}
            title="Type"
            options={types}
          />
        )} */}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            {t("settings.subCategories.filter.reset")}
            <X className="ms-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex items-center gap-4">
        {/* TODO: Fix this prop drilling */}
        <TaskSubCategoryCreateDialog />
      </div>
    </div>
  );
}
