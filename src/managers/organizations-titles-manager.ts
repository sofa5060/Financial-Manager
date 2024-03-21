import { OrgTitle } from "@/components/settings/subpages/org-titles/columns";
import axios, { HttpStatusCode } from "axios";

type POSTCreateOrganizationTitleResponse = {
  status: string;
  message: string;
};

type GETOrganizationTitleResponse = {
  status: string;
  data: OrgTitle[];
};

class OrganizationsTitlesManager {
  static async getTitles(token: string): Promise<GETOrganizationTitleResponse> {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_ROOT}/api/job-title`,
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

  static async createTitle(
    token: string,
    name: string
  ): Promise<POSTCreateOrganizationTitleResponse> {
    try {
      const body = { name };
      const response = await axios.post(
        `${import.meta.env.VITE_API_ROOT}/api/job-title`,
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

  static async updateTitle(token: string, titleId: string, name: string) {
    try {
      const body = { name };
      const response = await axios.put(
        `${import.meta.env.VITE_API_ROOT}/api/job-title/${titleId}`,
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

  static async deleteTitle(token: string, titleId: string) {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_ROOT}/api/job-title/${titleId}`,
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

export default OrganizationsTitlesManager;
