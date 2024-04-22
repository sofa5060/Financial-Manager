import { z } from "zod";
import {
  AccountPropertiesSchema,
  AccountTypeSchema,
} from "./Hierarchical/data";
import { Currency } from "../settings/subpages/Currencies/schema";

export type SubAccount = {
  id: number;
  code: string;
  name_en: string;
  name_ar: string;
  properties: string;
  type: string;
  currencies: Currency[];
  categories: number[];
  cost_center: boolean;
  parent_id: number | null;
  reporting_type: string;
  company_id: number;
  created_at: string;
  updated_at: string;
};

export type Account = {
  id: number;
  code: string;
  children: Account[];
  currencies_ids: { id: number }[];
  categories_ids: { id: number }[];
  reports_ids: { id: number }[];
  total_credit: number | null;
  total_debit: number | null;
} & NewAccount;

export const NewAccountSchema = z.object({
  name_en: z.string(),
  name_ar: z.string(),
  properties: AccountPropertiesSchema,
  type: AccountTypeSchema,
  reporting_type: z.array(z.number()),
  cost_center: z.boolean().nullable(),
  parent_id: z.number().optional().nullable(),
  categories: z.array(z.number()),
  currencies: z.array(z.number()),
});

export type NewAccount = z.infer<typeof NewAccountSchema>;
