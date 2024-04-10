import { handleAxiosError } from "@/lib/utils";
import axios, { AxiosError } from "axios";

export type Category = {
  id: number;
  name_en: string;
  name_ar: string;
  company_id: number;
  created_at: string;
  updated_at: string;
};

class CategoriesManager {
  static async getCategories(
    page: number = 1,
    size: number = 1000
  ): Promise<Category[] | undefined> {
    try {
      const response = await axios.get(
        `/api/category?page=${page}&size=${size}`
      );
      console.log(response);
      return response.data.data;
    } catch (error) {
      handleAxiosError(error as AxiosError);
    }
  }
}

export default CategoriesManager;
