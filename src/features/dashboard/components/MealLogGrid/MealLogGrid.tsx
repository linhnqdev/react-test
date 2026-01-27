"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";
import styles from "./MealLogGrid.module.scss";

export interface IMealEntry {
  id: string;
  date: string;
  mealType: "Morning" | "Lunch" | "Dinner" | "Snack";
  imageUrl?: string;
}

export interface IMealLogGridProps {
  entries?: IMealEntry[];
  filter?: "morning" | "lunch" | "dinner" | "snack" | null;
  onLoadMore?: () => void;
}

export function MealLogGrid({ entries, filter, onLoadMore }: IMealLogGridProps) {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [displayCount, setDisplayCount] = useState(8);

  // Mock data
  const allMealEntries: IMealEntry[] =
    entries ||
    [
      { id: "1", date: "05.21", mealType: "Morning", imageUrl: "/images/foods/d01.jpg" },
      { id: "2", date: "05.21", mealType: "Lunch", imageUrl: "/images/foods/d02.jpg" },
      { id: "3", date: "05.21", mealType: "Dinner", imageUrl: "/images/foods/l01.jpg" },
      { id: "4", date: "05.21", mealType: "Snack", imageUrl: "/images/foods/l02.jpg" },
      { id: "5", date: "05.20", mealType: "Morning", imageUrl: "/images/foods/l02.jpg" },
      { id: "6", date: "05.20", mealType: "Lunch", imageUrl: "/images/foods/l03.jpg" },
      { id: "7", date: "05.20", mealType: "Dinner", imageUrl: "/images/foods/m01.jpg" },
      { id: "8", date: "05.20", mealType: "Snack", imageUrl: "/images/foods/s01.jpg" },
      { id: "9", date: "05.19", mealType: "Morning", imageUrl: "/images/foods/d01.jpg" },
      { id: "10", date: "05.19", mealType: "Lunch", imageUrl: "/images/foods/d02.jpg" },
      { id: "11", date: "05.19", mealType: "Dinner", imageUrl: "/images/foods/l01.jpg" },
      { id: "12", date: "05.19", mealType: "Snack", imageUrl: "/images/foods/l02.jpg" },
    ];

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={styles.container}>
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
        <div className={styles.loadMoreSection}>
          <span className={styles.loadMoreLabel}>more record</span>
          <button className={styles.loadMoreButton} onClick={handleLoadMore}>
            記録をもっと見る
          </button>
        </div>
      )}
      {showScrollTop && (
        <button className={styles.scrollTopButton} onClick={scrollToTop} aria-label="Scroll to top">
          <FiArrowUp />
        </button>
      )}
    </div>
  );
}
