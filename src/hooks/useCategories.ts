import { Category } from "@/managers/CategoriesManager";
import { create } from "zustand";

type State = {
  categories: Category[];
  categoriesOptions: { value: number; label: string }[];
};

type Actions = {
  setCategories: (categories: Category[]) => void;
};

export const useCategoriesStore = create<State & Actions>((set) => ({
  categories: [],
  categoriesOptions: [],
  setCategories: (categories) =>
    set({
      categories,
      categoriesOptions: categories.map((category) => ({
        value: category.id,
        label: category.name_en,
      })),
    }),
}));