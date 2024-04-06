import { Transaction } from "@/components/Transactions/schema";
import { handleAxiosError } from "@/lib/utils";
import axios, { AxiosError } from "axios";

type TransactionsResponse = {
  transactions: Transaction[];
  totalPages: number;
  totalTransactions: number;
};

class TransactionsManager{
  static async getPostTransactions(
    page: number = 1,
    size: number = 10
  ): Promise<TransactionsResponse | undefined> {
    try {
      const response = await axios.get(
        `/api/transactions/post?page=${page}&size=${size}`
      );

      return {
        transactions: response.data.data,
        totalPages: response.data.total_pages,
        totalTransactions: response.data.total,
      };
    } catch (error) {
      handleAxiosError(error as AxiosError);
    }
  }

  static async getParkTransactions(
    page: number = 1,
    size: number = 10
  ): Promise<TransactionsResponse | undefined> {
    try {
      const response = await axios.get(
        `/api/transactions/park?page=${page}&size=${size}`
      );
      return {
        transactions: response.data.data,
        totalPages: response.data.total_pages,
        totalTransactions: response.data.total,
      };
    } catch (error) {
      handleAxiosError(error as AxiosError);
    }
  }

  static async getTransactionsOfEntry(entryId: number): Promise<Transaction[] | undefined> {
    try {
      const response = await axios.get(`/api/entry/${entryId}`);
      console.log(response.data.data)
      return response.data.data.transactions;
    } catch (error) {
      handleAxiosError(error as AxiosError);
    }
  }
}

export default TransactionsManager;