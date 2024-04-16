// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Transaction } from "@/components/Transactions/schema";
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
    size: number = 10,
    searchQuery: string = ""
  ): Promise<TreasuryBondsResponse | undefined> {
    try {
      const response = await axios.get(
        `/api/safe/receive?page=${page}&size=${size}&${searchQuery}`
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
    size: number = 10,
    searchQuery: string = ""
  ): Promise<TreasuryBondsResponse | undefined> {
    try {
      const response = await axios.get(
        `/api/safe/payment?page=${page}&size=${size}&${searchQuery}`
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
    const transactions = JSON.parse(JSON.stringify(bond.transactions));

    transactions.map((transaction: Transaction) => {
      delete transaction.debit;
      delete transaction.f_debit;
      delete transaction.status;
      delete transaction.credit;
      delete transaction.f_credit;
      delete transaction.account_code;
      delete transaction.cost_center_code;
      delete transaction.account_name_en;
      delete transaction.account_name_ar;
      delete transaction.category_name_en;
      delete transaction.category_name_ar;
      delete transaction.cost_center_en;
      delete transaction.cost_center_ar;
      delete transaction.company_id;
      delete transaction.id;
      delete transaction.entry_id;
      delete transaction.created_at;
      delete transaction.updated_at;
      delete transaction.code;
      delete transaction.created_by_name;
      delete transaction.posted_by_name;
      delete transaction.posted_at;
      delete transaction.currency;
      delete transaction.entry_created_at;
      delete transaction.date;
    });

    bond.transactions = transactions;
    try {
      const response = await axios.put(`/api/safe/${bondId}/receive`, bond);
      return response.data.data;
    } catch (error) {
      handleAxiosError(error as AxiosError);
    }
  }

  static async updatePaymentTreasuryBond(
    bond: TreasuryBond,
    bondId: number
  ): Promise<TreasuryBond | undefined> {
    const transactions = JSON.parse(JSON.stringify(bond.transactions));

    transactions.map((transaction: Transaction) => {
      delete transaction.debit;
      delete transaction.f_debit;
      delete transaction.status;
      delete transaction.credit;
      delete transaction.f_credit;
      delete transaction.account_code;
      delete transaction.cost_center_code;
      delete transaction.account_name_en;
      delete transaction.account_name_ar;
      delete transaction.category_name_en;
      delete transaction.category_name_ar;
      delete transaction.cost_center_en;
      delete transaction.cost_center_ar;
      delete transaction.company_id;
      delete transaction.id;
      delete transaction.entry_id;
      delete transaction.created_at;
      delete transaction.updated_at;
      delete transaction.code;
      delete transaction.created_by_name;
      delete transaction.posted_by_name;
      delete transaction.posted_at;
      delete transaction.currency;
      delete transaction.entry_created_at;
      delete transaction.date;
    });

    bond.transactions = transactions;
    try {
      const response = await axios.put(`/api/safe/${bondId}/payment`, bond);
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
