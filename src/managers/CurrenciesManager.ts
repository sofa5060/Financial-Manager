import { handleAxiosError } from "@/lib/utils";
import axios, { AxiosError } from "axios";

export type Currency = {
  id: number;
  default_rate: number;
  currency: string;
  functional_currency: boolean;
  appreviation: string;
  company_id: number;
  created_at: string;
  updated_at: string;
};

class CurrenciesManager {
  static async getCurrencies(): Promise<Currency[] | undefined> {
    try {
      const response = await axios.get("/api/currency");
      console.log(response);
      return response.data.data;
    } catch (error) {
      handleAxiosError(error as AxiosError);
    }
  }
}

export default CurrenciesManager;
