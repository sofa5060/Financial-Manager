import { SubCostCenter } from "@/components/CostCenters/schema";
import { create } from "zustand";

type state = {
  subCostCenters: SubCostCenter[];
  enSubCostCentersOptions: { value: number | null; label: string }[];
  arSubCostCentersOptions: { value: number | null; label: string }[];
  subCostCentersCodesOptions: { value: number | null; label: string }[];
};

type actions = {
  setSubCostCenters: (subCostCenters: SubCostCenter[]) => void;
};

export const useSubCostCentersStore = create<state & actions>((set) => ({
  subCostCenters: [],
  enSubCostCentersOptions: [],
  arSubCostCentersOptions: [],
  subCostCentersCodesOptions: [],
  setSubCostCenters: (subCostCenters) =>
    set({
      subCostCenters,
      enSubCostCentersOptions: [
        { value: null, label: "None" },
        ...subCostCenters.map((subCostCenters) => ({
          value: subCostCenters.id,
          label: subCostCenters.name_en,
        })),
      ],
      arSubCostCentersOptions: [
        { value: null, label: "None" },
        ...subCostCenters.map((subCostCenters) => ({
          value: subCostCenters.id,
          label: subCostCenters.name_ar,
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
