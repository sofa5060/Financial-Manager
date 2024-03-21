import { ColumnDef } from "@tanstack/react-table";

import { OrgTitleUpdateDialog } from "./org-title-update-dialog";
import { OrgTitleDeleteDialog } from "./org-title-delete-dialog";
import { useTranslation } from "react-i18next";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type OrgTitle = {
  _id: string;
  id: string;
  name: string;
};

export const useTitlesColumns = () => {
  const { t } = useTranslation("settings");
  
  const columns: ColumnDef<OrgTitle>[] = [
    {
      accessorKey: "name",
      header: t("settings.titles.table.header.names"),
    },

    {
      id: "actions",
      header: () => <div className="w-[80px] float-right">{t("settings.titles.table.header.actions")}</div>,
      meta: {
        align: "right",
      },
      cell: ({ row }) => {
        const orgTitle = row.original;

        return (
          <div className="float-right min-w-max">
            <OrgTitleUpdateDialog title={orgTitle} />
            <OrgTitleDeleteDialog title={orgTitle} />
          </div>
        );
      },
    },
  ];

  return { columns };
};
