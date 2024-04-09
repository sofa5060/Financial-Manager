import PaginationAndSizeFooter from "@/components/common/PaginationAndSizeFooter/PaginationAndSizeFooter";
import { useTemplatesColumns } from "@/components/Templates/TableView/Columns";
import { DataTable } from "@/components/Templates/TableView/DataTable";
import { toast } from "@/components/ui/use-toast";
import TemplatesManager from "@/managers/TemplatesManager";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FlowerSpinner } from "react-epic-spinners";

const AccountsTemplates = () => {
  const columns = useTemplatesColumns();
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["templates", "page", page, "size", size],
    queryFn: () => TemplatesManager.getTemplates(page, size),
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
      title: "Failed to fetch templates",
    });
    return <></>;
  }

  return (
    <div>
      <div className="flex gap-5 justify-between">
        <h1 className="font-semibold text-2xl">
          Accounting <span className="text-primary">Templates</span>
        </h1>
      </div>
      <DataTable data={data!.templates} columns={columns} />
      <PaginationAndSizeFooter
        page={page}
        setPage={setPage}
        totalPages={data!.totalPages}
        size={size}
        setSize={setSize}
      />
    </div>
  );
};
export default AccountsTemplates;
