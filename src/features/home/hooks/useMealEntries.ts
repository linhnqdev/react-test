"use client";

import { useEffect, useState } from "react";

import { homeApi } from "../api";
import type { IMealEntry } from "../types";

export interface UseMealEntriesResult {
  entries: IMealEntry[];
  isLoading: boolean;
  error: string | null;
  reload: () => void;
}

export function useMealEntries(): UseMealEntriesResult {
  const [entries, setEntries] = useState<IMealEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await homeApi.getMealEntries();
      setEntries(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load meals");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    entries,
    isLoading,
    error,
    reload: () => {
      void load();
    },
  };
}

