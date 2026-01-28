/**
 * Centralized environment helper for NEXT_PUBLIC_* variables.
 * Always import from here instead of using process.env directly
 * in feature/api/lib code (trừ khi đọc env rất đặc biệt).
 */
export const env = {
  /** Base URL cho REST API backend */
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",

  /** Public app URL (dùng cho link tuyệt đối, OG image, v.v.) */
  appUrl: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",

  /** Tên ứng dụng hiển thị trên UI */
  appName: process.env.NEXT_PUBLIC_APP_NAME || "React Test App",

  /** Độ trễ giả lập cho mock API (ms) */
  mockApiDelayMs: process.env.NEXT_PUBLIC_MOCK_API_DELAY_MS
    ? Number(process.env.NEXT_PUBLIC_MOCK_API_DELAY_MS)
    : 400,

  /**
   * Môi trường chạy app: "production" | "staging" | "development".
   * Có thể cấu hình qua NEXT_PUBLIC_APP_ENV, nếu không sẽ suy ra từ NODE_ENV.
   */
  appEnv:
    process.env.NEXT_PUBLIC_APP_ENV ??
    (process.env.NODE_ENV === "production"
      ? "production"
      : process.env.NODE_ENV === "development"
        ? "development"
        : "staging"),

  /** Helper flags để code dễ đọc hơn */
  get isProd() {
    return this.appEnv === "production";
  },
  get isStg() {
    return this.appEnv === "staging";
  },
  get isDev() {
    return this.appEnv === "development";
  },
} as const;

