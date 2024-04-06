import z from "zod";
import { TransactionSchema } from "../Transactions/schema";

export const EntryStatusSchema = z.enum(["park", "post"]);

export const NewEntrySchema = z.object({
  title: z.string(),
  currency: z.string().or(z.number()),
  date: z.string(),
  description: z.string(),
  transactions: z.array(TransactionSchema),
  document_code: z.string().optional(),
  created_by: z.string().optional(),
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
} & NewEntry;

export type NewEntry = z.infer<typeof NewEntrySchema>;
export type EntryStatus = z.infer<typeof EntryStatusSchema>;
