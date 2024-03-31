import { cn } from "@/lib/utils";
import { Account } from "../schema";
import HierarchicalAccount from "./HierarchicalAccount";

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
  return (
    <div className={cn("flex items-stretch", { "ml-12": level > 1 })}>
      <div>
        {accounts.map((account, index) => (
          <HierarchicalAccount
            account={account}
            level={level}
            key={account.id}
            lastElement={index === accounts.length - 1}
            addChild={() => {}}
            parentAccount={parentAccount}
          />
        ))}
      </div>
    </div>
  );
};
export default HierarchicalAccounts;
