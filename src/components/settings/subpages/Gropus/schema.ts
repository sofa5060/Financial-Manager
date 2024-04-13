import z from "zod";

export const NewGroupSchema = z.object({
  name_en: z.string(),
  name_ar: z.string(),
  members: z.array(z.number()),
});

export type Group = {
  id: number;
  company_id: number;
  created_at: string;
  updated_at: string;
  users: {
    id: number;
    name: string;
    email: string;
  }[]
} & NewGroup;

export type NewGroup = z.infer<typeof NewGroupSchema>;
