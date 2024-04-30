import z from "zod";
import { TreasuryTransactionSchema } from "../Transactions/schema";
import { isNotFutureDate } from "@/lib/utils";

export const BondStatusSchema = z.enum(["park", "post"]);

export const BondType = z.enum(["check", "cash"]);

export const NewBondSchema = z
  .object({
    title: z.string(),
    currency_id: z.number(),
    rate: z.number().nullable().optional(),
    type: BondType,
    bank_id: z.number().nullable().optional(),
    check_no: z.string().nullable().optional(),
    check_date: z.string().nullable().optional(),
    date: z.string().refine((val) => isNotFutureDate(val), "Date cannot be in the future"),
    description: z.string(),
    safe_account_id: z.number(),
    transactions: z.array(TreasuryTransactionSchema),
    document_code: z.string().optional(),
    ref_no: z.string().optional(),
    attachments: z.array(z.string()).nullable().optional(),
    files: z.any(),
  })
  .superRefine((val, ctx) => {
    if (val.type === "check" && !val.check_no) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["check_no"],
        message: "Check number is required",
      });
    }

    if (val.type === "check" && !val.check_date) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["check_date"],
        message: "Check date is required",
      });
    }

    if (val.type === "check" && !val.bank_id) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["bank_id"],
        message: "Bank is required",
      });
    }
  });

export type TreasuryBond = {
  serial: string;
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
