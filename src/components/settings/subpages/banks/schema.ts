import z from "zod";

export const NewBankSchema = z.object({
  name_en: z.string(),
  name_ar: z.string(),
});

export type Bank = {
  id: number;
  company_id: number;
  created_at: string;
  updated_at: string;
} & NewBank;

export type NewBank = z.infer<typeof NewBankSchema>;
