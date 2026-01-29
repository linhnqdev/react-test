"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { useMealEntries } from "@/features/home/hooks/useMealEntries";
import type { IMealEntry } from "@/features/home/types";
import { Loading } from "@/shared/components/ui/Loading";
import { LoadMoreButton } from "@/shared/components/ui/LoadMoreButton";

import styles from "./MealLogGrid.module.scss";

export interface IMealLogGridProps {
  entries?: IMealEntry[];
  filter?: "morning" | "lunch" | "dinner" | "snack" | null;
  onLoadMore?: () => void;
}

export function MealLogGrid({ entries, filter, onLoadMore }: Readonly<IMealLogGridProps>) {
  const [_showScrollTop, setShowScrollTop] = useState(false);
  const [displayCount, setDisplayCount] = useState(8);
  const { entries: remoteEntries, isLoading, error, reload } = useMealEntries();

  useEffect(() => {
    const onScroll = () => {
      setShowScrollTop(window.scrollY > 200);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const allMealEntries: IMealEntry[] =
    entries && entries.length > 0
      ? entries
      : remoteEntries.map((x) => ({
          id: x.id,
          date: x.date,
          mealType: x.mealType,
          imageUrl: x.imageUrl,
        }));

  // Filter entries
  const filteredEntries = filter
    ? allMealEntries.filter((entry) => entry.mealType.toLowerCase() === filter)
    : allMealEntries;

  // Reset display count when filter changes
  useEffect(() => {
    setDisplayCount(8);
  }, [filter]);

  // Display entries based on count
  const mealEntries = filteredEntries.slice(0, displayCount);
  const hasMore = filteredEntries.length > displayCount;

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + 8);
    onLoadMore?.();
  };

  return (
    <div className="container">
      <div className={styles.container}>
        {isLoading && <Loading text="Loading..." />}
        {error && (
          <div className="text-center py-4" role="alert">
            <p className="mb-3">{error}</p>
            <LoadMoreButton
              label="Retry"
              onClick={reload}
            />
          </div>
        )}

        <div className={styles.grid}>
          {mealEntries.map((entry) => (
            <div key={entry.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                {entry.imageUrl ? (
                  <Image
                    src={entry.imageUrl}
                    alt={`${entry.mealType} on ${entry.date}`}
                    fill
                    className={styles.image}
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                ) : (
                  <div className={styles.placeholder}>
                    <span>{entry.mealType}</span>
                  </div>
                )}
                <div className={styles.overlay}>
                  <span className={styles.overlayText}>
                    {entry.date}.{entry.mealType}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {hasMore && (
          <div className="text-center">
            <LoadMoreButton
              label="記録をもっと見る"
              onClick={handleLoadMore}
            />
          </div>
        )}
      </div>
    </div>
  );
}
