import { ColumnDef } from "@tanstack/react-table";
import { Transaction } from "../schema";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";

export const useParkAccountTransactionsColumns = () => {
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
      accessorKey: "created_at",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Document Date" />
      ),
      meta: {
        header: "Document Date",
      },
    },
    {
      accessorKey: "posted_by",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="User" />
      ),
      meta: {
        header: "User",
      },
    },
    {
      accessorKey: "posted_by_id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Account Code" />
      ),
      meta: {
        header: "Account Code",
      },
    },
    {
      accessorKey: "type",
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
    // {
    //   id: "actions",
    //   header: "Actions",
    //   cell: ({row}) => {
    //     const bondId = row.original.id;
    //     return (
    //       <div className="flex gap-2">
    //         <Eye className="cursor-pointer text-primary w-5" />
    //         <DeleteModal bondId={bondId}>
    //           <Trash2 className="cursor-pointer text-red-400 w-5" />
    //         </DeleteModal>
    //       </div>
    //     );
    //   },
    //   meta: {
    //     header: "Actions",
    //   },
    // },
  ];

  return columns;
};

export const usePostAccountTransactionsColumns = () => {
  const columns = useParkAccountTransactionsColumns();

  return columns;
};
