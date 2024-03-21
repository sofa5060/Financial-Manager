import { TaskSubCategory } from "@/components/settings/subpages/tasks-subcategories/columns";
import axios, { HttpStatusCode } from "axios";

type GETTasksSubCategoriesResponse = {
  status: string;
  data: TaskSubCategory[];
};

class TasksSubCategoriesManager {
  static async getTasksSubCategories(
    token: string
  ): Promise<GETTasksSubCategoriesResponse> {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_ROOT}/api/subcategory`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response?.status === HttpStatusCode.Forbidden
      ) {
        localStorage.removeItem("token");
        window.location.href = "/";
      }
      throw new Error("Failed to login: " + (error as Error).message);
    }
  }

  static async createTasksSubCategory(
    token: string,
    parentCategoryId: string,
    name: string
  ) {
    try {
      const body = { name };
      const response = await axios.post(
        `${
          import.meta.env.VITE_API_ROOT
        }/api/category/${parentCategoryId}/subcategory`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response?.status === HttpStatusCode.Forbidden
      ) {
        localStorage.removeItem("token");
        window.location.href = "/";
      }
      throw new Error("Failed to login: " + (error as Error).message);
    }
  }

  static async updateTasksSubCategory(
    token: string,
    parentCategoryId: string,
    subCategoryId: string,
    name: string
  ) {
    try {
      const body = { name };
      const response = await axios.put(
        `${
          import.meta.env.VITE_API_ROOT
        }/api/category/${parentCategoryId}/subcategory/${subCategoryId}`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response?.status === HttpStatusCode.Forbidden
      ) {
        localStorage.removeItem("token");
        window.location.href = "/";
      }
      throw new Error("Failed to login: " + (error as Error).message);
    }
  }

  static async deleteTasksSubCategory(
    token: string,
    parentCategoryId: string,
    subCategoryId: string
  ) {
    try {
      const response = await axios.delete(
        `${
          import.meta.env.VITE_API_ROOT
        }/api/category/${parentCategoryId}/subcategory/${subCategoryId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response?.status === HttpStatusCode.Forbidden
      ) {
        localStorage.removeItem("token");
        window.location.href = "/";
      }
      throw new Error("Failed to login: " + (error as Error).message);
    }
  }
}

export default TasksSubCategoriesManager;
