import { ColumnDef } from "@tanstack/react-table";
import { Transaction } from "../schema";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { formatDateTime } from "@/lib/utils";

export const usePostAccountTransactionsColumns = () => {
  const columns: ColumnDef<Transaction>[] = [
    {
      accessorKey: "id",
      header: "Serial",
      meta: {
        header: "Serial",
      },
    },
    {
      accessorKey: "code",
      header: "Document No.",
      meta: {
        header: "Document No.",
      },
    },
    {
      accessorKey: "date",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Document Date" />
      ),
      cell: ({ row }) => {
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
      meta: {
        header: "Posting Date",
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
      accessorKey: "account_code",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Account Code" />
      ),
      meta: {
        header: "Account Code",
      },
    },
    {
      accessorKey: "account_name_en",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Account Name" />
      ),
      meta: {
        header: "Account Name",
      },
    },
    {
      accessorKey: "description",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Description" />
      ),
      meta: {
        header: "Description",
      },
    },
    {
      accessorKey: "cost_center",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Cost Center" />
      ),
      meta: {
        header: "Cost Center",
      },
      cell: ({ row }) => {
        return <span>{row.original.cost_center ? "Yes" : "No"}</span>;
      },
    },
    {
      accessorKey: "debit",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Debit" />
      ),
      meta: {
        header: "Debit",
      },
    },
    {
      accessorKey: "credit",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Credit" />
      ),
      meta: {
        header: "Credit",
      },
    },
    {
      accessorKey: "currency",
      header: "Currency",
      meta: {
        header: "Currency",
      },
    },
  ];

  return columns;
};

export const useParkAccountTransactionsColumns = () => {
  const columns = usePostAccountTransactionsColumns();

  columns.splice(3, 1);

  return columns;
};
