import type { ColumnCategory, IColumnItem } from "./types";
import { mockApi } from "@/api/endpoints/mock.endpoints";

export type { ColumnCategory, IColumnItem };

export const columnsApi = {
  list: async (): Promise<IColumnItem[]> => {
    return mockApi.getColumns();
  },
};

