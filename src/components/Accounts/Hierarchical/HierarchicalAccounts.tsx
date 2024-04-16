import { cn } from "@/lib/utils";
import { Account } from "../schema";
import HierarchicalAccount from "./HierarchicalAccount";

type HierarchicalAccountsProps = {
  accounts: Account[];
  level?: number;
  parentAccount?: Account;
  collapseAll: boolean;
  expandAll: boolean;
};
const HierarchicalAccounts = ({
  accounts,
  level = 1,
  parentAccount,
  collapseAll,
  expandAll,
}: HierarchicalAccountsProps) => {
  return (
    <div className={cn("flex items-stretch", { "ms-6": level > 1 })}>
      <div>
        {accounts.map((account, index) => (
          <HierarchicalAccount
            account={account}
            level={level}
            key={account.id}
            lastElement={index === accounts.length - 1}
            addChild={() => {}}
            parentAccount={parentAccount}
            collapseAll={collapseAll}
            expandAll={expandAll}
          />
        ))}
      </div>
    </div>
  );
};
export default HierarchicalAccounts;
