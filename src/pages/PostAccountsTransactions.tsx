import PaginationAndSizeFooter from "@/components/common/PaginationAndSizeFooter/PaginationAndSizeFooter";
import { usePostAccountTransactionsColumns } from "@/components/Transactions/TableView/Columns";
import { DataTable } from "@/components/Treasury/TableView/DataTable";
import { toast } from "@/components/ui/use-toast";
import TransactionsManager from "@/managers/TransactionsManager";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FlowerSpinner } from "react-epic-spinners";
import { useSearchParams } from "react-router-dom";

const PostAccountsTransactions = () => {
  const [searchParams] = useSearchParams();
  const columns = usePostAccountTransactionsColumns();
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);

  const { data: EntryTransactions, isError: searchError, isLoading: isSearching } = useQuery({
    queryKey: ["transactions", "post", "entry", searchParams.get("entry")],
    queryFn: () => TransactionsManager.getTransactionsOfEntry(parseInt(searchParams.get("entry")!)),
    enabled: !!searchParams.get("entry") && searchParams.get("entry")!.length > 0,
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["transactions", "post", "page", page, "size", size],
    queryFn: () => TransactionsManager.getPostTransactions(page, size),
  });

  if (isLoading || isSearching)
    return (
      <div className="grid place-items-center w-full h-full min-h-screen">
        <FlowerSpinner color="green" size={100} />
      </div>
    );

  if (isError || searchError) {
    toast({
      variant: "destructive",
      title: "Failed to fetch transactions",
    });
    return <></>;
  }

  console.log(EntryTransactions)

  return (
    <div>
      <div className="flex gap-5 justify-between">
        <h1 className="font-semibold text-2xl">
          Accounting Transactions<span className="text-primary"> / Post</span>
        </h1>
      </div>
      <DataTable data={EntryTransactions ?? data!.transactions} columns={columns} />
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
export default PostAccountsTransactions;
