"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "@/components/ui/data-table-view-options";
import { useTranslation } from "react-i18next";

// import { RequestCreateDialog } from "../dialogs/request-create-dialog";
// import { useDueStatuses, usePriorities, useRoles, useStatuses } from "./data";
// import { DataTableFacetedFilter } from "./DataTableFactedFilter";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const { t } = useTranslation("templates");
  const isFiltered = table.getState().columnFilters.length > 0;

  // const { statuses } = useStatuses();
  // const { priorities } = usePriorities();
  // const { roles } = useRoles();
  // const { dueStatuses } = useDueStatuses();

  return (
    <div className="flex items-center justify-between max-lg:justify-start gap-4 flex-wrap">
      <div className="flex flex-1 items-center gap-2 gap-y-4 flex-wrap">
        <Input
          placeholder={t("search.placeholder")}
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="h-10 w-[150px] lg:w-[350px]"
        />
        {/* {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title={"status"}
            options={statuses}
          />
        )}
        {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title={t("requests.priority")}
            options={priorities}
          />
        )}
        {table.getColumn("role") && (
          <DataTableFacetedFilter
            column={table.getColumn("role")}
            title={t("requests.table.header.role")}
            options={roles}
          />
        )}
        {table.getColumn("due_status") && (
          <DataTableFacetedFilter
            column={table.getColumn("due_status")}
            title={t("requests.table.header.dueStatus")}
            options={dueStatuses}
          />
        )} */}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset filters
            <Cross2Icon className="ms-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex gap-2 gap-y-4 flex-wrap">
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
