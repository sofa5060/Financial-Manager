import { cn } from "@/lib/utils";
import { Account } from "../shema";
import HierarchicalAccount from "./HierarchicalAccount";
import { useState } from "react";

type HierarchicalAccountsProps = {
  accounts: Account[];
  level?: number;
};
const HierarchicalAccounts = ({
  accounts,
  level = 1,
}: HierarchicalAccountsProps) => {
  const [accountsClone, setAccountsClone] = useState(accounts);

  const addChild = (account: Account) => {
    const newAccount = {
      id: "4",
      serial: "AA11125",
      name: "New Sub Account",
      type: "Asset",
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
          />
        ))}
      </div>
    </div>
  );
};
export default HierarchicalAccounts;
