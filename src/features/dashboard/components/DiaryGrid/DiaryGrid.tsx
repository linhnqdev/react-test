"use client";

import { useState } from "react";
import styles from "./DiaryGrid.module.scss";

interface IDiaryEntry {
  id: string;
  date: string;
  time: string;
  content: string;
}

const allDiaryEntries: IDiaryEntry[] = [
  {
    id: "1",
    date: "2021.05.21",
    time: "23:25",
    content: "私の日記の記録が一部表示されます。テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト...",
  },
  {
    id: "2",
    date: "2021.05.21",
    time: "23:25",
    content: "私の日記の記録が一部表示されます。テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト...",
  },
  {
    id: "3",
    date: "2021.05.21",
    time: "23:25",
    content: "私の日記の記録が一部表示されます。テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト...",
  },
  {
    id: "4",
    date: "2021.05.21",
    time: "23:25",
    content: "私の日記の記録が一部表示されます。テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト...",
  },
  {
    id: "5",
    date: "2021.05.21",
    time: "23:25",
    content: "私の日記の記録が一部表示されます。テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト...",
  },
  {
    id: "6",
    date: "2021.05.21",
    time: "23:25",
    content: "私の日記の記録が一部表示されます。テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト...",
  },
  {
    id: "7",
    date: "2021.05.21",
    time: "23:25",
    content: "私の日記の記録が一部表示されます。テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト...",
  },
  {
    id: "8",
    date: "2021.05.21",
    time: "23:25",
    content: "私の日記の記録が一部表示されます。テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト...",
  },
];

export function DiaryGrid() {
  const [displayCount, setDisplayCount] = useState(8);
  const displayedEntries = allDiaryEntries.slice(0, displayCount);
  const hasMore = allDiaryEntries.length > displayCount;

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + 8);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>MY DIARY</h2>
      <div className={styles.grid}>
        {displayedEntries.map((entry) => (
          <div key={entry.id} className={styles.card}>
            <div className={styles.dateTime}>
              {entry.date} {entry.time}
            </div>
            <div className={styles.content}>{entry.content}</div>
          </div>
        ))}
      </div>
      {hasMore && (
        <div className={styles.loadMoreContainer}>
          <button className={styles.loadMoreButton} onClick={handleLoadMore}>
            自分の日記をもっと見る
          </button>
        </div>
      )}
    </div>
  );
}
