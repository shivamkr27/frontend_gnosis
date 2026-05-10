import { create } from "zustand";
import api from "../api/axios";

const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem("gnosis_token") || null,
  isAuthenticated: !!localStorage.getItem("gnosis_token"),
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      // Assuming auth-service is routed via API gateway at /auth/login
      const response = await api.post("/auth/login", { email, password });
      const { token, user } = response.data;

      localStorage.setItem("gnosis_token", token);
      set({ user, token, isAuthenticated: true, isLoading: false });
      return true;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Login failed",
        isLoading: false,
      });
      return false;
    }
  },

  register: async (username, email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post("/auth/register", {
        username,
        email,
        password,
      });
      const { token, user } = response.data;

      localStorage.setItem("gnosis_token", token);
      set({ user, token, isAuthenticated: true, isLoading: false });
      return true;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Registration failed",
        isLoading: false,
      });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem("gnosis_token");
    set({ user: null, token: null, isAuthenticated: false, error: null });
  },

  // Method to fetch current user profile using token
  fetchProfile: async () => {
    try {
      const response = await api.get("/auth/profile");
      set({ user: response.data });
    } catch (error) {
      console.error("Failed to fetch profile", error);
      // Optional: auto-logout on 401
      if (error.response?.status === 401) {
        localStorage.removeItem("gnosis_token");
        set({ user: null, token: null, isAuthenticated: false });
      }
    }
  },
}));

export default useAuthStore;
