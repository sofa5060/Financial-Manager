import { useCallback, useEffect, useState } from "react";
import SettingsLayout from "../../settings-layout";
import { useCategoriesColumns } from "./columns";
import { DataTable } from "./data-table";
import TasksCategoriesManager from "@/managers/tasks-categories-manager";
import { toast } from "@/components/ui/use-toast";
import TableSkeleton from "@/components/common/skeleton/table-skeleton";
import useTasksCategoriesStore from "@/hooks/settings/use-tasks-categories-store";
import { useAuthStore } from "@/hooks/useAuthStore";

const TasksCategoriesPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { data, setData, lastRefetched } = useTasksCategoriesStore();
  const token = useAuthStore((state) => state.token);

  const { columns } = useCategoriesColumns();

  const fetchTasksCategories = useCallback(async () => {
    try {
      setIsLoading(true);
      const fetchedData = await TasksCategoriesManager.getTasksCategories(
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

export default TasksCategoriesPage;
