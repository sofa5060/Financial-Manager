import { Report } from "@/components/settings/subpages/Reports/schema";
import { create } from "zustand";

type State = {
  reports: Report[];
  enReportsOptions: { value: number; label: string }[];
  arReportsOptions: { value: number; label: string }[];
};

type Actions = {
  setReports: (reports: Report[]) => void;
};

export const useReportsStore = create<State & Actions>((set) => ({
  reports: [],
  enReportsOptions: [],
  arReportsOptions: [],
  setReports: (reports) =>
    set({
      reports,
      enReportsOptions: reports.map((report) => ({
        value: report.id,
        label: report.name_en,
      })),
      arReportsOptions: reports.map((report) => ({
        value: report.id,
        label: report.name_ar,
      })),
    }),
}));
