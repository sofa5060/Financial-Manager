import {
  Category,
  NewCategory,
} from "@/components/settings/subpages/Categories/schema";
import { handleAxiosError } from "@/lib/utils";
import axios, { AxiosError } from "axios";

type CategoriesResponse = {
  categories: Category[];
  totalPages: number;
  totalCategories: number;
};

class CategoriesManager {
  static async getCategories(
    page: number = 1,
    size: number = 1000
  ): Promise<CategoriesResponse | undefined> {
    try {
      const response = await axios.get(
        `/api/category?page=${page}&size=${size}`
      );
      console.log(response);
      return {
        categories: response.data.data,
        totalPages: response.data.total_pages,
        totalCategories: response.data.total,
      };
    } catch (error) {
      handleAxiosError(error as AxiosError);
    }
  }

  static async createCategory(
    category: NewCategory
  ): Promise<Category | undefined> {
    try {
      const response = await axios.post("/api/category", category);
      return response.data.data;
    } catch (error) {
      handleAxiosError(error as AxiosError);
    }
  }

  static async updateCategory(
    category: NewCategory,
    categoryId: number
  ): Promise<Category | undefined> {
    try {
      const response = await axios.put(`/api/category/${categoryId}`, category);
      return response.data.data;
    } catch (error) {
      handleAxiosError(error as AxiosError);
    }
  }

  static async deleteCategory(categoryId: number): Promise<void> {
    try {
      await axios.delete(`/api/category/${categoryId}`);
    } catch (error) {
      handleAxiosError(error as AxiosError);
    }
  }
}

export default CategoriesManager;
