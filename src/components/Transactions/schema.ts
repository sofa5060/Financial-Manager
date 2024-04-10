import z from "zod";

export const NewTransactionSchema = z.object({
  account_id: z.number().optional(),
  category_id: z.number().nullable(),
  cost_center_id: z.number().nullable(),
  f_debit: z.number().nullable(),
  f_credit: z.number().nullable(),
  debit: z.number().positive().optional(),
  credit: z.number().positive().optional(),
  description: z.string(),
});

export const NewTreasuryTransactionSchema = z.object({
  account_id: z.number().optional(),
  category_id: z.number().nullable(),
  cost_center_id: z.number().nullable(),
  f_amount: z.number().nullable(),
  amount: z.number().positive().optional(),
  description: z.string(),
});

export const TransactionSchema = z
  .object({
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
  .merge(NewTransactionSchema);

export const TreasuryTransactionSchema = z
  .object({
    id: z.number(),
    code: z.string(),
    created_at: z.string(),
    posted_by: z.string(),
    posted_by_id: z.number(),
    type: z.string(),
    description: z.string(),
    cost_center: z.boolean(),
    amount: z.number(),
    currency: z.string(),
    account_name_en: z.string(),
    account_name_ar: z.string(),
    account_code: z.string(),
    date: z.string(),
    posted_at: z.string().nullable(),
    created_by_name: z.string(),
    debit: z.number().nullable(),
    credit: z.number().nullable(),
    f_credit: z.number().nullable(),
    f_debit: z.number().nullable(),
  })
  .merge(NewTreasuryTransactionSchema);

export type NewTransaction = z.infer<typeof NewTransactionSchema>;
export type Transaction = z.infer<typeof TransactionSchema>;
export type NewTreasuryTransaction = z.infer<typeof NewTreasuryTransactionSchema>;
export type TreasuryTransaction = z.infer<typeof TreasuryTransactionSchema>;
