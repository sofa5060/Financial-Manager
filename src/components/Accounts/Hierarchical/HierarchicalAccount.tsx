import { Eye, Pen, Plus, Trash2 } from "lucide-react";
import { Account } from "../shema";
import { Button } from "@/components/ui/button";
import HierarchicalAccounts from "./HierarchicalAccounts";
import { cn } from "@/lib/utils";

type HierarchicalAccountProps = {
  account: Account;
  level?: number;
  lastElement?: boolean;
  addChild: () => void;
};


const HierarchicalAccount = ({
  account,
  level = 1,
  lastElement = false,
  addChild,
}: HierarchicalAccountProps) => {

  return (
    <div className="flex items-stretch">
      <div
        className={cn(
          "border-l-2 border-dashed border-[#E4E4E7]",
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
                    "border-l-2 border-dashed border-[#E4E4E7] h-1/2 -ml-0.5 mt-0.5"
                  )}
                ></div>
              )}
              <div className="border-b-2 border-dashed border-[#E4E4E7] w-12 h-1 self-center"></div>
            </div>
          )}
          <div className="flex items-center gap-4 mt-4">
            <div className="p-3 ring-1 max-w-max rounded-md ring-[#E4E4E7]">
              <div className="border-l-4 border-primary pl-2 flex items-center gap-12">
                <div className="flex flex-col gap-2">
                  <h4 className="text-sm">{account.name}</h4>
                  <div className="flex items-center gap-2">
                    <h5 className="text-xs bg-primary text-white px-2">
                      {account.serial}
                    </h5>
                    <h4 className="text-sm">{account.type}</h4>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 text-primary cursor-pointer" />
                  <Pen className="w-4 text-[#A16207] cursor-pointer" />
                  <Trash2 className="w-4 text-destructive cursor-pointer" />
                </div>
              </div>
            </div>
            <Button className="btn-outline" onClick={addChild}>
              <Plus className="w-4 mr-1" />
              Add New Sub Account
            </Button>
          </div>
        </div>
        {account.children.length > 0 && (
          <div className="ml-12">
            <HierarchicalAccounts
              accounts={account.children}
              level={level + 1}
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default HierarchicalAccount;
