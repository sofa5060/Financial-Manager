import { CostCenter, NewCostCenter, SubCostCenter } from "@/components/CostCenters/schema";
import { handleAxiosError } from "@/lib/utils";
import axios, { AxiosError } from "axios";

class CostCentersManager {
  static async getCostCenters(): Promise<CostCenter[] | undefined> {
    try {
      const response = await axios.get("/api/cost-center");
      return response.data.data;
    } catch (error) {
      handleAxiosError(error as AxiosError);
    }
  }

  static async getSubCostCenters(page: number = 1, size: number = 1000): Promise<SubCostCenter[] | undefined> {
    try {
      const response = await axios.get(`/api/cost-center/sub?size=${size}&page=${page}`);
      return response.data.data;
    } catch (error) {
      handleAxiosError(error as AxiosError);
    }
  }

  static async getCostCenter(costCenterId: number): Promise<CostCenter | undefined> {
    try {
      const response = await axios.get(`/api/cost-center/${costCenterId}`);
      return response.data.data;
    } catch (error) {
      handleAxiosError(error as AxiosError);
    }
  }

  static async searchCostCenters(query: string): Promise<CostCenter[] | undefined> {
    try {
      const response = await axios.get(`/api/cost-center?search=${query}`);
      console.log(response.data.data)
      return response.data.data;
    } catch (error) {
      handleAxiosError(error as AxiosError);
    }
  }

  static async addCostCenter(costCenter: NewCostCenter): Promise<CostCenter | undefined> {
    try {
      const response = await axios.post("/api/cost-center", costCenter);
      return response.data;
    } catch (error) {
      handleAxiosError(error as AxiosError);
    }
  }

  static async updateCostCenter(
    costCenter: Partial<CostCenter>,
    costCenterId: number
  ): Promise<CostCenter | undefined> {
    try {
      const response = await axios.put(`/api/cost-center/${costCenterId}`, costCenter);
      return response.data;
    } catch (error) {
      handleAxiosError(error as AxiosError);
    }
  }

  static async deleteCostCenter(costCenterId: number): Promise<void> {
    try {
      await axios.delete(`/api/cost-center/${costCenterId}`);
    } catch (error) {
      handleAxiosError(error as AxiosError);
    }
  }
}

export default CostCentersManager;