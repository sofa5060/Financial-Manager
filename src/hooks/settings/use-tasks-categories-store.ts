import { TaskCategory } from "@/components/settings/subpages/tasks-categories/columns";
import { create } from "zustand";

interface TaskCategoriesState {
  data: TaskCategory[];
  setData: (newData: TaskCategory[]) => void;
  lastRefetched: Date;
  refetch: () => void;
}

const useTasksCategoriesStore = create<TaskCategoriesState>()((set) => ({
  data: [],
  setData: (newData) => set(() => ({ data: newData })),
  lastRefetched: new Date(),
  refetch: () => set(() => ({ lastRefetched: new Date() })),
}));

export default useTasksCategoriesStore;
