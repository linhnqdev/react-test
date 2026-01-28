"use client";

import { useAuthStore } from "../auth.store";
import { authApi } from "../auth.api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { ILoginRequest, IRegisterRequest } from "@/shared/types/api.types";

/**
 * Custom hook for authentication
 * Đã tối ưu: không dùng React Query để giảm bundle size và tăng tốc độ
 */
export function useAuth() {
  const router = useRouter();
  const { user, token, isAuthenticated, setAuth, logout: logoutStore } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<Error | null>(null);
  const [registerError, setRegisterError] = useState<Error | null>(null);

  // Login function
  const login = async (data: ILoginRequest) => {
    try {
      setIsLoading(true);
      setLoginError(null);
      const response = await authApi.login(data);
      setAuth(response.user, response.token, response.refreshToken);
      router.push("/my-record");
    } catch (error) {
      const err = error instanceof Error ? error : new Error("Login failed");
      setLoginError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (data: IRegisterRequest) => {
    try {
      setIsLoading(true);
      setRegisterError(null);
      const response = await authApi.register(data);
      setAuth(response.user, response.token, response.refreshToken);
      router.push("/my-record");
    } catch (error) {
      const err = error instanceof Error ? error : new Error("Registration failed");
      setRegisterError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      logoutStore();
      router.push("/login");
    }
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    loginError,
    registerError,
  };
}
