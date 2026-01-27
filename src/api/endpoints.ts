import { http } from "./http";
import type { ILoginRequest, ILoginResponse, IRegisterRequest, IRegisterResponse } from "@/shared/types/api.types";
import type { IUser, ICreateUserRequest, IUpdateUserRequest } from "@/shared/types/user.types";

/**
 * Authentication API endpoints
 */
export const authApi = {
  /**
   * Login user
   */
  login: async (data: ILoginRequest): Promise<ILoginResponse> => {
    const response = await http.post<ILoginResponse>("/auth/login", data);
    return response.data;
  },

  /**
   * Register new user
   */
  register: async (data: IRegisterRequest): Promise<IRegisterResponse> => {
    const response = await http.post<IRegisterResponse>("/auth/register", data);
    return response.data;
  },

  /**
   * Logout user
   */
  logout: async (): Promise<void> => {
    await http.post("/auth/logout");
  },

  /**
   * Refresh access token
   */
  refreshToken: async (refreshToken: string): Promise<{ token: string; refreshToken: string }> => {
    const response = await http.post<{ token: string; refreshToken: string }>(
      "/auth/refresh",
      { refreshToken }
    );
    return response.data;
  },

  /**
   * Get current user
   */
  getCurrentUser: async (): Promise<IUser> => {
    const response = await http.get<IUser>("/auth/me");
    return response.data;
  },
};

/**
 * User API endpoints
 */
export const userApi = {
  /**
   * Get all users
   */
  getAll: async (): Promise<IUser[]> => {
    const response = await http.get<IUser[]>("/users");
    return response.data;
  },

  /**
   * Get user by ID
   */
  getById: async (id: string | number): Promise<IUser> => {
    const response = await http.get<IUser>(`/users/${id}`);
    return response.data;
  },

  /**
   * Create new user
   */
  create: async (data: ICreateUserRequest): Promise<IUser> => {
    const response = await http.post<IUser>("/users", data);
    return response.data;
  },

  /**
   * Update user
   */
  update: async (id: string | number, data: IUpdateUserRequest): Promise<IUser> => {
    const response = await http.put<IUser>(`/users/${id}`, data);
    return response.data;
  },

  /**
   * Delete user
   */
  delete: async (id: string | number): Promise<void> => {
    await http.delete(`/users/${id}`);
  },
};
