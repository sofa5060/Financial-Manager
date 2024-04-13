import { Bank, NewBank } from "@/components/settings/subpages/banks/schema";
import { handleAxiosError } from "@/lib/utils";
import axios, { AxiosError } from "axios";

class BanksManager {
  static async getBanks(): Promise<Bank[] | undefined> {
    try {
      const response = await axios.get(`/api/bank`);
      console.log(response);
      return response.data.data;
    } catch (error) {
      handleAxiosError(error as AxiosError);
    }
  }

  static async createBank(bank: NewBank): Promise<Bank | undefined> {
    try {
      const response = await axios.post(`/api/bank`, bank);
      return response.data.data;
    } catch (error) {
      handleAxiosError(error as AxiosError);
    }
  }

  static async updateBank(
    bank: NewBank,
    bankId: number
  ): Promise<Bank | undefined> {
    try {
      const response = await axios.put(`/api/bank/${bankId}`, bank);
      return response.data.data;
    } catch (error) {
      handleAxiosError(error as AxiosError);
    }
  }

  static async deleteBank(bankId: number): Promise<void> {
    try {
      await axios.delete(`/api/bank/${bankId}`);
    } catch (error) {
      handleAxiosError(error as AxiosError);
    }
  }
}

export default BanksManager;
