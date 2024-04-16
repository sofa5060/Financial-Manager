import { cn } from "@/lib/utils";
import { CostCenter } from "../schema";
import HierarchicalCostCenter from "./HierarchicalCostCenter";

type HierarchicalCostCentersProps = {
  costCenters: CostCenter[];
  level?: number;
  parentCostCenter?: CostCenter;
  collapseAll: boolean;
  expandAll: boolean;
};
const HierarchicalCostCenters = ({
  costCenters,
  level = 1,
  parentCostCenter,
  collapseAll,
  expandAll,
}: HierarchicalCostCentersProps) => {
  return (
    <div className={cn("flex items-stretch", { "ms-6": level > 1 })}>
      <div>
        {costCenters.map((costCenter, index) => (
          <HierarchicalCostCenter
            costCenter={costCenter}
            level={level}
            key={costCenter.id}
            lastElement={index === costCenters.length - 1}
            addChild={() => {}}
            parentCostCenter={parentCostCenter}
            collapseAll={collapseAll}
            expandAll={expandAll}
          />
        ))}
      </div>
    </div>
  );
};
export default HierarchicalCostCenters;
