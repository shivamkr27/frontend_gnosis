import axios from "axios";

// The API Gateway runs on port 3000 as per overall-plan.md
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to add JWT token from localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("gnosis_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
