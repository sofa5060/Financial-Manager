import z from "zod";

export const NewReportSchema = z.object({
  name_en: z.string(),
  name_ar: z.string(),
});

export type Report = {
  id: number;
  company_id: number;
  created_at: string;
  updated_at: string;
} & NewReport;

export type NewReport = z.infer<typeof NewReportSchema>;
