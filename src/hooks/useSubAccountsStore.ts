import { SubAccount } from "@/components/Accounts/schema";
import { create } from "zustand";

type state = {
  subAccounts: SubAccount[];
  enSubAccountOptions: { value: number; label: string }[];
  arSubAccountOptions: { value: number; label: string }[];
  subAccountCodesOptions: { value: number; label: string }[];
};

type actions = {
  setSubAccounts: (subAccounts: SubAccount[]) => void;
};

export const useSubAccountsStore = create<state & actions>((set) => ({
  subAccounts: [],
  enSubAccountOptions: [],
  arSubAccountOptions: [],
  subAccountCodesOptions: [],
  setSubAccounts: (subAccounts) =>
    set({
      subAccounts,
      enSubAccountOptions: subAccounts.map((subAccount) => ({
        value: subAccount.id,
        label: subAccount.name_en,
      })),
      arSubAccountOptions: subAccounts.map((subAccount) => ({
        value: subAccount.id,
        label: subAccount.name_ar,
      })),
      subAccountCodesOptions: subAccounts.map((subAccount) => ({
        value: subAccount.id,
        label: subAccount.code,
      })),
    }),
}));
