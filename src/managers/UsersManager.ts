import { handleAxiosError } from "@/lib/utils";
import axios, { AxiosError } from "axios";

export type User = {
  "user_id": 2,
  "name": "admin",
  "email": "admin@example.com",
  "type": "admin",
  "active": true,
  "verified": true,
  "avatar": null
}

type UsersResponse = {
  users: User[];
  totalPages: number;
  totalUsers: number;
};

class UsersManager {
  static async getUsers(
    page: number = 1,
    size: number = 1000
  ): Promise<UsersResponse | undefined> {
    try {
      const response = await axios.get(
        `/api/user?page=${page}&size=${size}`
      );

      return {
        users: response.data.data,
        totalPages: response.data.total_pages,
        totalUsers: response.data.total,
      };
    } catch (error) {
      handleAxiosError(error as AxiosError);
    }
  }
}

export default UsersManager;
