import { ColumnDef } from "@tanstack/react-table";
import CategoryFormDialog from "../Dialogs/CategoryFormDialog";
import { Pencil, Trash2 } from "lucide-react";
import { Category } from "../schema";
import DeleteCategoryDialog from "../Dialogs/DeleteCategoryDialog";

export const useCategoriesColumns = () => {
  // const { t } = useTranslation("settings");

  const columns: ColumnDef<Category>[] = [
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
        const category = row.original;

        return (
          <div className="flex items-center gap-4">
            <CategoryFormDialog category={category} type="edit">
              <Pencil className="cursor-pointer text-primary w-5" />
            </CategoryFormDialog>
            <DeleteCategoryDialog categoryId={category.id}>
              <Trash2 className="cursor-pointer text-red-400 w-5" />
            </DeleteCategoryDialog>
          </div>
        );
      },
    },
  ];

  return {
    columns,
  };
};
