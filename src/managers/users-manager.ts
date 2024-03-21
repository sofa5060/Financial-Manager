import { User } from "@/components/users/users-table/columns";
import axios, { HttpStatusCode } from "axios";

type GETAllUsersResponse = {
  status: string;
  data: User[];
};

export type UserUpdateDTO = {
  name: string;
  phone: string;
  organization_name: string;
  old_password?: string;
  password?: string;
  passwordConfirmation?: string;
};

class UserManager {
  static async getAllUsers(token: string): Promise<GETAllUsersResponse> {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_ROOT}/api/user/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response?.status === HttpStatusCode.Unauthorized
      ) {
        localStorage.removeItem("token");
        window.location.href = "/";
      }
      throw new Error("Failed to login: " + (error as Error).message);
    }
  }

  static async createUser(
    token: string,
    name: string,
    organization_name: string,
    phone: string,
    email: string,
    password: string,
    passwordConfirmation: string,
    type: string
  ) {
    try {
      const body = {
        name,
        organization_name,
        phone,
        email,
        password,
        passwordConfirmation,
        type,
      };
      const response = await axios.post(
        `${import.meta.env.VITE_API_ROOT}/api/register`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response?.status === HttpStatusCode.Unauthorized
      ) {
        localStorage.removeItem("token");
        window.location.href = "/";
      }
      throw new Error("Failed to login: " + (error as Error).message);
    }
  }

  static async updateUser(
    token: string,
    userId: string,
    userToUpdate: UserUpdateDTO
  ) {
    try {
      if (!userToUpdate.old_password) {
        delete userToUpdate.old_password;
      }
      if (!userToUpdate.password) {
        delete userToUpdate.password;
      }
      if (!userToUpdate.passwordConfirmation) {
        delete userToUpdate.passwordConfirmation;
      }

      const response = await axios.put(
        `${import.meta.env.VITE_API_ROOT}/api/employee/${userId}`,
        userToUpdate,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response?.status === HttpStatusCode.Unauthorized
      ) {
        localStorage.removeItem("token");
        window.location.href = "/";
      }
      throw new Error("Failed to login: " + (error as Error).message);
    }
  }

  static async deleteUser(token: string, userId: string) {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_ROOT}/api/employee/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response?.status === HttpStatusCode.Unauthorized
      ) {
        localStorage.removeItem("token");
        window.location.href = "/";
      }
      throw new Error("Failed to login: " + (error as Error).message);
    }
  }
}

export default UserManager;
