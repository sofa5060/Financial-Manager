// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Entry, NewEntry } from "@/components/Entries/schema";
import { Transaction } from "@/components/Transactions/schema";
import { handleAxiosError } from "@/lib/utils";
import axios, { AxiosError } from "axios";

type AccountingEntriesResponse = {
  entries: Entry[];
  totalPages: number;
  totalEntries: number;
};

class AccountingEntriesManager {
  static async getPostEntries(
    page: number = 1,
    size: number = 10,
    searchQuery: string = ""
  ): Promise<AccountingEntriesResponse | undefined> {
    try {
      const response = await axios.get(
        `/api/entry/post?page=${page}&size=${size}&${searchQuery}`
      );

      return {
        entries: response.data.data,
        totalPages: response.data.total_pages,
        totalEntries: response.data.total,
      };
    } catch (error) {
      handleAxiosError(error as AxiosError);
    }
  }

  static async getParkEntries(
    page: number = 1,
    size: number = 10,
    searchQuery: string = ""
  ): Promise<AccountingEntriesResponse | undefined> {
    try {
      const response = await axios.get(
        `/api/entry/park?page=${page}&size=${size}&${searchQuery}`
      );
      console.log(response);
      return {
        entries: response.data.data,
        totalPages: response.data.total_pages,
        totalEntries: response.data.total,
      };
    } catch (error) {
      handleAxiosError(error as AxiosError);
    }
  }

  static async getEntry(entryId: number): Promise<Entry | undefined> {
    try {
      const response = await axios.get(`/api/entry/${entryId}`);
      return response.data.data;
    } catch (error) {
      handleAxiosError(error as AxiosError);
    }
  }

  static async addEntry(entry: NewEntry): Promise<Entry | undefined> {
    try {
      const response = await axios.post("/api/entry", entry);
      return response.data;
    } catch (error) {
      console.log(error);
      handleAxiosError(error as AxiosError);
    }
  }

  static async postEntry(entryId: number): Promise<Entry | undefined> {
    try {
      const response = await axios.put(`/api/entry/post`, {
        ids: [entryId],
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      handleAxiosError(error as AxiosError);
    }
  }

  static async postEntries(entryIds: number[]): Promise<Entry | undefined> {
    try {
      const response = await axios.put(`/api/entry/post`, {
        ids: entryIds,
      });
      return response.data;
    } catch (error) {
      handleAxiosError(error as AxiosError);
    }
  }

  static async reverseEntry(
    entryId: number,
    reason: string,
    date: string
  ): Promise<Entry | undefined> {
    console.log(entryId, reason, date);
    try {
      const response = await axios.post(`/api/entry/${entryId}/reverse`, {
        reason,
        date,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      handleAxiosError(error as AxiosError);
    }
  }

  static async updateEntry(
    entry: Entry,
    entryId: number
  ): Promise<Entry | undefined> {
    const tempTransactions = JSON.parse(JSON.stringify(entry.transactions));
    entry.transactions = tempTransactions.map((transaction: Transaction) => {
      delete transaction.status;
      delete transaction.account_code;
      delete transaction.cost_center_code;
      delete transaction.account_name_en;
      delete transaction.category_name_en;
      delete transaction.category_name_ar;
      delete transaction.account_name_ar;
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
      return transaction;
    });
    console.log(entry);
    try {
      const response = await axios.put(`/api/entry/${entryId}`, entry);
      return response.data;
    } catch (error) {
      console.log(error);
      handleAxiosError(error as AxiosError);
    }
  }

  static async deleteEntry(entryId: number): Promise<void> {
    try {
      await axios.delete(`/api/entry/${entryId}`);
    } catch (error) {
      handleAxiosError(error as AxiosError);
    }
  }
}

export default AccountingEntriesManager;
