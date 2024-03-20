import { z } from "zod";
import {
  CostCenterPropertiesSchema,
} from "./Hierarchical/data";

export type CostCenter = {
  id: string;
  code: string;
  children: CostCenter[];
} & NewCostCenter;

export const NewCostCenterSchema = z.object({
  name_en: z.string(),
  name_ar: z.string(),
  properties: CostCenterPropertiesSchema,
  parentId: z.string().optional(),
});

export type NewCostCenter = z.infer<typeof NewCostCenterSchema>;
