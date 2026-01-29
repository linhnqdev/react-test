import type { IUser } from "./user.types";

/**
 * API Request/Response Types
 */

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResponse {
  user: IUser;
  token: string;
  refreshToken?: string;
}

export interface IRegisterRequest {
  email: string;
  password: string;
  name: string;
  confirmPassword?: string;
}

export interface IRegisterResponse {
  user: IUser;
  token: string;
  refreshToken?: string;
}

export interface IApiError {
  message: string;
  error?: string;
  statusCode?: number;
  errors?: Record<string, string[]>;
}

export interface IApiResponse<T = unknown> {
  data: T;
  message?: string;
  success: boolean;
}
