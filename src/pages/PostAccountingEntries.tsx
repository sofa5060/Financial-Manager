import PaginationAndSizeFooter from "@/components/common/PaginationAndSizeFooter/PaginationAndSizeFooter";
import { usePostAccountingEntriesColumns } from "@/components/Entries/TableView/Columns";
import { DataTable } from "@/components/Entries/TableView/DataTable";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import AccountingEntriesManager from "@/managers/AccountingEntriesManager";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FlowerSpinner } from "react-epic-spinners";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

const PostAccountingEntries = () => {
  const { t } = useTranslation("entries");
  const [searchParams] = useSearchParams();
  const columns = usePostAccountingEntriesColumns();
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);

  const { data, isLoading, isError } = useQuery({
    queryKey: [
      "entries",
      "post",
      "page",
      page,
      "size",
      size,
      "search",
      searchParams.toString(),
    ],
    queryFn: () =>
      AccountingEntriesManager.getPostEntries(
        page,
        size,
        searchParams.toString()
      ),
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
      title: t("entries.failed"),
    });
    return <></>;
  }

  return (
    <div>
      <div className="flex gap-5 justify-between">
        <h1 className="font-semibold text-2xl">
          {t("accountingEntries")} /{" "}
          <span className="text-primary">{t("post")}</span>
        </h1>
        <div className="flex gap-5">
          <Button className="btn-outline">{t("printSelected")}</Button>
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
