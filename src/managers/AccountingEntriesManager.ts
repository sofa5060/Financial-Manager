import { Entry, NewEntry } from "@/components/Entries/schema";
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
    size: number = 10
  ): Promise<AccountingEntriesResponse | undefined> {
    try {
      const response = await axios.get(
        `/api/entry/post?page=${page}&size=${size}`
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
    size: number = 10
  ): Promise<AccountingEntriesResponse | undefined> {
    try {
      const response = await axios.get(
        `/api/entry/park?page=${page}&size=${size}`
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
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      handleAxiosError(error as AxiosError);
    }
  }

  static async postEntry(entryId: number): Promise<Entry | undefined> {
    try {
      const response = await axios.put(`/api/entry/${entryId}/post`);
      console.log(response.data);
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
    console.log(entryId, reason, date)
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

  static async deleteEntry(entryId: number): Promise<void> {
    try {
      await axios.delete(`/api/entry/${entryId}`);
    } catch (error) {
      handleAxiosError(error as AxiosError);
    }
  }
}

export default AccountingEntriesManager;
