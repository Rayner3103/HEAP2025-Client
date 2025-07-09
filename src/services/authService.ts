// TODO: Change PW
import { apiService } from "./apiService";

export const authService = {
  login: async (email: string, password: string) => {
    try{
      const data = {
        email,
        password
      }
      const res = await apiService.performRequest("POST", "/login", data);
      return res.data;
    } catch (e: any) {
      throw new Error(e.response?.data?.error || "Login failed");
    }
  }
}