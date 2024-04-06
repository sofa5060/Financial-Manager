import z from "zod"

export const TransactionSchema =  z.object({
  id: z.number(),
  code: z.string(),
  created_at: z.string(),
  posted_by: z.string(),
  posted_by_id: z.number(),
  type: z.string(),
  description: z.string(),
  cost_center: z.boolean(),
  debit: z.number(),
  credit: z.number(),
  currency: z.string(),
  account_name_en: z.string(),
  account_name_ar: z.string(),
  account_code: z.string(),
  date: z.string(),
  posted_at: z.string().nullable(),
  created_by_name: z.string(),
})

export type Transaction = z.infer<typeof TransactionSchema>