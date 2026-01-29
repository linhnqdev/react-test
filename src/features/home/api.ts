import { mockApi } from "@/api/endpoints/mock.endpoints";

import type { IMealEntry, ITrendPoint, IFoodProgress } from "./types";

export type TrendPeriod = "day" | "week" | "month" | "year";

export const homeApi = {
  getMealEntries: async (): Promise<IMealEntry[]> => {
    return mockApi.getMealEntries();
  },
  getTrendChart: async (period?: TrendPeriod): Promise<ITrendPoint[]> => {
    return mockApi.getTrendChart(period ?? "year");
  },
  getFoodProgress: async (): Promise<IFoodProgress> => {
    return mockApi.getFoodProgress();
  },
};

