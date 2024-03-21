import { useCallback, useEffect, useState } from "react";
import SettingsLayout from "../../settings-layout";
import { DataTable } from "./data-table";
import { toast } from "@/components/ui/use-toast";
import TableSkeleton from "@/components/common/skeleton/table-skeleton";
import TasksSubCategoriesManager from "@/managers/tasks-subcategories-manager";
import { useSubCategoriesColumns } from "./columns";
import useTasksSubCategoriesStore from "@/hooks/settings/use-tasks-subcategories-store";
import { useAuthStore } from "@/hooks/useAuthStore";

const TasksSubCategoriesPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { data, setData, lastRefetched } = useTasksSubCategoriesStore();
  const token = useAuthStore((state) => state.token);

  const { columns } = useSubCategoriesColumns();

  const fetchTasksSubCategories = useCallback(async () => {
    try {
      setIsLoading(true);
      const fetchedData = await TasksSubCategoriesManager.getTasksSubCategories(
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
    fetchTasksSubCategories();
  }, [fetchTasksSubCategories, lastRefetched]);

  return (
    <SettingsLayout>
      {isLoading && <TableSkeleton />}
      {!isLoading && <DataTable columns={columns} data={data} />}
    </SettingsLayout>
  );
};

export default TasksSubCategoriesPage;
