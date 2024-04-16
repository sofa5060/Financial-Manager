import { ColumnDef } from "@tanstack/react-table";
import { Entry } from "../schema";
import {
  Eye,
  PackageCheckIcon,
  Pencil,
  SaveAll,
  TableProperties,
  Trash2,
  Undo,
} from "lucide-react";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";
import ReverseEntry from "../Dialogs/ReverseEntry";
import { cn, formatDateTime } from "@/lib/utils";
import DeleteModal from "../Dialogs/DeleteModal";
import { useNavigate } from "react-router-dom";
import PostModal from "../Dialogs/PostModal";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import TemplatesManager from "@/managers/TemplatesManager";
import { toast } from "@/components/ui/use-toast";
import { useTranslation } from "react-i18next";

export const useParkAccountingEntriesColumns = () => {
  const { t } = useTranslation("entries");
  const queryClient = useQueryClient();

  const { mutate: saveTemplateMutate, isPending } = useMutation({
    mutationFn: TemplatesManager.addTemplate,
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Failed to save template",
        description: error.message,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["templates"] });
      toast({
        title: "Template saved successfully",
      });
    },
  });

  const navigate = useNavigate();
  const columns: ColumnDef<Entry>[] = [
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
          className="rtl:float-right mx-8"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="cursor-pointer mx-8"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: t("documentNo"),
      meta: {
        header: t("documentNo"),
      },
    },
    {
      accessorKey: "code",
      header: t("serial"),
      meta: {
        header: t("serial"),
      },
    },
    {
      accessorKey: "date",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("documentDate")} />
      ),
      cell({ row }) {
        return formatDateTime(row.original.date);
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
      getUniqueValues: (entry) => {
        return [entry.created_by];
      },
      meta: {
        header: t("user"),
      },
    },
    {
      accessorKey: "amount",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("amount")} />
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
        const entry = row.original;
        return (
          <div className="flex gap-2 items-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Eye
                    className="cursor-pointer text-primary w-5"
                    onClick={() => {
                      navigate(`/accounting-entries/park/${entry.id}/view`);
                    }}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t("viewEntry")}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Pencil
              className="cursor-pointer text-primary w-5"
              onClick={() => {
                navigate(`/accounting-entries/park/${entry.id}`);
              }}
            />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <TableProperties
                    className="cursor-pointer text-primary w-5"
                    onClick={() => {
                      navigate(`/transactions/park?entry=${entry.id}`);
                    }}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t("viewTransactions")}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <PostModal entryId={entry.id}>
                    <PackageCheckIcon className="cursor-pointer text-primary w-5" />
                  </PostModal>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t("postEntry")}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <SaveAll
              className={cn("cursor-pointer text-primary w-5", {
                "opacity-50": isPending,
              })}
              onClick={() => {
                if (isPending) return;
                saveTemplateMutate(entry.id);
              }}
            />
            <DeleteModal entryId={entry.id}>
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

export const usePostAccountingEntriesColumns = () => {
  const { t } = useTranslation("entries");
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: saveTemplateMutate, isPending } = useMutation({
    mutationFn: TemplatesManager.addTemplate,
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Failed to save template",
        description: error.message,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["templates"] });
      toast({
        title: "Entry saved successfully",
      });
    },
  });

  const columns: ColumnDef<Entry>[] = [
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
          className="rtl:float-right mx-8"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="cursor-pointer mx-8"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: t("documentNo"),
      meta: {
        header: t("documentNo"),
      },
    },
    {
      accessorKey: "code",
      header: t("serial"),
      meta: {
        header: t("serial"),
      },
    },
    {
      accessorKey: "date",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("documentDate")} />
      ),
      cell({ row }) {
        return formatDateTime(row.original.date);
      },
      meta: {
        header: t("documentDate"),
      },
    },
    {
      accessorKey: "posted_at",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("postingDate")} />
      ),
      cell({ row }) {
        return formatDateTime(row.original.posted_at!);
      },
      meta: {
        header: t("postingDate"),
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
      getUniqueValues: (entry) => {
        return [entry.created_by];
      },
      meta: {
        header: t("user"),
      },
    },
    {
      accessorKey: "amount",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("amount")} />
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
        const entry = row.original;
        return (
          <div className="flex gap-2">
            <Eye
              className="cursor-pointer text-primary w-5"
              onClick={() => {
                navigate(`/accounting-entries/park/${entry.id}/view`);
              }}
            />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <TableProperties
                    className="cursor-pointer text-primary w-5"
                    onClick={() => {
                      navigate(`/transactions/park?entry=${entry.id}`);
                    }}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t("viewTransactions")}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <SaveAll
              className={cn("cursor-pointer text-primary w-5", {
                "opacity-50": isPending,
              })}
              onClick={() => {
                if (isPending) return;
                saveTemplateMutate(entry.id);
              }}
            />
            <ReverseEntry entry={entry}>
              <Undo className="cursor-pointer text-red-400 w-5" />
            </ReverseEntry>
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
