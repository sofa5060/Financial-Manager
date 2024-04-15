import { useTranslation } from "react-i18next";
import z from "zod";

export const CostCenterPropertiesSchema = z.enum(["main", "sub"]);

export const useData = () => {
  const { t } = useTranslation("costCenters");

  const COST_CENTER_PROPERTIES = [
    {
      label: t("mainCostCenter"),
      value: CostCenterPropertiesSchema.Enum.main,
    },
    {
      label: t("subCostCenter"),
      value: CostCenterPropertiesSchema.Enum.sub,
    },
  ];
  return { COST_CENTER_PROPERTIES };
};

export type AccountProperties = z.infer<typeof CostCenterPropertiesSchema>;
