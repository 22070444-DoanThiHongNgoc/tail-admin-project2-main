// src/services/AuthService.ts
import { apiClient } from "@/lib/api/ApiClient";

interface LoginResponse {
  access_token: string;
  user?: any;
}

export const AuthService = {
  async signin(email: string, password: string) {
    try {
      const res = await apiClient.post<LoginResponse>("/auth/login", {
        username: email,
        password: password,
      });

      const data = res.data;

      if (data?.access_token) {
        localStorage.setItem("token", data.access_token);
        document.cookie = `token=${data.access_token}; path=/; max-age=3600;`;
        return data;
      }

      throw new Error("No access token received");
    } catch (err: any) {
      throw new Error(err.message || "Invalid email or password");
    }
  },

  async signup(email: string, password: string) {
    const res = await apiClient.post("/auth/register", { email, password });
    return res.data;
  },

  logout() {
    localStorage.removeItem("token");
    document.cookie =
      "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
  },
};
