import z from "zod"
import { TransactionSchema } from "../Transactions/schema";

export type Template = {
  id: number;
  code: string;
  created_at: string;
  posted_at: string | null;
  title: string;
  posted_by: string | null;
  amount: number;
  currency: string;
};

export const NewTemplateSchema = z.object({
  title: z.string(),
  currency: z.string(),
  date: z.string(),
  description: z.string(),
  transactions: z.array(TransactionSchema),
  document_code: z.string().optional(),
  created_by: z.string().optional(),
});

export type NewTemplate = z.infer<typeof NewTemplateSchema>;

