import { Bank } from "@/components/settings/subpages/banks/schema";
import { create } from "zustand";

type State = {
  banks: Bank[];
  banksOptions: { value: number; label: string }[];
};

type Actions = {
  setBanks: (banks: Bank[]) => void;
};

export const useBanksStore = create<State & Actions>((set) => ({
  banks: [],
  defaultBank: null,
  banksOptions: [],
  setBanks: (banks) =>
    set({
      banks,
      banksOptions: banks.map((bank) => ({
        value: bank.id,
        label: bank.name_en,
      })),
    }),
}));
