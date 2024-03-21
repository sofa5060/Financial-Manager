import { OrganizationChartFlatEntry } from "@/components/orgchart/org-table/columns";
import { create } from "zustand";

interface OrgChartState {
  data: OrganizationChartFlatEntry[];
  setData: (newData: OrganizationChartFlatEntry[]) => void;
  lastRefetched: Date;
  refetch: () => void;
}

const useOrgChartStore = create<OrgChartState>()((set) => ({
  data: [],
  setData: (newData) => set(() => ({ data: newData })),
  lastRefetched: new Date(),
  refetch: () => set(() => ({ lastRefetched: new Date() })),
}));

export default useOrgChartStore;
