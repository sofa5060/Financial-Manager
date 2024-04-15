import {
  ArrowDownFromLine,
  ArrowLeftFromLine,
  ArrowRightFromLine,
  Eye,
  Pen,
  Plus,
  Trash2,
} from "lucide-react";
import { CostCenter } from "../schema";
import { Button } from "@/components/ui/button";
import HierarchicalCostCenters from "./HierarchicalCostCenters";
import { cn } from "@/lib/utils";
import DeleteModal from "./DeleteModal";
import CostCenterForm from "./CostCenterForm";
import { useState } from "react";
import { useTranslation } from "react-i18next";

type HierarchicalCostCenterProps = {
  costCenter: CostCenter;
  level?: number;
  lastElement?: boolean;
  addChild: () => void;
  parentCostCenter?: CostCenter;
};

const HierarchicalCostCenter = ({
  costCenter,
  level = 1,
  lastElement = false,
  parentCostCenter,
}: HierarchicalCostCenterProps) => {
  const [hideChildren, setHideChildren] = useState(level !== 1);
  const { i18n, t } = useTranslation("costCenters");

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
                    "border-s-2 border-dashed border-[#E4E4E7] h-1/2 -ms-0.5 mt-0.5"
                  )}
                ></div>
              )}
              <div className="border-b-2 border-dashed border-[#E4E4E7] w-6 h-1 self-center"></div>
            </div>
          )}
          <div className="flex items-center gap-4 mt-4">
            <div className="p-3 ring-1 max-w-max rounded-md ring-[#E4E4E7]">
              <div className="border-s-4 border-primary ps-2 flex items-center gap-4">
                <div className="flex gap-2">
                  <h4 className="text-sm">
                    {i18n.language === "ar"
                      ? costCenter.name_ar
                      : costCenter.name_en}
                  </h4>
                  <div className="flex items-center gap-2">
                    <h5 className="text-xs bg-primary text-white px-2 rounded-sm">
                      {costCenter.code}
                    </h5>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <CostCenterForm
                    level={level + 1}
                    parentCostCenter={parentCostCenter}
                    type="view"
                    costCenter={costCenter}
                  >
                    <Eye className="w-4 text-primary cursor-pointer" />
                  </CostCenterForm>
                  <CostCenterForm
                    level={level + 1}
                    parentCostCenter={parentCostCenter}
                    type="edit"
                    costCenter={costCenter}
                  >
                    <Pen className="w-4 text-[#A16207] cursor-pointer" />
                  </CostCenterForm>
                  <DeleteModal costCenterId={costCenter.id}>
                    <Trash2 className="w-4 text-destructive cursor-pointer" />
                  </DeleteModal>
                  {costCenter.children && costCenter.children.length > 0 && (
                    <div className="w-5 text-primary cursor-pointer ms-4">
                      {hideChildren ? (
                        i18n.language === "ar" ? (
                          <ArrowLeftFromLine
                            className="w-full"
                            onClick={() => setHideChildren(false)}
                          />
                        ) : (
                          <ArrowRightFromLine
                            className="w-full"
                            onClick={() => setHideChildren(false)}
                          />
                        )
                      ) : (
                        <ArrowDownFromLine
                          className="w-full"
                          onClick={() => setHideChildren(true)}
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <CostCenterForm level={level + 1} parentCostCenter={costCenter}>
              <Button className="btn-outline">
                <Plus className="w-4 me-1" />
                {t("subCostCenter.add")}
              </Button>
            </CostCenterForm>
          </div>
        </div>
        {costCenter.children && costCenter.children.length > 0 && (
          <div className={cn("ms-6", { hidden: hideChildren })}>
            <HierarchicalCostCenters
              costCenters={costCenter.children}
              level={level + 1}
              parentCostCenter={costCenter}
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default HierarchicalCostCenter;
