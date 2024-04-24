import { Group } from "@/components/settings/subpages/Gropus/schema";
import { create } from "zustand";

type State = {
  groups: Group[];
  enGroupsOptions: { value: number; label: string }[];
  arGroupsOptions: { value: number; label: string }[];
};

type Actions = {
  setGroups: (currencies: Group[]) => void;
};

export const useGroupsStore = create<State & Actions>((set) => ({
  groups: [],
  enGroupsOptions: [],
  arGroupsOptions: [],
  setGroups: (groups) =>
    set({
      groups,
      enGroupsOptions: groups.map((group) => ({
        value: group.id,
        label: group.name_en,
      })),
      arGroupsOptions: groups.map((group) => ({
        value: group.id,
        label: group.name_ar,
      })),
    }),
}));
