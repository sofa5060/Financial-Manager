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
      <div className="flex justify-between">
        <h1 className="text-primary text-3xl font-semibold">{t("charts")}</h1>
        <Button className="btn-outline">{t("download")}</Button>
      </div>
      <div className="flex mb-4 mt-8 justify-between gap-16">
        <Input
          placeholder={t("search")}
          className="max-w-2xl"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="flex gap-4">
          <Button className="btn-outline" onClick={collapseAllAccounts}>
            {t("collapseAll")}
          </Button>
          <Button className="btn-outline" onClick={expandAllAccounts}>
            {t("expandAll")}
          </Button>
        </div>
        {/* <div className="flex gap-4">
          <Filter
            title="Filter 1"
            options={[
              { label: "Option 1", value: "1" },
              { label: "Option 2", value: "2" },
              { label: "Option 3", value: "3" },
            ]}
          />
          <Filter
            title="Filter 2"
            options={[
              { label: "Option 1", value: "1" },
              { label: "Option 2", value: "2" },
              { label: "Option 3", value: "3" },
            ]}
            defaultSelected={["1"]}
          />
          <Filter
            title="Filter 3"
            options={[
              { label: "Option 1", value: "1" },
              { label: "Option 2", value: "2" },
              { label: "Option 3", value: "3" },
            ]}
            defaultSelected={["1", "2"]}
          />
        </div> */}
      </div>
      <Separator />
      <HierarchicalAccounts
        accounts={searchResults! ?? accounts!}
        collapseAll={collapseAll}
        expandAll={expandAll}
      />
      <div className="fixed bottom-16 right-32">
        <AccountForm level={1}>
          <Button className="btn btn-primary">
            <Plus className="w-6 h-6 me-2" />
            {t("create.level1")}
          </Button>
        </AccountForm>
      </div>
    </div>
  );
};
export default AccountsCharts;
