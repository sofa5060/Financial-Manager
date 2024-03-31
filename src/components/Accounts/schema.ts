import { z } from "zod";
import {
  AccountPropertiesSchema,
  AccountTypeSchema,
  ReportingTypeSchema,
} from "./Hierarchical/data";

export type Account = {
  id: number;
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
  parent_id: z.number().optional().nullable(),
  categories: z.array(z.number()),
  currencies: z.array(z.number()),
});

export type NewAccount = z.infer<typeof NewAccountSchema>;
