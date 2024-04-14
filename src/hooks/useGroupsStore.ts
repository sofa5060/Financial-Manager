import { Group } from "@/components/settings/subpages/Gropus/schema";
import { create } from "zustand";

type State = {
  groups: Group[];
  groupsOptions: { value: number; label: string }[];
};

type Actions = {
  setGroups: (currencies: Group[]) => void;
};

export const useGroupsStore = create<State & Actions>((set) => ({
  groups: [],
  groupsOptions: [],
  setGroups: (groups) =>
    set({
      groups,
      groupsOptions: groups.map((group) => ({
        value: group.id,
        label: group.name_en,
      })),
    }),
}));
