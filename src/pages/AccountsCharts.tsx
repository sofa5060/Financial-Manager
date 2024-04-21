import AccountForm from "@/components/Accounts/Hierarchical/AccountForm";
// import Filter from "@/components/Accounts/Hierarchical/Filter";
import HierarchicalAccounts from "@/components/Accounts/Hierarchical/HierarchicalAccounts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import AccountsManager from "@/managers/AccountsManager";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { FlowerSpinner } from "react-epic-spinners";
import { useDebounce } from "@uidotdev/usehooks";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useStateCallback } from "@/hooks/useStateCallBack";

const AccountsCharts = () => {
  const [collapseAll, setCollapseAll] = useStateCallback(false);
  const [expandAll, setExpandAll] = useStateCallback(false);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchTerm = useDebounce(searchQuery, 500);
  const { t } = useTranslation("accounts");

  const { data: searchResults, isError: searchError } = useQuery({
    queryKey: ["searchAccounts", debouncedSearchTerm],
    queryFn: () => AccountsManager.searchAccounts(debouncedSearchTerm),
    enabled: debouncedSearchTerm.length > 0,
  });

  const {
    data: accounts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["accounts"],
    queryFn: AccountsManager.getAccounts,
  });

  const collapseAllAccounts = () => {
    setCollapseAll(true, () => {
      setCollapseAll(false);
    });
  };

  const expandAllAccounts = () => {
    setExpandAll(true, () => {
      setExpandAll(false);
    });
  };

  console.log(accounts)

  if (isLoading)
    return (
      <div className="grid place-items-center w-full h-full min-h-screen">
        <FlowerSpinner color="green" size={100} />
      </div>
    );

  if (isError || searchError) {
    toast({
      variant: "destructive",
      title: t("error"),
    });
    return <></>;
  }

  return (
    <div className="pb-12">
      <div className="lg:sticky lg:top-16 lg:pt-2 lg:bg-white">
        <div className="flex justify-between max-sm:flex-col gap-4">
          <h1 className="text-primary text-3xl font-semibold">{t("charts")}</h1>
          <div className="flex">
            <div className="flex gap-4 flex-wrap">
              <Button className="btn-outline">{t("download")}</Button>
              <Button className="btn-outline" onClick={collapseAllAccounts}>
                {t("collapseAll")}
              </Button>
              <Button className="btn-outline" onClick={expandAllAccounts}>
                {t("expandAll")}
              </Button>
            </div>
          </div>
        </div>
        <div className="flex mb-4 mt-8 justify-between gap-16 max-sm:flex-col max-sm:gap-4">
          <Input
            placeholder={t("search")}
            className="max-w-2xl"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Separator />
      </div>
      <div className="max-w-full overflow-x-auto pb-4 px-1">
        <HierarchicalAccounts
          accounts={searchResults! ?? accounts!}
          collapseAll={collapseAll}
          expandAll={expandAll}
        />
      </div>
      <div className="fixed bottom-16 md:ltr:right-32 md:rtl:left-32 max-sm:w-[90vw] max-sm:bottom-8">
        <AccountForm level={1}>
          <Button className="btn btn-primary w-full">
            <Plus className="w-6 h-6 me-2" />
            {t("create.level1")}
          </Button>
        </AccountForm>
      </div>
    </div>
  );
};
export default AccountsCharts;
