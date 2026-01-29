import type { IUser, ICreateUserRequest, IUpdateUserRequest } from "@/shared/types/user.types";

import { http } from "./http";

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
