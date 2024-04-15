import PaginationAndSizeFooter from "@/components/common/PaginationAndSizeFooter/PaginationAndSizeFooter";
import { usePostAccountTransactionsColumns } from "@/components/Transactions/TableView/Columns";
import { DataTable } from "@/components/Transactions/TableView/DataTable";
import { toast } from "@/components/ui/use-toast";
import TransactionsManager from "@/managers/TransactionsManager";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FlowerSpinner } from "react-epic-spinners";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

const PostAccountsTransactions = () => {
  const { t } = useTranslation("transactions");
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
    queryKey: ["transactions", "post", "page", page, "size", size, "search", searchParams.toString()],
    queryFn: () => TransactionsManager.getPostTransactions(page, size, searchParams.toString()),
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

  console.log(EntryTransactions)

  return (
    <div>
      <div className="flex gap-5 justify-between">
        <h1 className="font-semibold text-2xl">
          {t("accountingTransactions")}<span className="text-primary"> / {t("post")}</span>
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
