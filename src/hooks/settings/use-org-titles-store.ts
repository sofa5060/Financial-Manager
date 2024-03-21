import { OrgTitle } from "@/components/settings/subpages/org-titles/columns";
import { create } from "zustand";

interface OrgTitlesState {
  data: OrgTitle[];
  setData: (newData: OrgTitle[]) => void;
  lastRefetched: Date;
  refetch: () => void;
}

const useOrgTitlesStore = create<OrgTitlesState>()((set) => ({
  data: [],
  setData: (newData) => set(() => ({ data: newData })),
  lastRefetched: new Date(),
  refetch: () => set(() => ({ lastRefetched: new Date() })),
}));

export default useOrgTitlesStore;
