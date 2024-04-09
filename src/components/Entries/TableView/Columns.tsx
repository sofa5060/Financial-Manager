import { ColumnDef } from "@tanstack/react-table";
import { Entry } from "../schema";
import {
  Eye,
  PackageCheckIcon,
  Pencil,
  TableProperties,
  Trash2,
  Undo,
} from "lucide-react";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";
import ReverseEntry from "../Dialogs/ReverseEntry";
import { formatDateTime } from "@/lib/utils";
import DeleteModal from "../Dialogs/DeleteModal";
import { useNavigate } from "react-router-dom";
import PostModal from "../Dialogs/PostModal";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const useParkAccountingEntriesColumns = () => {
  const navigate = useNavigate();
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
      cell({ row }) {
        return formatDateTime(row.original.date);
      },
      meta: {
        header: "Document Date",
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
      accessorKey: "amount",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Amount" />
      ),
      meta: {
        header: "Amount",
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
          <div className="flex gap-2 items-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Eye
                    className="cursor-pointer text-primary w-5"
                    onClick={() => {
                      navigate(`/accounting-entries/park/${entry.id}/view`);
                    }}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>View Entry</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Pencil
              className="cursor-pointer text-primary w-5"
              onClick={() => {
                navigate(`/accounting-entries/park/${entry.id}`);
              }}
            />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <TableProperties
                    className="cursor-pointer text-primary w-5"
                    onClick={() => {
                      navigate(`/transactions/park?entry=${entry.id}`);
                    }}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>View Transactions</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <PostModal entryId={entry.id}>
                    <PackageCheckIcon className="cursor-pointer text-primary w-5" />
                  </PostModal>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Post Entry</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <DeleteModal entryId={entry.id}>
              <Trash2 className="cursor-pointer text-red-400 w-5" />
            </DeleteModal>
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
  const navigate = useNavigate();
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
      cell({ row }) {
        return formatDateTime(row.original.date);
      },
      meta: {
        header: "Document Date",
      },
    },
    {
      accessorKey: "posted_at",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Posting Date" />
      ),
      cell({ row }) {
        return formatDateTime(row.original.posted_at!);
      },
      meta: {
        header: "Document Date",
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
      accessorKey: "amount",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Amount" />
      ),
      meta: {
        header: "Amount",
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
            <Eye
              className="cursor-pointer text-primary w-5"
              onClick={() => {
                navigate(`/transactions/post?entry=${entry.id}`);
              }}
            />
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
