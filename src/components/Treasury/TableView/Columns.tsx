import { ColumnDef } from "@tanstack/react-table";
import { TreasuryBond } from "../schema";
import { Eye, Trash2 } from "lucide-react";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";
import DeleteModal from "../Dialogs/DeleteModal";

export const useTreasuryPaymentBondsColumns = () => {
  const columns: ColumnDef<TreasuryBond>[] = [
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
      accessorKey: "posted_at",
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
        <DataTableColumnHeader column={column} title="Title" />
      ),
      meta: {
        header: "Title",
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
      cell: ({row}) => {
        const bondId = row.original.id;
        return (
          <div className="flex gap-2">
            <Eye className="cursor-pointer text-primary w-5" />
            <DeleteModal bondId={bondId}>
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

export const useTreasuryReceiptBondsColumns = () => {
  const columns = useTreasuryPaymentBondsColumns();

  return columns;
};
