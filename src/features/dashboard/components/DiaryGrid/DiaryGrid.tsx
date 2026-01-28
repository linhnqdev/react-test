"use client";

import { useState } from "react";
import { LoadMoreButton } from "@/shared/components/ui/LoadMoreButton";
import styles from "./DiaryGrid.module.scss";

interface IDiaryEntry {
  id: string;
  date: string;
  time: string;
  name: string;
  content: string;
}

const allDiaryEntries: IDiaryEntry[] = [
  {
    id: "1",
    date: "2021.05.21",
    time: "23:25",
    name: "私の日記の記録が一部表示されます。",
    content: "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト...",
  },
  {
    id: "2",
    date: "2021.05.21",
    time: "23:25",
    name: "私の日記の記録が一部表示されます。",
    content: "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト...",
  },
  {
    id: "3",
    date: "2021.05.21",
    time: "23:25",
    name: "私の日記の記録が一部表示されます。",
    content: "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト...",
  },
  {
    id: "4",
    date: "2021.05.21",
    time: "23:25",
    name: "私の日記の記録が一部表示されます。",
    content: "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト...",
  },
  {
    id: "5",
    date: "2021.05.21",
    time: "23:25",
    name: "私の日記の記録が一部表示されます。",
    content: "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト...",
  },
  {
    id: "6",
    date: "2021.05.21",
    time: "23:25",
    name: "私の日記の記録が一部表示されます。",
    content: "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト...",
  },
  {
    id: "7",
    date: "2021.05.21",
    time: "23:25",
    name: "私の日記の記録が一部表示されます。",
    content: "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト...",
  },
  {
    id: "8",
    date: "2021.05.21",
    time: "23:25",
    name: "私の日記の記録が一部表示されます。",
    content: "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト...",
  },
  {
    id: "9",
    date: "2021.05.21",
    time: "23:25",
    name: "私の日記の記録が一部表示されます。",
    content: "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト...",
  },
  {
    id: "10",
    date: "2021.05.21",
    time: "23:25",
    name: "私の日記の記録が一部表示されます。",
    content: "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト...",
  },
  {
    id: "11",
    date: "2021.05.21",
    time: "23:25",
    name: "私の日記の記録が一部表示されます。",
    content: "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト...",
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
          <LoadMoreButton
            label="自分の日記をもっと見る"
            onClick={handleLoadMore}
          />
        </div>
      )}
    </div>
  );
}
