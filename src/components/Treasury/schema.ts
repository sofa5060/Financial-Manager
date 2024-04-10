import z from "zod";
import { TreasuryTransactionSchema } from "../Transactions/schema";

export const BondStatusSchema = z.enum(["park", "post"]);

export const BondType = z.enum(["check", "cash"]);

export const NewBondSchema = z.object({
  title: z.string(),
  currency_id: z.number(),
  rate: z.number().nullable().optional(),
  type: BondType,
  bank_id: z.number().nullable().optional(),
  check_no: z.string().nullable().optional(),
  date: z.string(),
  description: z.string(),
  safe_account_id: z.number(),
  transactions: z.array(TreasuryTransactionSchema),
  document_code: z.string().optional(),
});

export type TreasuryBond = {
  created_by: number;
  code: string;
  status: BondStatus;
  id: number;
  title: string;
  type: BondType;
  safe_type: string;
  check_no: string | null;
  currency: string;
  bank_name_en: string | null;
  bank_name_ar: string | null;
  currency_id: number;
  bank_id: number | null;
  rate: number | null;
  posted_by: number | null;
  posted_by_name: string | null;
  amount: number;
  company_id: number;
  created_by_name: string;
} & NewBond;

export type NewBond = z.infer<typeof NewBondSchema>;
export type BondStatus = z.infer<typeof BondStatusSchema>;
export type BondType = z.infer<typeof BondType>;
