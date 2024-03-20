import { cn } from "@/lib/utils";
import { CostCenter } from "../schema";
import HierarchicalCostCenter from "./HierarchicalCostCenter";
import { useState } from "react";

type HierarchicalCostCentersProps = {
  costCenters: CostCenter[];
  level?: number;
  parentCostCenter?: CostCenter;
};
const HierarchicalCostCenters = ({
  costCenters,
  level = 1,
  parentCostCenter,
}: HierarchicalCostCentersProps) => {
  const [costCentersClone, setCostCentersClone] = useState(costCenters);

  const addChild = (costCenter: CostCenter) => {
    const newCostCenter: CostCenter = {
      id: "4",
      code: "AA11125",
      name_en: "New Sub Cost Center",
      name_ar: "New Sub Cost Center",
      properties: "main",
      children: [],
    };
    costCenter.children.push(newCostCenter);
    setCostCentersClone([...costCentersClone]);
  };

  return (
    <div className={cn("flex items-stretch", { "ml-12": level > 1 })}>
      <div>
        {costCentersClone.map((costCenter, index) => (
          <HierarchicalCostCenter
            costCenter={costCenter}
            level={level}
            key={costCenter.id}
            lastElement={index === costCentersClone.length - 1}
            addChild={() => addChild(costCenter)}
            parentCostCenter={parentCostCenter}
          />
        ))}
      </div>
    </div>
  );
};
export default HierarchicalCostCenters;
