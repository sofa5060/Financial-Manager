import { OrgDepartment } from "@/components/settings/subpages/org-departments/columns";
import { create } from "zustand";

interface OrgDepartmentsState {
  data: OrgDepartment[];
  setData: (newData: OrgDepartment[]) => void;
  lastRefetched: Date;
  refetch: () => void;
}

const useOrgDepartmentsStore = create<OrgDepartmentsState>()((set) => ({
  data: [],
  setData: (newData) => set(() => ({ data: newData })),
  lastRefetched: new Date(),
  refetch: () => set(() => ({ lastRefetched: new Date() })),
}));

export default useOrgDepartmentsStore;
