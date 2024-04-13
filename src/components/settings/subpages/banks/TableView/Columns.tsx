import { ColumnDef } from "@tanstack/react-table";
import BankFormDialog from "../Dialogs/BankFormDialog";
import { Pencil, Trash2 } from "lucide-react";
import DeleteBankDialog from "../Dialogs/DeleteBankDialog";
import { Bank } from "../schema";

export const useBanksColumns = () => {
  // const { t } = useTranslation("settings");

  const columns: ColumnDef<Bank>[] = [
    {
      accessorKey: "id",
      header: "Serial",
    },
    {
      accessorKey: "name_en",
      header: "English Name",
    },
    {
      accessorKey: "name_ar",
      header: "Arabic Name",
    },
    {
      id: "actions",
      header: () => <div className="w-[80px]">Actions</div>,
      cell: ({ row }) => {
        const bank = row.original;

        return (
          <div className="flex items-center gap-4">
            <BankFormDialog bank={bank} type="edit">
              <Pencil className="cursor-pointer text-primary w-5" />
            </BankFormDialog>
            <DeleteBankDialog bankId={bank.id}>
              <Trash2 className="cursor-pointer text-red-400 w-5" />
            </DeleteBankDialog>
          </div>
        );
      },
    },
  ];

  return {
    columns,
  };
};
