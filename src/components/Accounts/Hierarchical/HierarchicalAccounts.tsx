import { cn } from "@/lib/utils";
import { Account } from "../schema";
import HierarchicalAccount from "./HierarchicalAccount";
import { useState } from "react";

type HierarchicalAccountsProps = {
  accounts: Account[];
  level?: number;
  parentAccount?: Account;
};
const HierarchicalAccounts = ({
  accounts,
  level = 1,
  parentAccount,
}: HierarchicalAccountsProps) => {
  const [accountsClone, setAccountsClone] = useState(accounts);

  const addChild = (account: Account) => {
    const newAccount: Account = {
      id: "4",
      code: "AA11125",
      name_en: "New Sub Account",
      name_ar: "New Sub Account",
      properties: "main",
      reporting_type: "balance_sheet",
      cost_center: false,
      categories: [1],
      currencies: [1],
      type: "credit",
      children: [],
    };
    account.children.push(newAccount);
    setAccountsClone([...accountsClone]);
  };

  return (
    <div className={cn("flex items-stretch", { "ml-12": level > 1 })}>
      <div>
        {accountsClone.map((account, index) => (
          <HierarchicalAccount
            account={account}
            level={level}
            key={account.id}
            lastElement={index === accountsClone.length - 1}
            addChild={() => addChild(account)}
            parentAccount={parentAccount}
          />
        ))}
      </div>
    </div>
  );
};
export default HierarchicalAccounts;
