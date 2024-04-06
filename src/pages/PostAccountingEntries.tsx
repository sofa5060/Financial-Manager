import PaginationAndSizeFooter from "@/components/common/PaginationAndSizeFooter/PaginationAndSizeFooter";
import { usePostAccountingEntriesColumns } from "@/components/Entries/TableView/Columns";
import { DataTable } from "@/components/Entries/TableView/DataTable";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import AccountingEntriesManager from "@/managers/AccountingEntriesManager";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FlowerSpinner } from "react-epic-spinners";

const PostAccountingEntries = () => {
  const columns = usePostAccountingEntriesColumns();
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["entries", "post", "page", page],
    queryFn: () => AccountingEntriesManager.getPostEntries(page, size),
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
      title: "Failed to fetch entries",
    });
    return <></>;
  }

  console.log(data)

  return (
    <div>
      <div className="flex gap-5 justify-between">
        <h1 className="font-semibold text-2xl">
          Accounting Entries / <span className="text-primary">Post</span>
        </h1>
        <div className="flex gap-5">
          <Button className="btn-outline">Print Selected</Button>
        </div>
      </div>
      <DataTable data={data!.entries} columns={columns} />
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
export default PostAccountingEntries;
