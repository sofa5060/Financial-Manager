import { Category } from "@/components/settings/subpages/Categories/schema";
import { create } from "zustand";

type State = {
  categories: Category[];
  enCategoriesOptions: { value: number; label: string }[];
  arCategoriesOptions: { value: number; label: string }[];
};

type Actions = {
  setCategories: (categories: Category[]) => void;
};

export const useCategoriesStore = create<State & Actions>((set) => ({
  categories: [],
  enCategoriesOptions: [],
  arCategoriesOptions: [],
  setCategories: (categories) =>
    set({
      categories,
      enCategoriesOptions: categories.map((category) => ({
        value: category.id,
        label: category.name_en,
      })),
      arCategoriesOptions: categories.map((category) => ({
        value: category.id,
        label: category.name_ar,
      })),
    }),
}));
