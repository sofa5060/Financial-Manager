import axios from "axios";

type LoginResponse = {
  status: string;
  message: string;
  token: string;
  data: {
    name: string;
    title: string;
    organization_name: string;
    user_id: string;
    type: string;
  };
};
class AuthManager {
  static async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const body = { email, password };

      const response = await axios.post(
        `${import.meta.env.VITE_API_ROOT}/api/login`,
        body
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to login: " + (error as Error).message);
    }
  }
}

export default AuthManager;
