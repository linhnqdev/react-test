"use client";

import { useEffect, useState } from "react";

import { homeApi, type ITrendPoint } from "../api";

export interface UseTrendChartResult {
  data: ITrendPoint[];
  isLoading: boolean;
  error: string | null;
  reload: () => void;
}

export function useTrendChart(initial?: ITrendPoint[]): UseTrendChartResult {
  const [data, setData] = useState<ITrendPoint[]>(initial ?? []);
  const [isLoading, setIsLoading] = useState(!initial || initial.length === 0);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await homeApi.getTrendChart("year");
      setData(res);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load chart data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (initial && initial.length > 0) return;
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    data,
    isLoading,
    error,
    reload: () => {
      void load();
    },
  };
}

