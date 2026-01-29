// Domain types for home feature
export interface IMealEntry {
  id: string;
  date: string;
  mealType: "Morning" | "Lunch" | "Dinner" | "Snack";
  imageUrl?: string;
}

export interface ITrendPoint {
  month: string;
  value1: number;
  value2: number;
}

export interface IFoodProgress {
  date: string;
  progress: number;
  imageUrl?: string;
}


