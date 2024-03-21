import { useCallback, useEffect, useState } from "react";
import SettingsLayout from "../../settings-layout";
import { useDepartmentsColumns } from "./columns";
import { DataTable } from "./data-table";
import { toast } from "@/components/ui/use-toast";
import TableSkeleton from "@/components/common/skeleton/table-skeleton";
import OrganizationsDepartmentsManager from "@/managers/organizations-departments-manager";
import useOrgDepartmentsStore from "@/hooks/settings/use-org-departments-store";
import { useAuthStore } from "@/hooks/useAuthStore";

const OrgDepartmentsSettingsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { data, setData, lastRefetched } = useOrgDepartmentsStore();
  const token = useAuthStore((state) => state.token);

  const { columns } = useDepartmentsColumns();

  const fetchOrgDepartmentsSettings = useCallback(async () => {
    try {
      setIsLoading(true);
      const fetchedData = await OrganizationsDepartmentsManager.getDepartments(
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
    fetchOrgDepartmentsSettings();
  }, [fetchOrgDepartmentsSettings, lastRefetched]);

  return (
    <SettingsLayout>
      {isLoading && <TableSkeleton />}
      {!isLoading && (
        <DataTable
          onRefetch={fetchOrgDepartmentsSettings}
          columns={columns}
          data={data}
        />
      )}
    </SettingsLayout>
  );
};

export default OrgDepartmentsSettingsPage;
