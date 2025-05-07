// axiosInstance.js
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // Ensures cookies are sent with each request
});

// Response Interceptor: Handle token expiration
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check for 401 Unauthorized error and prevent infinite loops
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Attempt to refresh the access token
        await axiosInstance.get("/api/users/refresh-token");

        // Retry the original request
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("🔒 Token refresh failed:", refreshError);
        // Optional: Redirect to login page or dispatch logout action
        useNavigate("/auth");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
