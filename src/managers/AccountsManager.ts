// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Account, NewAccount, SubAccount } from "@/components/Accounts/schema";
import { handleAxiosError } from "@/lib/utils";
import axios, { AxiosError } from "axios";

class AccountsManager {
  static async getAccounts(): Promise<Account[] | undefined> {
    try {
      const response = await axios.get("/api/account");
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      console.log(error);
      handleAxiosError(error as AxiosError);
    }
  }

  static async getSubAccounts(
    page: number = 1,
    size: number = 1000
  ): Promise<SubAccount[] | undefined> {
    try {
      const response = await axios.get(
        `/api/account/sub?page=${page}&size=${size}`
      );
      return response.data.data;
    } catch (error) {
      handleAxiosError(error as AxiosError);
    }
  }

  static async getAccount(accountId: number): Promise<Account | undefined> {
    try {
      const response = await axios.get(`/api/account/${accountId}`);
      return response.data.data;
    } catch (error) {
      handleAxiosError(error as AxiosError);
    }
  }

  static async searchAccounts(query: string): Promise<Account[] | undefined> {
    try {
      const response = await axios.get(`/api/account?search=${query}`);
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      handleAxiosError(error as AxiosError);
    }
  }

  static async addAccount(account: NewAccount): Promise<Account | undefined> {
    if(account.properties === "main"){
      delete account.categories;
      delete account.currencies;
      delete account.cost_center
    }

    try {
      const response = await axios.post("/api/account", account);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      handleAxiosError(error as AxiosError);
    }
  }

  static async updateAccount(
    account: Partial<Account>,
    accountId: number
  ): Promise<Account | undefined> {
    if(account.properties === "main"){
      delete account.categories;
      delete account.currencies;
      delete account.cost_center
    }
    
    try {
      const response = await axios.put(`/api/account/${accountId}`, account);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      handleAxiosError(error as AxiosError);
    }
  }

  static async deleteAccount(accountId: number): Promise<void> {
    try {
      await axios.delete(`/api/account/${accountId}`);
    } catch (error) {
      handleAxiosError(error as AxiosError);
    }
  }

  static async changeEnabledStatus(
    accountId: string,
    enabled: boolean
  ): Promise<Account | undefined> {
    try {
      const response = await axios.put(`/api/account/${accountId}/enabled`, {
        enabled,
      });
      return response.data;
    } catch (error) {
      handleAxiosError(error as AxiosError);
    }
  }
}

export default AccountsManager;
