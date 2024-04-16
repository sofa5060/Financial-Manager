import PaginationAndSizeFooter from "@/components/common/PaginationAndSizeFooter/PaginationAndSizeFooter";
import { useParkAccountingEntriesColumns } from "@/components/Entries/TableView/Columns";
import { DataTable } from "@/components/Entries/TableView/DataTable";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import AccountingEntriesManager from "@/managers/AccountingEntriesManager";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PackageCheck, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { FlowerSpinner } from "react-epic-spinners";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

const ParkAccountingEntries = () => {
  const { t } = useTranslation("entries");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const columns = useParkAccountingEntriesColumns();
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [selectedEntries, setSelectedEntries] = useState<number[]>([]);

  const queryClient = useQueryClient();
  const { mutate: postEntriesMutate, isPending } = useMutation({
    mutationFn: AccountingEntriesManager.postEntries,
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Failed to post entry",
        description: error.message,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["entries"] });
      await queryClient.invalidateQueries({ queryKey: ["transactions"] });

      toast({
        title: "Entries posted successfully",
      });
    },
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: [
      "entries",
      "park",
      "page",
      page,
      "size",
      size,
      "search",
      searchParams.toString(),
    ],
    queryFn: () =>
      AccountingEntriesManager.getParkEntries(
        page,
        size,
        searchParams.toString()
      ),
  });

  useEffect(() => {
    const page = parseInt(searchParams.get("page") || "1");
    const size = parseInt(searchParams.get("size") || "10");

    setPage(page);
    setSize(size);
  }, [searchParams]);

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
      <div className="flex gap-5 justify-between max-sm:flex-col">
        <h1 className="font-semibold text-2xl">
          {t("accountingEntries")} /{" "}
          <span className="text-primary">{t("park")}</span>
        </h1>
        <div className="flex gap-4 flex-wrap">
          <Button className="btn-outline">{t("printSelected")}</Button>
          {selectedEntries.length > 0 && (
            <Button
              className="me-4"
              disabled={isPending}
              onClick={() => {
                postEntriesMutate(selectedEntries);
              }}
            >
              <PackageCheck className="me-2 w-4" />
              {t("postSelected")}
            </Button>
          )}
          <Button
            className="btn-primary"
            onClick={() => {
              navigate("/accounting-entries/park/new");
            }}
          >
            <Plus className="me-2 w-4" />
            {t("newEntry")}
          </Button>
        </div>
      </div>
      <DataTable
        data={data!.entries}
        columns={columns}
        setSelectedEntries={setSelectedEntries}
      />
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
export default ParkAccountingEntries;
