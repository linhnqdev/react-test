export interface IExerciseEntry {
  id: string;
  /** Display date for the exercise log header */
  date: string;
  name: string;
  calories: number;
  duration: number;
}

export interface IDiaryEntry {
  id: string;
  date: string;
  time: string;
  name: string;
  content: string;
}

