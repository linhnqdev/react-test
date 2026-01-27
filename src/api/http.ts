import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { setupInterceptors } from "./interceptors";

/**
 * Create and configure Axios instance with base URL and default settings
 */
export const http: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
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
