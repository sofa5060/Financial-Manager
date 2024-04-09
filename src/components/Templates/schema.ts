import z from "zod";
import { TransactionSchema } from "../Transactions/schema";

export const TemplateStatusSchema = z.enum(["park", "post"]);

export const TemplateType = z.enum(["check", "cash"]);

export const NewTemplateSchema = z.object({
  title: z.string(),
  currency_id: z.number(),
  rate: z.number().optional(),
  type: TemplateType,
  bank_id: z.number().optional().nullable(),
  check_no: z.string().optional().nullable(),
  date: z.string(),
  description: z.string(),
  transactions: z.array(TransactionSchema),
  document_code: z.string().optional(),
});

export type Template = {
  id: number;
  code: string;
  status: TemplateStatus;
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
} & NewTemplate;

export type NewTemplate = z.infer<typeof NewTemplateSchema>;
export type TemplateStatus = z.infer<typeof TemplateStatusSchema>;
export type TemplateType = z.infer<typeof TemplateType>;
