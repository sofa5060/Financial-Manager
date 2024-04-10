import { NewBond, TreasuryBond } from "@/components/Treasury/schema";
import { handleAxiosError } from "@/lib/utils";
import axios, { AxiosError } from "axios";

type TreasuryBondsResponse = {
  bonds: TreasuryBond[];
  totalPages: number;
  totalBonds: number;
};

class TreasuryManager {
  static async getReceiveTreasuryBonds(
    page: number = 1,
    size: number = 10
  ): Promise<TreasuryBondsResponse | undefined> {
    try {
      const response = await axios.get(
        `/api/safe/receive?page=${page}&size=${size}`
      );

      return {
        bonds: response.data.data,
        totalPages: response.data.total_pages,
        totalBonds: response.data.total,
      };
    } catch (error) {
      handleAxiosError(error as AxiosError);
    }
  }

  static async getPaymentTreasuryBonds(
    page: number = 1,
    size: number = 10
  ): Promise<TreasuryBondsResponse | undefined> {
    try {
      const response = await axios.get(
        `/api/safe/payment?page=${page}&size=${size}`
      );

      return {
        bonds: response.data.data,
        totalPages: response.data.total_pages,
        totalBonds: response.data.total,
      };
    } catch (error) {
      handleAxiosError(error as AxiosError);
    }
  }

  static async addReceiveTreasuryBond(
    bond: NewBond
  ): Promise<TreasuryBond | undefined> {
    try {
      const response = await axios.post(`/api/safe/receive`, bond);
      return response.data.data;
    } catch (error) {
      handleAxiosError(error as AxiosError);
    }
  }

  static async addPaymentTreasuryBond(
    bond: NewBond
  ): Promise<TreasuryBond | undefined> {
    try {
      const response = await axios.post(`/api/safe/payment`, bond);
      return response.data.data;
    } catch (error) {
      handleAxiosError(error as AxiosError);
    }
  }

  static async updateReceiveTreasuryBond(
    bond: TreasuryBond,
    bondId: number
  ): Promise<TreasuryBond | undefined> {
    try {
      const response = await axios.put(`/api/safe/receive/${bondId}`, bond);
      return response.data.data;
    } catch (error) {
      handleAxiosError(error as AxiosError);
    }
  }

  static async updatePaymentTreasuryBond(
    bond: TreasuryBond,
    bondId: number
  ): Promise<TreasuryBond | undefined> {
    try {
      const response = await axios.put(`/api/safe/payment/${bondId}`, bond);
      return response.data.data;
    } catch (error) {
      handleAxiosError(error as AxiosError);
    }
  }

  static async deleteBond(bondId: number): Promise<void> {
    try {
      await axios.delete(`/api/entry/${bondId}`);
    } catch (error) {
      handleAxiosError(error as AxiosError);
    }
  }

  static async getBond(bondId: number): Promise<TreasuryBond | undefined> {
    try {
      const response = await axios.get(`/api/entry/${bondId}`);
      return response.data.data;
    } catch (error) {
      handleAxiosError(error as AxiosError);
    }
  }
}

export default TreasuryManager;
