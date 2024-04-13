import SettingsLayout from "../../settings-layout";
import { toast } from "@/components/ui/use-toast";
import TableSkeleton from "@/components/common/skeleton/table-skeleton";
import { DataTable } from "./TableView/DataTable";
import CategoriesManager from "@/managers/CategoriesManager";
import { useQuery } from "@tanstack/react-query";
import { FlowerSpinner } from "react-epic-spinners";
import { useCategoriesColumns } from "./TableView/Columns";
import { useState } from "react";
import PaginationAndSizeFooter from "@/components/common/PaginationAndSizeFooter/PaginationAndSizeFooter";

const CategoriesPage = () => {
  const { columns } = useCategoriesColumns();
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["categories", "page", page, "size", size],
    queryFn: () => CategoriesManager.getCategories(page, size),
  });

  if (isLoading)
    return (
      <div className="grid place-items-center w-full h-full min-h-screen">
        <FlowerSpinner color="green" size={100} />
      </div>
    );

  if (isError) {
    toast({
      variant: "destructive",
      title: "Failed to fetch categories",
    });
    return <></>;
  }

  return (
    <SettingsLayout>
      {isLoading && <TableSkeleton />}
      {!isLoading && (
        <>
          <DataTable columns={columns} data={data!.categories} />
          <PaginationAndSizeFooter
            page={page}
            setPage={setPage}
            totalPages={data!.totalPages}
            size={size}
            setSize={setSize}
          />
        </>
      )}
    </SettingsLayout>
  );
};

export default CategoriesPage;
