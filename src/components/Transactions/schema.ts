import z from "zod"

export const TransactionSchema =  z.object({
  id: z.number(),
  account_id: z.number(),
  currency_id: z.number(),
  category_id: z.number(),
  cost_center_id: z.number().nullable(),
  f_debit: z.number(),
  f_credit: z.number(),
  debit: z.number(),
  credit: z.number(),
  description: z.string(),
})

export type Transaction = z.infer<typeof TransactionSchema>