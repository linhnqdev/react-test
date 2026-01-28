import type { IMealEntry, ITrendPoint } from "@/api/endpoints/mock.endpoints";

export type { IMealEntry, ITrendPoint };

export interface IFoodProgress {
  date: string;
  progress: number;
  imageUrl?: string;
}


