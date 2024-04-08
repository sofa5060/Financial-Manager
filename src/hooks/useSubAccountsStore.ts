import { SubAccount } from "@/components/Accounts/schema";
import { create } from "zustand";

type state = {
  subAccounts: SubAccount[];
  subAccountOptions: { value: number; label: string }[];
  subAccountCodesOptions: { value: number; label: string }[];
};

type actions = {
  setSubAccounts: (subAccounts: SubAccount[]) => void;
};

export const useSubAccountsStore = create<state & actions>((set) => ({
  subAccounts: [],
  subAccountOptions: [],
  subAccountCodesOptions: [],
  setSubAccounts: (subAccounts) =>
    set({
      subAccounts,
      subAccountOptions: subAccounts.map((subAccount) => ({
        value: subAccount.id,
        label: subAccount.name_en,
      })),
      subAccountCodesOptions: subAccounts.map((subAccount) => ({
        value: subAccount.id,
        label: subAccount.code,
      })),
    }),
}));
