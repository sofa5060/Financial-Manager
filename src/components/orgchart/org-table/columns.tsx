import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { OrgChartUpdateDialog } from "./org-chart-update-dialog";
import { cn } from "@/lib/utils";
import { useTypes } from "./data";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type OrganizationChartFlatEntry = {
  id: string;
  _id: string;
  name: string;
  email: string;
  dep_name?: string;
  department_id?: string;
  title?: string;
  title_id?: string;
  managers: string;
  level: number;

  type: "admin" | "user";
};

export const useOrgChartColumns = () => {
  const { t } = useTranslation("orgchart");

  const { types } = useTypes();

  const columns: ColumnDef<OrganizationChartFlatEntry>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {t("orgChart.table.header.name")}
            <ArrowUpDown className="ms-2 h-4 w-4" />
          </Button>
        );
      },
      meta: {
        header: t("orgChart.table.header.name"),
      },
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {t("orgChart.table.header.email")}
            <ArrowUpDown className="ms-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ getValue }) => {
        const value = getValue() as ReactNode;
        return value;
      },
      meta: {
        header: t("orgChart.table.header.email"),
      },
    },
    {
      accessorKey: "type",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {t("orgChart.table.header.type")}
            <ArrowUpDown className="ms-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ getValue }) => {
        const value = getValue() as ReactNode;
        const type = types.find((t) => t.value === value);
        console.log("type", type, value);
        if (!type) return value;
        const Icon = type.icon;
        return (
          <Badge
            className={cn(
              "bg-green-100 text-green-700 capitalize",
              value === "admin" && "bg-blue-100 text-blue-700"
            )}
          >
            <Icon className="h-4 w-4" />
            <span>{type.label}</span>
          </Badge>
        );
      },
      meta: {
        header: t("orgChart.table.header.type"),
      },
    },
    {
      accessorKey: "level",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {t("orgChart.table.header.level")}
            <ArrowUpDown className="ms-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ getValue }) => {
        const value = getValue() as ReactNode;
        if (!value)
          return <Badge className="bg-orange-600 text-white">New</Badge>;
        return <Badge className="bg-green-700 text-white">{value}</Badge>;
      },
      meta: {
        header: t("orgChart.table.header.level"),
      },
    },
    {
      accessorKey: "dep_name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {t("orgChart.table.header.department")}
            <ArrowUpDown className="ms-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ getValue }) => {
        const value = getValue() as ReactNode;
        if (!value) return "N/A";
        return value;
      },
      meta: {
        header: t("orgChart.table.header.department"),
      },
    },
    {
      accessorKey: "managers",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {t("orgChart.table.header.directManager")}
            <ArrowUpDown className="ms-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ getValue }) => {
        const value = getValue() as ReactNode;
        if (!value) return "N/A";
        return value;
      },
      meta: {
        header: t("orgChart.table.header.directManager"),
      },
    },
    {
      id: "actions",
      header: () => <div>{t("orgChart.table.header.actions")}</div>,
      meta: {
        align: "right",
        header: t("orgChart.table.header.actions"),
      },
      cell: ({ row }) => {
        const entry = row.original;
        return (
          <div className="">
            <OrgChartUpdateDialog entry={entry} />
          </div>
        );
      },
    },
  ];

  return {
    columns,
  };
};
