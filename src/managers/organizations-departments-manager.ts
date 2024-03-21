import { OrgDepartment } from "@/components/settings/subpages/org-departments/columns";
import axios, { HttpStatusCode } from "axios";

type POSTCreateOrganizationDepartmentResponse = {
  status: string;
  message: string;
};

type GETOrganizationDepartmentResponse = {
  status: string;
  data: OrgDepartment[];
};

class OrganizationsDepartmentsManager {
  static async getDepartments(
    token: string
  ): Promise<GETOrganizationDepartmentResponse> {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_ROOT}/api/department`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/";
      }
      throw new Error("Failed to login: " + (error as Error).message);
    }
  }

  static async createDepartment(
    token: string,
    name: string,
    manager: string
  ): Promise<POSTCreateOrganizationDepartmentResponse> {
    try {
      const body = { name, manager };
      const response = await axios.post(
        `${import.meta.env.VITE_API_ROOT}/api/department`,
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
        error.response?.status === HttpStatusCode.Unauthorized
      ) {
        localStorage.removeItem("token");
        window.location.href = "/";
      }
      throw new Error("Failed to login: " + (error as Error).message);
    }
  }

  static async updateDepartment(
    token: string,
    departmentId: string,
    name: string,
    managerId: string
  ) {
    try {
      const body = { name, manager: managerId };
      const response = await axios.put(
        `${import.meta.env.VITE_API_ROOT}/api/department/${departmentId}`,
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

  static async deleteDepartment(token: string, departmentId: string) {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_ROOT}/api/department/${departmentId}`,
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

export default OrganizationsDepartmentsManager;
