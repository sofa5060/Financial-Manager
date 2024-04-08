import { SubAccount } from "@/components/Accounts/schema";
import { create } from "zustand";

type state = {
  subAccounts: SubAccount[];
  subAccountOptions: { value: string; label: string }[];
};

type actions = {
  setSubAccounts: (subAccounts: SubAccount[]) => void;
};

export const useSubAccountsStore = create<state & actions>((set) => ({
  subAccounts: [],
  subAccountOptions: [],
  setSubAccounts: (subAccounts) =>
    set({
      subAccounts,
      subAccountOptions: subAccounts.map((subAccount) => ({
        value: subAccount.code,
        label: subAccount.name_en,
      })),
    }),
}));
