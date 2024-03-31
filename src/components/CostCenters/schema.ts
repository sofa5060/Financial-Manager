import { z } from "zod";
import {
  CostCenterPropertiesSchema,
} from "./Hierarchical/data";

export type CostCenter = {
  id: number;
  code: string;
  children: CostCenter[];
} & NewCostCenter;

export const NewCostCenterSchema = z.object({
  name_en: z.string(),
  name_ar: z.string(),
  properties: CostCenterPropertiesSchema,
  parent_id: z.number().optional().nullable(),
});

export type NewCostCenter = z.infer<typeof NewCostCenterSchema>;
