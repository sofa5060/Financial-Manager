import { ColumnDef } from "@tanstack/react-table";
import { TreasuryBond } from "../schema";
import { Eye, Pen, Trash2 } from "lucide-react";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";
import DeleteModal from "../Dialogs/DeleteModal";
import { formatDate } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCurrenciesStore } from "@/hooks/useCurrenciesStore";

export const useTreasuryPaymentBondsColumns = () => {
  const { t } = useTranslation("treasury");
  const navigate = useNavigate();
  const defaultCurrency = useCurrenciesStore((state) => state.defaultCurrency);

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
          className="rtl:float-right mx-4"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="cursor-pointer mx-4"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "serial",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("serial")} />
      ),
      meta: {
        header: t("serial"),
      },
    },
    {
      accessorKey: "code",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("documentNo")} />
      ),
      meta: {
        header: t("documentNo"),
      },
    },
    {
      accessorKey: "date",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("documentDate")} />
      ),
      cell: ({ row }) => {
        return formatDate(row.original.date);
      },
      meta: {
        header: t("documentDate"),
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
      accessorKey: "created_by_name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("user")} />
      ),
      meta: {
        header: t("user"),
      },
    },
    {
      accessorKey: "status",
      header: t("status"),
      cell: ({ row }) => {
        return row.original.status === "park" ? t("park") : t("post");
      },
    },
    {
      accessorKey: "type",
      header: t("paymentWay"),
      cell: ({ row }) => {
        return row.original.type === "check" ? t("check") : t("cash");
      },
    },
    {
      accessorKey: "amount",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("amountColumn", { currency: defaultCurrency?.appreviation })}
        />
      ),
      meta: {
        header: t("amount"),
      },
    },
    {
      accessorKey: "currency",
      header: t("currency"),
      meta: {
        header: t("currency"),
      },
    },
    {
      id: "actions",
      header: t("actions"),
      cell: ({ row }) => {
        const bondId = row.original.id;
        return (
          <div className="flex gap-2">
            <Eye
              className="cursor-pointer text-primary w-5"
              onClick={() => navigate(`/treasury/payment/${bondId}/view`)}
            />
            {row.original.status === "park" && (
              <>
                <Pen
                  className="cursor-pointer text-primary w-5"
                  onClick={() => navigate(`/treasury/payment/${bondId}`)}
                />
                <DeleteModal bondId={bondId}>
                  <Trash2 className="cursor-pointer text-red-400 w-5" />
                </DeleteModal>
              </>
            )}
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

export const useTreasuryReceiptBondsColumns = () => {
  const { t } = useTranslation("treasury");
  const navigate = useNavigate();
  const defaultCurrency = useCurrenciesStore((state) => state.defaultCurrency);

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
          className="rtl:float-right mx-4"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="cursor-pointer mx-4"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "serial",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("serial")} />
      ),
      meta: {
        header: t("serial"),
      },
    },
    {
      accessorKey: "code",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("documentNo")} />
      ),
      meta: {
        header: t("documentNo"),
      },
    },
    {
      accessorKey: "date",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("documentDate")} />
      ),
      cell: ({ row }) => {
        return formatDate(row.original.date);
      },
      meta: {
        header: t("documentDate"),
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
      accessorKey: "created_by_name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("user")} />
      ),
      meta: {
        header: t("user"),
      },
    },
    {
      accessorKey: "status",
      header: t("status"),
      cell: ({ row }) => {
        return row.original.status === "park" ? t("park") : t("post");
      },
    },
    {
      accessorKey: "type",
      header: t("paymentWay"),
      cell: ({ row }) => {
        return row.original.type === "check" ? t("check") : t("cash");
      },
    },
    {
      accessorKey: "amount",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("amountColumn", { currency: defaultCurrency?.appreviation })}
        />
      ),
      meta: {
        header: t("amount"),
      },
    },
    {
      accessorKey: "currency",
      header: t("currency"),
      meta: {
        header: t("currency"),
      },
    },
    {
      id: "actions",
      header: t("actions"),
      cell: ({ row }) => {
        const bondId = row.original.id;
        return (
          <div className="flex gap-2">
            <Eye
              className="cursor-pointer text-primary w-5"
              onClick={() => navigate(`/treasury/receive/${bondId}/view`)}
            />
            {row.original.status === "park" && (
              <>
                <Pen
                  className="cursor-pointer text-primary w-5"
                  onClick={() => navigate(`/treasury/receive/${bondId}`)}
                />
                <DeleteModal bondId={bondId}>
                  <Trash2 className="cursor-pointer text-red-400 w-5" />
                </DeleteModal>
              </>
            )}
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
