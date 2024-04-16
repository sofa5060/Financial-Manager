import CostCenterForm from "@/components/CostCenters/Hierarchical/CostCenterForm";
// import Filter from "@/components/CostCenters/Hierarchical/Filter";
import HierarchicalCostCenters from "@/components/CostCenters/Hierarchical/HierarchicalCostCenters";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { useStateCallback } from "@/hooks/useStateCallBack";
import CostCentersManager from "@/managers/CostCentersManager";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { Plus } from "lucide-react";
import { useState } from "react";
import { FlowerSpinner } from "react-epic-spinners";
import { useTranslation } from "react-i18next";

const CostCentersCharts = () => {
  const [collapseAll, setCollapseAll] = useStateCallback(false);
  const [expandAll, setExpandAll] = useStateCallback(false);
  const { t } = useTranslation("costCenters");
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchTerm = useDebounce(searchQuery, 500);

  const { data: searchResults, isError: searchError } = useQuery({
    queryKey: ["searchCostCenters", debouncedSearchTerm],
    queryFn: () => CostCentersManager.searchCostCenters(debouncedSearchTerm),
    enabled: debouncedSearchTerm.length > 0,
  });

  const {
    data: costCenters,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["costCenters"],
    queryFn: CostCentersManager.getCostCenters,
  });

  const collapseAllCostCenters = () => {
    setCollapseAll(true, () => {
      setCollapseAll(false);
    });
  };

  const expandAllCostCenters = () => {
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
      title: "Failed to fetch cost centers",
    });
    return <></>;
  }

  return (
    <div className="pb-12">
      <div className="sticky top-16 pt-2 bg-white">
        <div className="flex justify-between max-sm:flex-col gap-4">
          <h1 className="text-primary text-3xl font-semibold">
            {t("costCenters")}
          </h1>
          <div className="flex">
            <div className="flex gap-4 flex-wrap">
              <Button className="btn-outline">{t("download")}</Button>
              <Button className="btn-outline" onClick={collapseAllCostCenters}>
                {t("collapseAll")}
              </Button>
              <Button className="btn-outline" onClick={expandAllCostCenters}>
                {t("expandAll")}
              </Button>
            </div>
          </div>
        </div>
        <div className="flex mb-4 mt-4 justify-between gap-16 max-sm:flex-col max-sm:gap-4">
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
        <HierarchicalCostCenters
          costCenters={searchResults! ?? costCenters!}
          collapseAll={collapseAll}
          expandAll={expandAll}
        />
      </div>
      <div className="fixed md:bottom-16 md:ltr:right-32 md:rtl:left-32 w-[90vw] bottom-8">
        <CostCenterForm level={1}>
          <Button className="btn btn-primary">
            <Plus className="w-5 h-5 me-2" />
            {t("create.level1")}
          </Button>
        </CostCenterForm>
      </div>
    </div>
  );
};
export default CostCentersCharts;
