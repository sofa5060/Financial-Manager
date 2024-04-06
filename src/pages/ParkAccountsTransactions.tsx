import PaginationAndSizeFooter from "@/components/common/PaginationAndSizeFooter/PaginationAndSizeFooter";
import { useParkAccountTransactionsColumns } from "@/components/Transactions/TableView/Columns";
import { DataTable } from "@/components/Transactions/TableView/DataTable";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import TransactionsManager from "@/managers/TransactionsManager";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FlowerSpinner } from "react-epic-spinners";

const ParkAccountsTransactions = () => {
  const columns = useParkAccountTransactionsColumns();
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["transactions", "park", "page", page],
    queryFn: () => TransactionsManager.getParkTransactions(page, size),
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
        <div className="flex gap-5">
          <Button className="btn-outline">Print Selected</Button>
        </div>
      </div>
      <DataTable data={data!.transactions} columns={columns} />
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
