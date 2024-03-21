import { TaskCategory } from "@/components/settings/subpages/tasks-categories/columns";
import axios, { HttpStatusCode } from "axios";

type GETTasksCategoriesResponse = {
  status: string;
  data: TaskCategory[];
};

class TasksCategoriesManager {
  static async getTasksCategories(
    token: string
  ): Promise<GETTasksCategoriesResponse> {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_ROOT}/api/category`,
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

  static async createTasksCategory(token: string, name: string) {
    try {
      const body = { name };
      const response = await axios.post(
        `${import.meta.env.VITE_API_ROOT}/api/category`,
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

  static async updateTasksCategory(
    token: string,
    categoryId: string,
    name: string
  ) {
    try {
      const body = { name };
      const response = await axios.put(
        `${import.meta.env.VITE_API_ROOT}/api/category/${categoryId}`,
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

  static async deleteTasksCategory(token: string, categoryId: string) {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_ROOT}/api/category/${categoryId}`,
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

export default TasksCategoriesManager;
