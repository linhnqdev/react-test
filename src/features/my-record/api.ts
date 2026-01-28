import { mockApi } from "@/api/endpoints/mock.endpoints";
import type { IExerciseEntry, IDiaryEntry } from "./types";

export type { IExerciseEntry, IDiaryEntry };

/**
 * CSR API layer for my-record feature (mock-based).
 */
export const myRecordApi = {
  getExercises: async (): Promise<IExerciseEntry[]> => {
    return mockApi.getExercises();
  },
  getDiaryEntries: async (): Promise<IDiaryEntry[]> => {
    return mockApi.getDiaryEntries();
  },
};

