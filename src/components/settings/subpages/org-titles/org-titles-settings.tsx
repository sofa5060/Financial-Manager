import { useCallback, useEffect, useState } from "react";
import SettingsLayout from "../../settings-layout";
import { useTitlesColumns } from "./columns";
import { DataTable } from "./data-table";
import { toast } from "@/components/ui/use-toast";
import TableSkeleton from "@/components/common/skeleton/table-skeleton";
import OrganizationsTitlesManager from "@/managers/organizations-titles-manager";
import useOrgTitlesStore from "@/hooks/settings/use-org-titles-store";
import { useAuthStore } from "@/hooks/useAuthStore";

const OrgTitlesSettingsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { data, setData, lastRefetched } = useOrgTitlesStore();
  const token = useAuthStore((state) => state.token);

  const { columns } = useTitlesColumns();

  const fetchTasksCategories = useCallback(async () => {
    try {
      setIsLoading(true);
      const fetchedData = await OrganizationsTitlesManager.getTitles(
        token as string
      );
      setData(fetchedData.data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Couldn't fetch data from server",
      });
    } finally {
      setIsLoading(false);
    }
  }, [token, setData, setIsLoading]);

  useEffect(() => {
    fetchTasksCategories();
  }, [fetchTasksCategories, lastRefetched]);

  return (
    <SettingsLayout>
      {isLoading && <TableSkeleton />}
      {!isLoading && <DataTable columns={columns} data={data} />}
    </SettingsLayout>
  );
};

export default OrgTitlesSettingsPage;
