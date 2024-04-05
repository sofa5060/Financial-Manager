import CostCenterForm from "@/components/CostCenters/Hierarchical/CostCenterForm";
import Filter from "@/components/CostCenters/Hierarchical/Filter";
import HierarchicalCostCenters from "@/components/CostCenters/Hierarchical/HierarchicalCostCenters";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import CostCentersManager from "@/managers/CostCentersManager";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { Plus } from "lucide-react";
import { useState } from "react";
import { FlowerSpinner } from "react-epic-spinners";

const CostCentersCharts = () => {
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
      <div className="flex justify-between">
        <h1 className="text-primary text-3xl font-semibold">Cost Centers</h1>
        <Button className="btn-outline">Download Excel File</Button>
      </div>
      <div className="flex mb-4 mt-8 justify-between gap-16">
        <Input
          placeholder="Search by code or name"
          className="max-w-2xl"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="flex gap-4">
          <Filter
            title="Filter 1"
            options={[
              { label: "Option 1", value: "1" },
              { label: "Option 2", value: "2" },
              { label: "Option 3", value: "3" },
            ]}
            defaultSelected={["1"]}
          />
          <Filter
            title="Filter 2"
            options={[
              { label: "Option 1", value: "1" },
              { label: "Option 2", value: "2" },
              { label: "Option 3", value: "3" },
            ]}
          />
          <Filter
            title="Filter 3"
            options={[
              { label: "Option 1", value: "1" },
              { label: "Option 2", value: "2" },
              { label: "Option 3", value: "3" },
            ]}
          />
        </div>
      </div>
      <Separator />
      <HierarchicalCostCenters costCenters={searchResults! ?? costCenters!} />
      <div className="fixed bottom-16 right-32">
        <CostCenterForm level={1}>
          <Button className="btn btn-primary">
            <Plus className="w-6 h-6 mr-2" />
            Create Cost Center in Level 1
          </Button>
        </CostCenterForm>
      </div>
    </div>
  );
};
export default CostCentersCharts;
