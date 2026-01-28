import axios, { AxiosInstance } from "axios";
import { env } from "@/lib/env";

/**
 * Axios instance for mocking API calls by directly fetching static JSON files
 * from /public/jsons via HTTP (e.g. GET /jsons/columns.json).
 *
 * Why:
 * - Works with Next.js static assets
 * - Feels like "real" API calls (network tab, async, errors)
 */
export const mockHttp: AxiosInstance = axios.create({
  baseURL: "",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

function sleep(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

// Simulate network latency in development (default from env.mockApiDelayMs)
const delayMs = env.mockApiDelayMs;

mockHttp.interceptors.response.use(
  async (response) => {
    if (delayMs > 0) {
      await sleep(delayMs);
    }
    return response;
  },
  async (error) => {
    if (delayMs > 0) {
      await sleep(delayMs);
    }
    throw error;
  }
);

