import axios from "axios";

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
  withCredentials: false, // ubah ke true kalau backend pakai cookie auth
});

// ✅ Request Interceptor (contoh: tambahkan token)
api.interceptors.request.use(
  async (config) => {
    // Jika kamu punya mekanisme auth token, ambil di sini
    // const token = getTokenFromCookie() || getTokenFromLocalStorage();
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ✅ Response Interceptor (contoh: logging, refresh token, dsb)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error?.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
