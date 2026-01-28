"use client";

import styles from "./ExerciseLog.module.scss";

interface IExerciseEntry {
  id: string;
  name: string;
  calories: number;
  duration: number;
}

const exercises: IExerciseEntry[] = [
  { id: "1", name: "家事全般(立位・軽い)", calories: 26, duration: 10 },
  { id: "2", name: "家事全般(立位・軽い)", calories: 26, duration: 10 },
  { id: "3", name: "家事全般(立位・軽い)", calories: 26, duration: 10 },
  { id: "4", name: "家事全般(立位・軽い)", calories: 26, duration: 10 },
  { id: "5", name: "家事全般(立位・軽い)", calories: 26, duration: 10 },
  { id: "6", name: "家事全般(立位・軽い)", calories: 26, duration: 10 },
  { id: "7", name: "家事全般(立位・軽い)", calories: 26, duration: 10 },
  { id: "8", name: "家事全般(立位・軽い)", calories: 26, duration: 10 },
  { id: "9", name: "家事全般(立位・軽い)", calories: 26, duration: 10 },
  { id: "10", name: "家事全般(立位・軽い)", calories: 26, duration: 10 },
  { id: "11", name: "家事全般(立位・軽い)", calories: 26, duration: 10 },
  { id: "12", name: "家事全般(立位・軽い)", calories: 26, duration: 10 },
  { id: "13", name: "家事全般(立位・軽い)", calories: 26, duration: 10 },
  { id: "14", name: "家事全般(立位・軽い)", calories: 26, duration: 10 },
  { id: "15", name: "家事全般(立位・軽い)", calories: 26, duration: 10 },
];

export function ExerciseLog() {
  const currentDate = "2021.05.21";

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>MY EXERCISE</h2>
        <span className={styles.date}>{currentDate}</span>
      </div>
      <div className={styles.scrollContainer}>
        <div className={styles.list}>
          {exercises.map((exercise) => (
            <div key={exercise.id} className={styles.entry}>
              <div className={styles.bullet} />
              <div className={styles.content}>
                <div className={styles.nameRow}>
                  <span className={styles.name}>{exercise.name}</span>
                  <span className={styles.duration}>{exercise.duration} min</span>
                </div>
                <div className={styles.calories}>{exercise.calories}kcal</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
