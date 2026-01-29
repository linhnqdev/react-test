// Domain types for columns feature
export type ColumnCategory = "recommended" | "diet" | "beauty" | "health";

export interface IColumnItem {
  id: string;
  category: ColumnCategory;
  imageUrl: string;
  date: string;
  time: string;
  title: string;
  tags: string[];
}

