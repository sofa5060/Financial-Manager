import CostCenterForm from "@/components/CostCenters/Hierarchical/CostCenterForm";
import Filter from "@/components/CostCenters/Hierarchical/Filter";
import HierarchicalCostCenters from "@/components/CostCenters/Hierarchical/HierarchicalCostCenters";
import { CostCenter } from "@/components/CostCenters/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";

const CostCentersCharts = () => {
  const COST_CENTERS: CostCenter[] = [
    {
      id: "1",
      code: "001",
      name_en: "CostCenter 1",
      name_ar: "حساب 1",
      properties: "main",
      parentId: undefined,
      children: [
        {
          id: "2",
          code: "001.1",
          children: [],
          name_en: "CostCenter 1.1",
          name_ar: "حساب 1.1",
          properties: "sub",
          parentId: "1",
        },
      ],
    },
  ];

  return (
    <div className="pb-12">
      <div className="flex justify-between">
        <h1 className="text-primary text-3xl font-semibold">Cost Centers</h1>
        <Button className="btn-outline">Download Excel File</Button>
      </div>
      <div className="flex mb-4 mt-8 justify-between gap-16">
        <Input placeholder="Search by code or name" className="max-w-2xl" />
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
      <HierarchicalCostCenters costCenters={COST_CENTERS} />
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
