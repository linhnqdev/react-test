import axios from "axios";

import { env } from "@/lib/env";

/**
 * Lightweight CSR fetch helper.
 * - Ưu tiên window.location.origin khi chạy trên browser
 * - Fallback sang env.appUrl cho SSR/không có window.
 */
const baseURL =
  typeof globalThis !== "undefined" && "window" in globalThis && globalThis.window
    ? globalThis.window.location.origin
    : env.appUrl;

export const client = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

