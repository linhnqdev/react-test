import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import type { IUser } from "@/shared/types/user.types";

interface IAuthState {
  user: IUser | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface IAuthActions {
  setUser: (user: IUser | null) => void;
  setToken: (token: string | null) => void;
  setRefreshToken: (refreshToken: string | null) => void;
  setAuth: (user: IUser, token: string, refreshToken?: string) => void;
  logout: () => void;
  setLoading: (isLoading: boolean) => void;
}

export type IAuthStore = IAuthState & IAuthActions;

const initialState: IAuthState = {
  user: null,
  token: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
};

/**
 * Auth store using Zustand with persist and immer middleware
 */
export const useAuthStore = create<IAuthStore>()(
  persist(
    immer((set) => ({
      ...initialState,

      setUser: (user) =>
        set((state) => {
          state.user = user;
          state.isAuthenticated = !!user;
        }),

      setToken: (token) =>
        set((state) => {
          state.token = token;
          if (token && typeof window !== "undefined") {
            localStorage.setItem("auth_token", token);
          }
        }),

      setRefreshToken: (refreshToken) =>
        set((state) => {
          state.refreshToken = refreshToken;
          if (refreshToken && typeof window !== "undefined") {
            localStorage.setItem("refresh_token", refreshToken);
          }
        }),

      setAuth: (user, token, refreshToken) =>
        set((state) => {
          state.user = user;
          state.token = token;
          state.refreshToken = refreshToken || null;
          state.isAuthenticated = true;
          if (typeof window !== "undefined") {
            localStorage.setItem("auth_token", token);
            if (refreshToken) {
              localStorage.setItem("refresh_token", refreshToken);
            }
          }
        }),

      logout: () =>
        set((state) => {
          state.user = null;
          state.token = null;
          state.refreshToken = null;
          state.isAuthenticated = false;
          if (typeof window !== "undefined") {
            localStorage.removeItem("auth_token");
            localStorage.removeItem("refresh_token");
          }
        }),

      setLoading: (isLoading) =>
        set((state) => {
          state.isLoading = isLoading;
        }),
    })),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
