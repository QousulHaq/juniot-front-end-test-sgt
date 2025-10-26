import axios, { AxiosHeaders } from "axios";
import { auth } from "./firebaseClient";

/**
 * Axios instance utama untuk API backend.
 * Base URL diambil dari environment variable:
 *   - NEXT_PUBLIC_BACKEND_URL (untuk akses di client)
 *   - BACKEND_URL (untuk akses di server)
 */
const baseURL =
  typeof window === "undefined"
    ? process.env.BACKEND_URL
    : process.env.NEXT_PUBLIC_BACKEND_URL;

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

api.interceptors.request.use(
  async (config) => {
    try {
      const user = auth.currentUser;
      if (user) {
        const token = await user.getIdToken(false);
        if (token) {
          if (!(config.headers instanceof AxiosHeaders)) {
            config.headers = new AxiosHeaders(config.headers);
          }
          config.headers.set("Authorization", `Bearer ${token}`);
        }
      }
    } catch (err) {
      console.warn("Failed to attach firebase token", err);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error?.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
