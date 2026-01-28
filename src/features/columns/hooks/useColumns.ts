"use client";

import { useEffect, useState } from "react";

import { columnsApi, type IColumnItem } from "../api";

export interface UseColumnsResult {
  items: IColumnItem[];
  isLoading: boolean;
  error: string | null;
  reload: () => void;
}

export function useColumns(): UseColumnsResult {
  const [items, setItems] = useState<IColumnItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await columnsApi.list();
      setItems(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load columns");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    items,
    isLoading,
    error,
    reload: () => {
      void load();
    },
  };
}

