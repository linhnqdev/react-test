/**
 * Route Constants
 */

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  MY_RECORD: "/my-record",
  COLUMNS: "/columns",
  PROFILE: "/profile",
  NOT_FOUND: "/404",
} as const;

export const PROTECTED_ROUTES = [ROUTES.MY_RECORD, ROUTES.COLUMNS, ROUTES.PROFILE] as const;

export const PUBLIC_ROUTES = [ROUTES.HOME, ROUTES.LOGIN, ROUTES.REGISTER] as const;
