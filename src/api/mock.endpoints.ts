import type { IColumnItem } from "@/features/columns/types";
import type { IMealEntry, ITrendPoint, IFoodProgress } from "@/features/home/types";
import type { IExerciseEntry, IDiaryEntry } from "@/features/my-record/types";

import { mockHttp } from "./mockHttp";

type TrendPeriod = "day" | "week" | "month" | "year";

interface IListResponse<T> {
  items: T[];
}

export const mockApi = {
  getColumns: async (): Promise<IColumnItem[]> => {
    const res = await mockHttp.get<IListResponse<IColumnItem>>("/jsons/columns.json");
    return res.data.items;
  },
  getMealEntries: async (): Promise<IMealEntry[]> => {
    const res = await mockHttp.get<IListResponse<IMealEntry>>("/jsons/meal-entries.json");
    return res.data.items;
  },
  getTrendChart: async (period: TrendPeriod = "year"): Promise<ITrendPoint[]> => {
    let path = "/jsons/trend-chart-year.json";
    if (period === "day") {
      path = "/jsons/trend-chart-day.json";
    } else if (period === "week") {
      path = "/jsons/trend-chart-week.json";
    } else if (period === "month") {
      path = "/jsons/trend-chart-month.json";
    }

    const res = await mockHttp.get<IListResponse<ITrendPoint>>(path);
    return res.data.items;
  },
  getFoodProgress: async (): Promise<IFoodProgress> => {
    const res = await mockHttp.get<IListResponse<IFoodProgress>>("/jsons/food-progress.json");
    // For now we only expect a single item
    return res.data.items[0]!;
  },
  getExercises: async (): Promise<IExerciseEntry[]> => {
    const res = await mockHttp.get<IListResponse<IExerciseEntry>>("/jsons/my-exercises.json");
    return res.data.items;
  },
  getDiaryEntries: async (): Promise<IDiaryEntry[]> => {
    const res = await mockHttp.get<IListResponse<IDiaryEntry>>("/jsons/my-diaries.json");
    return res.data.items;
  },
};

