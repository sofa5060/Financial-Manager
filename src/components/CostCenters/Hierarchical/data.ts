import z from "zod";

export const CostCenterPropertiesSchema = z.enum(["main", "sub"]);


export const COST_CENTER_PROPERTIES = [
  {
    label : "Main",
    value : CostCenterPropertiesSchema.Enum.main
  },
  {
    label : "Sub",
    value : CostCenterPropertiesSchema.Enum.sub
  }
];

export type AccountProperties = z.infer<typeof CostCenterPropertiesSchema>;