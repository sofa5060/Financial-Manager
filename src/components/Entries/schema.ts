import z from "zod";
import { TransactionSchema } from "../Transactions/schema";

export const EntryStatusSchema = z.enum(["park", "post"]);

export const EntryType = z.enum(["check", "cash"]);

export const NewEntrySchema = z
  .object({
    title: z.string(),
    currency_id: z.number(),
    rate: z.number().optional(),
    type: EntryType,
    bank_id: z.number().optional().nullable(),
    check_no: z.string().optional().nullable(),
    check_date: z.string().optional().nullable(),
    date: z.string().refine((val) => {
      const date = new Date(val);
      // Check if the date is not in the future
      return date <= new Date();
    }, "Date cannot be in the future"),
    description: z.string(),
    transactions: z.array(TransactionSchema),
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

export type Entry = {
  id: number;
  code: string;
  status: EntryStatus;
  title: string;
  posted_by: number | null;
  posted_by_name: string | null;
  created_by_name: string | null;
  amount: number;
  company_id: number;
  date: string;
  created_at: string;
  updated_at: string;
  posted_at: string | null;
  created_by: number;
} & NewEntry;

export type NewEntry = z.infer<typeof NewEntrySchema>;
export type EntryStatus = z.infer<typeof EntryStatusSchema>;
export type EntryType = z.infer<typeof EntryType>;
