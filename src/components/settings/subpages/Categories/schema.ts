import z from "zod";

export const NewCategorySchema = z.object({
  name_en: z.string(),
  name_ar: z.string(),
});

export type Category = {
  id: number;
  company_id: number;
  created_at: string;
  updated_at: string;
} & NewCategory;

export type NewCategory = z.infer<typeof NewCategorySchema>;
