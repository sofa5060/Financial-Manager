import { Currency, NewCurrency } from "@/components/settings/subpages/Currencies/schema";
import { handleAxiosError } from "@/lib/utils";
import axios, { AxiosError } from "axios";

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

  static async createCurrency(currency: NewCurrency): Promise<Currency | undefined> {
    try {
      const response = await axios.post("/api/currency", currency);
      return response.data.data;
    } catch (error) {
      handleAxiosError(error as AxiosError);
    }
  }

  static async updateCurrency(currency: NewCurrency, currencyId: number): Promise<Currency | undefined> {
    try {
      const response = await axios.put(`/api/currency/${currencyId}`, currency
      );
      return response.data.data;
    } catch (error) {
      handleAxiosError(error as AxiosError);
    }
  }

  static async deleteCurrency(currencyId: number): Promise<void> {
    try {
      await axios.delete(`/api/currency/${currencyId}`);
    } catch (error) {
      handleAxiosError(error as AxiosError);
    }
  }
}

export default CurrenciesManager;
