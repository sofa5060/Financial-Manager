import { ColumnDef } from "@tanstack/react-table";
import CurrencyFormDialog from "../Dialogs/CurrencyFormDialog";
import { Pencil, Trash2 } from "lucide-react";
import DeleteCurrencyDialog from "../Dialogs/DeleteCurrencyDialog";
import { Currency } from "../schema";

export const useCurrenciesColumns = () => {
  // const { t } = useTranslation("settings");

  const columns: ColumnDef<Currency>[] = [
    {
      accessorKey: "id",
      header: "Serial",
    },
    {
      accessorKey: "currency",
      header: "Currency",
    },
    {
      accessorKey: "appreviation",
      header: "Abbreviation",
    },
    {
      accessorKey: "default_rate",
      header: "Default Rate",
    },
    {
      accessorKey: "functional_currency",
      header: "Functional Currency",
      cell: ({ row }) => {
        const currency = row.original;

        return currency.functional_currency ? "Yes" : "No";
      },
    },
    {
      id: "actions",
      header: () => <div className="w-[80px]">Actions</div>,
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
