"use client";

import { useEffect, useState } from "react";

import { myRecordApi } from "@/features/my-record/api";
import type { IDiaryEntry } from "@/features/my-record/types";
import { LoadMoreButton } from "@/shared/components/ui/LoadMoreButton";
import { Loading } from "@/shared/components/ui/Loading";
import styles from "./DiaryGrid.module.scss";

const FALLBACK_DIARY_ENTRIES: IDiaryEntry[] = [];

export function DiaryGrid() {
  const [allDiaryEntries, setAllDiaryEntries] = useState<IDiaryEntry[]>(FALLBACK_DIARY_ENTRIES);
  const [displayCount, setDisplayCount] = useState(8);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const data = await myRecordApi.getDiaryEntries();
        if (isMounted && data.length > 0) {
          setAllDiaryEntries(data);
        }
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          // eslint-disable-next-line no-console
          console.error("Failed to load diary mock data", error);
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

  const displayedEntries = allDiaryEntries.slice(0, displayCount);
  const hasMore = allDiaryEntries.length > displayCount;

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + 8);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>MY DIARY</h2>
      {isLoading ? (
        <div className={styles.loadingWrapper}>
          <Loading text="Loading diaries..." />
        </div>
      ) : (
        <>
          <div className={styles.grid}>
            {displayedEntries.map((entry) => (
              <div key={entry.id} className={styles.card}>
                <div className={styles.dateTime}>
                  <span>{entry.date}</span>
                  <span>{entry.time}</span>
                </div>
                <div className={styles.content}>{entry.name}</div>
                <div className={styles.content}>{entry.content}</div>
              </div>
            ))}
          </div>
          {hasMore && (
            <div className="text-center">
              <LoadMoreButton label="自分の日記をもっと見る" onClick={handleLoadMore} />
            </div>
          )}
        </>
      )}
    </div>
  );
}
