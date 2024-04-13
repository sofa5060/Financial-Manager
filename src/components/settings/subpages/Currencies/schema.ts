import z from "zod";

export const NewCurrencySchema = z.object({
  currency: z.string(),
  default_rate: z.number(),
  functional_currency: z.boolean(),
  appreviation: z.string(),
});

export type Currency = {
  id: number;
  company_id: number;
  created_at: string;
  updated_at: string;
} & NewCurrency;

export type NewCurrency = z.infer<typeof NewCurrencySchema>;
