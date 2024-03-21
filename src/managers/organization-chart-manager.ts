import { OrganizationChartFlatEntry } from "@/components/orgchart/org-table/columns";
import axios, { HttpStatusCode } from "axios";

type GETOrganizationChartResponse = {
  status: string;
  data: {
    flat: OrganizationChartFlatEntry[];
  };
};

class OrganizationsChartManager {
  static async getChart(token: string): Promise<GETOrganizationChartResponse> {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_ROOT}/api/company-tree`,
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

  static async updateEntry(
    token: string,
    employeeId: string,
    title_id?: string,
    department_id?: string,
    level?: number,
    type?: string
  ) {
    try {
      const body = {
        title: title_id ? title_id : undefined,
        level: level ? level.toString() : undefined,
        department_id: department_id ? [department_id] : undefined,
        type: type ? type : undefined,
      };
      if (!body.title) delete body.title;
      if (!body.level) delete body.level;
      if (!body.department_id) delete body.department_id;
      if (!body.type) delete body.type;

      const response = await axios.put(
        `${import.meta.env.VITE_API_ROOT}/api/promotion/employee/${employeeId}`,
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
}

export default OrganizationsChartManager;
