import { TaskSubCategory } from "@/components/settings/subpages/tasks-subcategories/columns";
import { create } from "zustand";

interface TaskSubCategoriesState {
  data: TaskSubCategory[];
  setData: (newData: TaskSubCategory[]) => void;
  lastRefetched: Date;
  refetch: () => void;
}

const useTasksSubCategoriesStore = create<TaskSubCategoriesState>()((set) => ({
  data: [],
  setData: (newData) => set(() => ({ data: newData })),
  lastRefetched: new Date(),
  refetch: () => set(() => ({ lastRefetched: new Date() })),
}));

export default useTasksSubCategoriesStore;
