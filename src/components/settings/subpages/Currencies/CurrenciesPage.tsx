import SettingsLayout from "../../settings-layout";
import { toast } from "@/components/ui/use-toast";
import TableSkeleton from "@/components/common/skeleton/table-skeleton";
import { DataTable } from "./TableView/DataTable";
import CurrenciesManager from "@/managers/CurrenciesManager";
import { useQuery } from "@tanstack/react-query";
import { FlowerSpinner } from "react-epic-spinners";
import { useCurrenciesColumns } from "./TableView/Columns";
import { useTranslation } from "react-i18next";

const CurrenciesPage = () => {
  const { t } = useTranslation("settings");
  const { columns } = useCurrenciesColumns();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["currencies"],
    queryFn: CurrenciesManager.getCurrencies,
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
      title: t("currency.failed"),
    });
    return <></>;
  }

  return (
    <SettingsLayout>
      {isLoading && <TableSkeleton />}
      {!isLoading && <DataTable columns={columns} data={data!} />}
    </SettingsLayout>
  );
};

export default CurrenciesPage;
