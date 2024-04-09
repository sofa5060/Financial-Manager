import { ColumnDef } from "@tanstack/react-table";
import { Template } from "../schema";
import { ClipboardPlus, Eye, Pen, Trash2 } from "lucide-react";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import DeleteModal from "../Dialogs/DeleteModal";
import { useNavigate } from "react-router-dom";
import { formatDateTime } from "@/lib/utils";

export const useTemplatesColumns = () => {
  const navigate = useNavigate();

  const columns: ColumnDef<Template>[] = [
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
        <DataTableColumnHeader column={column} title="Created At" />
      ),
      cell({ row }) {
        return formatDateTime(row.original.created_at);
      },
      meta: {
        header: "Created At",
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
            <ClipboardPlus
              className="cursor-pointer text-primary w-5"
              onClick={() => {
                navigate(`/accounts/templates/${templateId}/apply`);
              }}
            />
            <Eye
              className="cursor-pointer text-primary w-5"
              onClick={() => {
                navigate(`/accounts/templates/${templateId}/view`);
              }}
            />
            <Pen
              className="cursor-pointer text-primary w-5"
              onClick={() => {
                navigate(`/accounts/templates/${templateId}`);
              }}
            />
            <DeleteModal templateId={templateId}>
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
