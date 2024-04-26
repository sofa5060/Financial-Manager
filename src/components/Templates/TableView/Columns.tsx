import { ColumnDef } from "@tanstack/react-table";
import { Template } from "../schema";
import { ClipboardPlus, Eye, Pen, Trash2 } from "lucide-react";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import DeleteModal from "../Dialogs/DeleteModal";
import { useNavigate } from "react-router-dom";
import { formatDate } from "@/lib/utils";
import { useTranslation } from "react-i18next";

export const useTemplatesColumns = () => {
  const { t } = useTranslation("templates");
  const navigate = useNavigate();

  const columns: ColumnDef<Template>[] = [
    {
      accessorKey: "id",
      header: t("serial"),
      meta: {
        header: t("serial"),
      },
    },
    {
      accessorKey: "created_at",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("createdAt")} />
      ),
      cell({ row }) {
        return formatDate(row.original.created_at);
      },
      meta: {
        header: t("createdAt"),
      },
    },
    {
      accessorKey: "title",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("title")} />
      ),
      meta: {
        header: t("title"),
      },
    },
    {
      id: "actions",
      header: t("actions"),
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
        header: t("actions"),
      },
    },
  ];

  return columns;
};
