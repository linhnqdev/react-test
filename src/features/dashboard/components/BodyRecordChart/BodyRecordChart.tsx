"use client";

import { useState } from "react";
import { TrendChart } from "../TrendChart";
import styles from "./BodyRecordChart.module.scss";

type TimePeriod = "day" | "week" | "month" | "year";

export function BodyRecordChart() {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>("year");
  const currentDate = "2021.05.21";

  const periods: Array<{ key: TimePeriod; label: string }> = [
    { key: "day", label: "日" },
    { key: "week", label: "週" },
    { key: "month", label: "月" },
    { key: "year", label: "年" },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>BODY RECORD</h2>
        <span className={styles.date}>{currentDate}</span>
      </div>
      <div className={styles.chartContainer}>
        <TrendChart backgroundColor="#414141" />
      </div>
      <div className={styles.filters}>
        {periods.map((period) => (
          <button
            key={period.key}
            className={`${styles.filterButton} ${selectedPeriod === period.key ? styles.active : ""}`}
            onClick={() => setSelectedPeriod(period.key)}
          >
            {period.label}
          </button>
        ))}
      </div>
    </div>
  );
}
