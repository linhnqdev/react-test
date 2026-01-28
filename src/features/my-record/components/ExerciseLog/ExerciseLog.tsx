"use client";

import { useEffect, useState } from "react";

import { myRecordApi } from "@/features/my-record/api";
import type { IExerciseEntry } from "@/features/my-record/types";
import { Loading } from "@/shared/components/ui/Loading";

import styles from "./ExerciseLog.module.scss";

const FALLBACK_EXERCISES: IExerciseEntry[] = [];

export function ExerciseLog() {
  const [entries, setEntries] = useState<IExerciseEntry[]>(FALLBACK_EXERCISES);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const data = await myRecordApi.getExercises();
        if (isMounted && data.length > 0) {
          setEntries(data);
        }
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          // eslint-disable-next-line no-console
          console.error("Failed to load exercise mock data", error);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  const today = new Date();
  const formattedToday = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, "0")}.${String(
    today.getDate()
  ).padStart(2, "0")}`;

  const currentDate = formattedToday;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>MY EXERCISE</h2>
        <span className={styles.date}>{currentDate}</span>
      </div>
      <div className={styles.scrollContainer}>
        {isLoading ? (
          <div className={styles.loadingWrapper}>
            <Loading text="Loading exercises..." />
          </div>
        ) : (
          <div className={styles.list}>
            {entries.map((exercise) => (
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
        )}
      </div>
    </div>
  );
}
