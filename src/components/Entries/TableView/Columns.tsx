import { ColumnDef } from "@tanstack/react-table";
import { Entry } from "../schema";
import { Eye, Undo } from "lucide-react";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";
import ReverseEntry from "../Dialogs/ReverseEntry";

export const useParkAccountingEntriesColumns = () => {
  const columns: ColumnDef<Entry>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value: boolean) =>
            table.toggleAllPageRowsSelected(!!value)
          }
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "code",
      header: "Serial",
      meta: {
        header: "Serial",
      },
    },
    {
      accessorKey: "date",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Document Date" />
      ),
      meta: {
        header: "Document Date",
      },
    },
    {
      accessorKey: "updated_at",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Posting Date" />
      ),
      meta: {
        header: "Posting Date",
      },
    },
    {
      accessorKey: "title",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="title" />
      ),
      meta: {
        header: "Title",
      },
    },
    {
      accessorKey: "created_by_name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="User" />
      ),
      meta: {
        header: "User",
      },
    },
    {
      accessorKey: "currency",
      header: "Currency",
      meta: {
        header: "Currency",
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const entry = row.original;
        return (
          <div className="flex gap-2">
            <Eye className="cursor-pointer text-primary w-5" />
            <ReverseEntry entry={entry}>
              <Undo className="cursor-pointer text-red-400 w-5" />
            </ReverseEntry>
          </div>
        );
      },
      meta: {
        header: "Actions",
      },
    },
  ];

  return columns;
};

export const usePostAccountingEntriesColumns = () => {
  const columns = useParkAccountingEntriesColumns();
  columns.splice(3, 1);

  return columns;
};
