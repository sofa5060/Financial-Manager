import SettingsLayout from "../../settings-layout";
import { toast } from "@/components/ui/use-toast";
import TableSkeleton from "@/components/common/skeleton/table-skeleton";
import { DataTable } from "./TableView/DataTable";
import BanksManager from "@/managers/BanksManager";
import { useQuery } from "@tanstack/react-query";
import { FlowerSpinner } from "react-epic-spinners";
import { useBanksColumns } from "./TableView/Columns";

const BanksPage = () => {
  const { columns } = useBanksColumns();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["banks"],
    queryFn: () => BanksManager.getBanks(),
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
      title: "Failed to fetch banks",
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

export default BanksPage;
