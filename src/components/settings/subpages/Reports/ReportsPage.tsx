import SettingsLayout from "../../settings-layout";
import { toast } from "@/components/ui/use-toast";
import TableSkeleton from "@/components/common/skeleton/table-skeleton";
import { DataTable } from "./TableView/DataTable";
import { useQuery } from "@tanstack/react-query";
import { FlowerSpinner } from "react-epic-spinners";
import { useReportsColumns } from "./TableView/Columns";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import PaginationAndSizeFooter from "@/components/common/PaginationAndSizeFooter/PaginationAndSizeFooter";
import ReportsManager from "@/managers/ReportsManager";

const ReportsPage = () => {
  const { t } = useTranslation("settings");
  const { columns } = useReportsColumns();
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["reports", "page", page, "size", size],
    queryFn: () => ReportsManager.getReports(page, size),
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
      title: t("reports.failed"),
    });
    return <></>;
  }

  return (
    <SettingsLayout>
      {isLoading && <TableSkeleton />}
      {!isLoading && (
        <>
          <DataTable columns={columns} data={data!.reports} />
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

export default ReportsPage;
