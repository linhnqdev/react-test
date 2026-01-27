/**
 * Environment variables (NEXT_PUBLIC_* only)
 * These are exposed to the client-side
 */

export const env = {
  API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
  APP_URL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || "React Test App",
} as const;
