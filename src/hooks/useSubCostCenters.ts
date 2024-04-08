import { SubCostCenter } from "@/components/CostCenters/schema";
import { create } from "zustand";

type state = {
  subCostCenters: SubCostCenter[];
  subCostCentersOptions: { value: number | null; label: string }[];
  subCostCentersCodesOptions: { value: number | null; label: string }[];
};

type actions = {
  setSubCostCenters: (subCostCenters: SubCostCenter[]) => void;
};

export const useSubCostCentersStore = create<state & actions>((set) => ({
  subCostCenters: [],
  subCostCentersOptions: [],
  subCostCentersCodesOptions: [],
  setSubCostCenters: (subCostCenters) =>
    set({
      subCostCenters,
      subCostCentersOptions: [
        { value: null, label: "None" },
        ...subCostCenters.map((subCostCenters) => ({
          value: subCostCenters.id,
          label: subCostCenters.name_en,
        })),
      ],
      subCostCentersCodesOptions: [
        { value: null, label: "None" },
        ...subCostCenters.map((subCostCenters) => ({
          value: subCostCenters.id,
          label: subCostCenters.code,
        })),
      ],
    }),
}));
