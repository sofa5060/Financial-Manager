import {
  ArrowDownFromLine,
  ArrowLeftFromLine,
  ArrowRightFromLine,
  Eye,
  Pen,
  Plus,
  Trash2,
} from "lucide-react";
import { Account } from "../schema";
// import { Button } from "@/components/ui/button";
import HierarchicalAccounts from "./HierarchicalAccounts";
import { cn } from "@/lib/utils";
import AccountForm from "./AccountForm";
import DeleteModal from "./DeleteModal";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type HierarchicalAccountProps = {
  account: Account;
  level?: number;
  lastElement?: boolean;
  addChild: () => void;
  parentAccount?: Account;
  collapseAll: boolean;
  expandAll: boolean;
};

const HierarchicalAccount = ({
  account,
  level = 1,
  lastElement = false,
  parentAccount,
  collapseAll,
  expandAll,
}: HierarchicalAccountProps) => {
  const { i18n } = useTranslation("accounts");
  const [hideChildren, setHideChildren] = useState(level !== 1);

  useEffect(() => {
    if (collapseAll) {
      setHideChildren(true);
    } else if (expandAll) {
      setHideChildren(false);
    }
  }, [collapseAll, expandAll]);

  if (!account) return <></>;

  return (
    <div className="flex items-stretch">
      <div
        className={cn(
          "border-s-2 border-dashed border-[#E4E4E7]",
          lastElement && "h-0",
          level === 1 && "hidden"
        )}
      ></div>
      <div>
        <div className="flex items-stretch">
          {level > 1 && (
            <div className="flex">
              {lastElement && (
                <div
                  className={cn(
                    "border-s-2 border-dashed border-[#E4E4E7] h-1/2 -ms-0.5 mt-0.5"
                  )}
                ></div>
              )}
              <div className="border-b-2 border-dashed border-[#E4E4E7] w-6 h-1 self-center"></div>
            </div>
          )}
          <div className="flex items-center gap-4 mt-4">
            <div className="p-3 ring-1 max-w-max rounded-md ring-[#E4E4E7]">
              <div
                className={cn("border-s-4 ps-2 flex items-center gap-4", {
                  "border-primary": account.properties === "main",
                  "border-[#A16207]": account.properties === "sub",
                })}
              >
                <div className="flex gap-2">
                  <div className="flex items-center gap-2">
                    <h5
                      className={cn(
                        "text-xs bg-primary text-white px-2 rounded-sm whitespace-nowrap",
                        {
                          "bg-[#A16207]": account.properties === "sub",
                        }
                      )}
                    >
                      {account.code}
                    </h5>
                  </div>
                  <h4 className="text-sm whitespace-nowrap">
                    {i18n.language === "ar" ? account.name_ar : account.name_en}
                  </h4>
                </div>
                <div className="flex items-center gap-1">
                  <AccountForm
                    level={level + 1}
                    parentAccount={parentAccount}
                    type="view"
                    account={account}
                    key="view"
                  >
                    <Eye className="w-4 text-primary cursor-pointer" />
                  </AccountForm>
                  {(!account.total_debit || account.total_debit === 0) &&
                    (!account.total_credit || account.total_credit === 0) && (
                      <AccountForm
                        level={level + 1}
                        parentAccount={parentAccount}
                        type="edit"
                        account={account}
                        key="edit"
                      >
                        <Pen className="w-4 text-[#A16207] cursor-pointer" />
                      </AccountForm>
                    )}
                  <DeleteModal accountId={account.id}>
                    <Trash2 className="w-4 text-destructive cursor-pointer" />
                  </DeleteModal>
                  {account.properties === "main" && (
                    <AccountForm level={level + 1} parentAccount={account}>
                      <Plus className="text-primary w-5" />
                    </AccountForm>
                  )}
                  {account.children && account.children.length > 0 && (
                    <div className="w-5 text-primary cursor-pointer ms-4">
                      {hideChildren ? (
                        i18n.language === "ar" ? (
                          <ArrowLeftFromLine
                            className="w-4"
                            onClick={() => setHideChildren(false)}
                          />
                        ) : (
                          <ArrowRightFromLine
                            className="w-4"
                            onClick={() => setHideChildren(false)}
                          />
                        )
                      ) : (
                        <ArrowDownFromLine
                          className="w-4"
                          onClick={() => setHideChildren(true)}
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* <AccountForm level={level + 1} parentAccount={account}>
              <Button className="btn-outline">
                <Plus className="w-4 me-1" />
                {t("subAccount.add")}
              </Button>
            </AccountForm> */}
          </div>
        </div>
        {account.children && account.children.length > 0 && (
          <div className={cn("ms-6", { hidden: hideChildren })}>
            <HierarchicalAccounts
              accounts={account.children}
              level={level + 1}
              parentAccount={account}
              collapseAll={collapseAll}
              expandAll={expandAll}
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default HierarchicalAccount;
