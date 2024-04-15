import { ColumnDef } from "@tanstack/react-table";
import { Transaction } from "../schema";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { formatDateTime } from "@/lib/utils";
import { useTranslation } from "react-i18next";

export const usePostAccountTransactionsColumns = () => {
  const { t } = useTranslation("transactions");

  const columns: ColumnDef<Transaction>[] = [
    {
      accessorKey: "id",
      header: t("serial"),
      meta: {
        header: t("serial"),
      },
    },
    {
      accessorKey: "code",
      header: t("documentNo"),
      meta: {
        header: t("documentNo"),
      },
    },
    {
      accessorKey: "date",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("date")} />
      ),
      cell: ({ row }) => {
        return formatDateTime(row.original.date);
      },
      meta: {
        header: t("date"),
      },
    },
    {
      accessorKey: "posted_at",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("posted_at")} />
      ),
      cell: ({ row }) => {
        return formatDateTime(row.original.posted_at!);
      },
      meta: {
        header: t("posted_at"),
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
      accessorKey: "account_code",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("accountCode")} />
      ),
      meta: {
        header: t("accountCode"),
      },
    },
    {
      accessorKey: "account_name_en",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("accountName")} />
      ),
      meta: {
        header: t("accountName"),
      },
    },
    {
      accessorKey: "description",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("description")} />
      ),
      meta: {
        header: t("description"),
      },
    },
    {
      accessorKey: "cost_center",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("costCenter")} />
      ),
      meta: {
        header: t("costCenter"),
      },
      cell: ({ row }) => {
        return <span>{row.original.cost_center ? "Yes" : "No"}</span>;
      },
    },
    {
      accessorKey: "debit",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("debit")} />
      ),
      meta: {
        header: t("debit"),
      },
    },
    {
      accessorKey: "credit",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("credit")} />
      ),
      meta: {
        header: t("credit"),
      },
    },
    {
      accessorKey: "currency",
      header: t("currency"),
      meta: {
        header: t("currency"),
      },
    },
  ];

  return columns;
};

export const useParkAccountTransactionsColumns = () => {
  const columns = usePostAccountTransactionsColumns();

  columns.splice(3, 1);

  return columns;
};
