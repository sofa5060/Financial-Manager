import { handleAxiosError } from "@/lib/utils";
import axios, { AxiosError } from "axios";

export type Bank = {
  id: number;
  name_en: string;
  name_ar: string;
  company_id: number;
  created_at: string;
  updated_at: string;
};


class BanksManager {
  static async getBanks(): Promise<Bank[] | undefined> {
    try {
      const response = await axios.get(`/api/bank`);
      console.log(response)
      return response.data.data;
    } catch (error) {
      handleAxiosError(error as AxiosError);
    }
  }
}

export default BanksManager;