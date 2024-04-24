import { Bank } from "@/components/settings/subpages/banks/schema";
import { create } from "zustand";

type State = {
  banks: Bank[];
  enBanksOptions: { value: number; label: string }[];
  arBanksOptions: { value: number; label: string }[];
};

type Actions = {
  setBanks: (banks: Bank[]) => void;
};

export const useBanksStore = create<State & Actions>((set) => ({
  banks: [],
  defaultBank: null,
  enBanksOptions: [],
  arBanksOptions: [],
  setBanks: (banks) =>
    set({
      banks,
      enBanksOptions: banks.map((bank) => ({
        value: bank.id,
        label: bank.name_en,
      })),
      arBanksOptions: banks.map((bank) => ({
        value: bank.id,
        label: bank.name_ar,
      }))
    }),
}));
