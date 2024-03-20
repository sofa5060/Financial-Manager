import { z } from "zod";
import {
  AccountPropertiesSchema,
  AccountTypeSchema,
  ReportingTypeSchema,
} from "./Hierarchical/data";

export type Account = {
  id: string;
  code: string;
  children: Account[];
} & NewAccount;

export const NewAccountSchema = z.object({
  name_en: z.string(),
  name_ar: z.string(),
  properties: AccountPropertiesSchema,
  type: AccountTypeSchema,
  reporting_type: ReportingTypeSchema,
  cost_center: z.boolean(),
  parentId: z.string().optional(),
  categories: z.array(z.number()).min(1, "At least one category is required"),
  currencies: z.array(z.number()).min(1, "At least one currency is required"),
});

export type NewAccount = z.infer<typeof NewAccountSchema>;
