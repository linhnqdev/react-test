import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { setupInterceptors } from "./interceptors";
import { env } from "@/lib/env";

/**
 * Create and configure Axios instance with base URL and default settings
 * NOTE: Client-only – dùng trong CSR (hooks, client components).
 */
export const http: AxiosInstance = axios.create({
  baseURL: env.apiUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Setup interceptors
setupInterceptors(http);

// Export types for use in other files
export type { AxiosResponse, AxiosError };
export type { InternalAxiosRequestConfig as AxiosRequestConfig };
