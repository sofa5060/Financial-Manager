import { ColumnDef } from "@tanstack/react-table";
import CurrencyFormDialog from "../Dialogs/CurrencyFormDialog";
import { Pencil, Trash2 } from "lucide-react";
import DeleteCurrencyDialog from "../Dialogs/DeleteCurrencyDialog";
import { Currency } from "../schema";
import { useTranslation } from "react-i18next";

export const useCurrenciesColumns = () => {
  const { t } = useTranslation("settings");

  const columns: ColumnDef<Currency>[] = [
    {
      accessorKey: "id",
      header: t("serial"),
    },
    {
      accessorKey: "currency",
      header: t("currency"),
    },
    {
      accessorKey: "appreviation",
      header: t("abbreviation"),
    },
    {
      accessorKey: "default_rate",
      header: t("defaultRate"),
    },
    {
      accessorKey: "functional_currency",
      header: t("functionalCurrency"),
      cell: ({ row }) => {
        const currency = row.original;

        return currency.functional_currency ? "Yes" : "No";
      },
    },
    {
      id: "actions",
      header: () => <div className="w-[80px]">{t("actions")}</div>,
      cell: ({ row }) => {
        const currency = row.original;

        return (
          <div className="flex items-center gap-4">
            <CurrencyFormDialog currency={currency} type="edit">
              <Pencil className="cursor-pointer text-primary w-5" />
            </CurrencyFormDialog>
            <DeleteCurrencyDialog currencyId={currency.id}>
              <Trash2 className="cursor-pointer text-red-400 w-5" />
            </DeleteCurrencyDialog>
          </div>
        );
      },
    },
  ];

  return {
    columns,
  };
};
