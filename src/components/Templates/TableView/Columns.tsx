import { ColumnDef } from "@tanstack/react-table";
import { Template } from "../schema";
import { Eye, Pen, Plus, Trash2 } from "lucide-react";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";
import DeleteModal from "../Dialogs/DeleteModal";
import { useNavigate } from "react-router-dom";

export const useTemplatesColumns = () => {
  const navigate = useNavigate();

  const forwardToForm = () => {
    return navigate("/accounts/templates/new");
  };

  const columns: ColumnDef<Template>[] = [
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
      accessorKey: "created_at",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Document Date" />
      ),
      meta: {
        header: "Document Date",
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
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const templateId = row.original.id;
        return (
          <div className="flex gap-2">
            <Eye
              className="cursor-pointer text-primary w-5"
              onClick={forwardToForm}
            />
            <DeleteModal templateId={templateId}>
              <Trash2 className="cursor-pointer text-red-400 w-5" />
            </DeleteModal>
            <Pen
              className="cursor-pointer text-primary w-5"
              onClick={forwardToForm}
            />
            <Plus
              className="cursor-pointer text-primary w-5"
              onClick={forwardToForm}
            />
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
