import { mockApi } from "@/api/endpoints/mock.endpoints";

import type { ColumnCategory, IColumnItem } from "./types";

export type { ColumnCategory, IColumnItem };

export const columnsApi = {
  list: async (): Promise<IColumnItem[]> => {
    return mockApi.getColumns();
  },
};

