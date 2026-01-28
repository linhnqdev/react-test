import {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";

/**
 * Setup request and response interceptors for Axios instance
 * @param instance - Axios instance to setup interceptors for
 */
export function setupInterceptors(instance: AxiosInstance): void {
  // Request Interceptor
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // Log request in development
      if (process.env.NODE_ENV === "development") {
        console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`, {
          data: config.data,
          params: config.params,
        });
      }

      return config;
    },
    (error: AxiosError) => {
      // Handle request error
      console.error("[API Request Error]", error);
      return Promise.reject(error);
    }
  );

  // Response Interceptor
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      // Log response in development
      if (process.env.NODE_ENV === "development") {
        console.log(`[API Response] ${response.config.method?.toUpperCase()} ${response.config.url}`, {
          status: response.status,
          data: response.data,
        });
      }

      return response;
    },
    async (error: AxiosError) => {
      // Handle errors (logging only, no auth logic)
      const errorMessage = getErrorMessage(error);
      console.error("[API Response Error]", {
        status: error.response?.status,
        message: errorMessage,
        url: error.config?.url,
      });

      return Promise.reject(error);
    }
  );
}

/**
 * Extract error message from Axios error
 */
function getErrorMessage(error: AxiosError): string {
  if (error.response?.data) {
    const data = error.response.data as { message?: string; error?: string };
    return data.message || data.error || "An error occurred";
  }
  if (error.message) {
    return error.message;
  }
  return "Network error. Please check your connection.";
}
