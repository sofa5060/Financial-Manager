import PaginationAndSizeFooter from "@/components/common/PaginationAndSizeFooter/PaginationAndSizeFooter";
import { useParkAccountTransactionsColumns } from "@/components/Transactions/TableView/Columns";
import { DataTable } from "@/components/Transactions/TableView/DataTable";
import { toast } from "@/components/ui/use-toast";
import TransactionsManager from "@/managers/TransactionsManager";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FlowerSpinner } from "react-epic-spinners";
import { useSearchParams } from "react-router-dom";

const ParkAccountsTransactions = () => {
  const [searchParams] = useSearchParams();
  const columns = useParkAccountTransactionsColumns();
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);

  const { data: EntryTransactions, isError: searchError, isLoading: isSearching } = useQuery({
    queryKey: ["transactions", "park", "entry", searchParams.get("entry")],
    queryFn: () => TransactionsManager.getTransactionsOfEntry(parseInt(searchParams.get("entry")!)),
    enabled: searchParams.get("entry") != null && searchParams.get("entry")!.length > 0,
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["transactions", "park", "page", page, "size", size, "search", searchParams.toString()],
    queryFn: () => TransactionsManager.getParkTransactions(page, size, searchParams.toString()),
  });

  useEffect(() => {
    const page = parseInt(searchParams.get("page") || "1");
    const size = parseInt(searchParams.get("size") || "10");

    setPage(page);
    setSize(size);
  }, [searchParams]);

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

  return (
    <div>
      <div className="flex gap-5 justify-between">
        <h1 className="font-semibold text-2xl">
          Accounting Transactions<span className="text-primary"> / Park</span>
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
export default ParkAccountsTransactions;
