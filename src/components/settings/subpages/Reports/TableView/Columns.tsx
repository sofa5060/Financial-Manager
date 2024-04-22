import { ColumnDef } from "@tanstack/react-table";
import ReportFormDialog from "../Dialogs/ReportFormDialog";
import { Pencil, Trash2 } from "lucide-react";
import DeleteReportDialog from "../Dialogs/DeleteReportDialog";
import {  Report } from "../schema";
import { useTranslation } from "react-i18next";

export const useReportsColumns = () => {
  const { t } = useTranslation("settings");

  const columns: ColumnDef<Report>[] = [
    {
      accessorKey: "id",
      header: t("serial"),
    },
    {
      accessorKey: "name_en",
      header: t("enName"),
    },
    {
      accessorKey: "name_ar",
      header: t("arName"),
    },
    {
      id: "actions",
      header: () => <div className="w-[80px]">{t("actions")}</div>,
      cell: ({ row }) => {
        const report = row.original;

        return (
          <div className="flex items-center gap-4">
            <ReportFormDialog report={report} type="edit">
              <Pencil className="cursor-pointer text-primary w-5" />
            </ReportFormDialog>
            <DeleteReportDialog reportId={report.id}>
              <Trash2 className="cursor-pointer text-red-400 w-5" />
            </DeleteReportDialog>
          </div>
        );
      },
    },
  ];

  return {
    columns,
  };
};
