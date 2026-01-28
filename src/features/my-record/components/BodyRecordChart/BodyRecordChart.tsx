"use client";

import { useEffect, useMemo, useState } from "react";

import { homeApi, type ITrendPoint, type TrendPeriod } from "@/features/home/api";
import { Loading } from "@/shared/components/ui/Loading";

import { TrendChart } from "../../../home/components/TrendChart";
import styles from "./BodyRecordChart.module.scss";

type TimePeriod = TrendPeriod;

export function BodyRecordChart() {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>("year");
  const [baseData, setBaseData] = useState<ITrendPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const today = new Date();
  const currentDate = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, "0")}.${String(
    today.getDate()
  ).padStart(2, "0")}`;

  const periods: Array<{ key: TimePeriod; label: string }> = [
    { key: "day", label: "日" },
    { key: "week", label: "週" },
    { key: "month", label: "月" },
    { key: "year", label: "年" },
  ];

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        setIsLoading(true);
        const data = await homeApi.getTrendChart(selectedPeriod);
        if (isMounted) {
          setBaseData(data);
        }
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          // eslint-disable-next-line no-console
          console.error("Failed to load body record chart data", error);
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
  }, [selectedPeriod]);

  const filteredData = useMemo(() => {
    if (baseData.length === 0) return baseData;

    switch (selectedPeriod) {
      case "day":
        // Show only the latest point
        return baseData.slice(-1);
      case "week":
        // Show up to last 7 points
        return baseData.slice(-7);
      case "month":
        // Show up to last 4 points
        return baseData.slice(-4);
      case "year":
      default:
        return baseData;
    }
  }, [baseData, selectedPeriod]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>BODY RECORD</h2>
        <span className={styles.date}>{currentDate}</span>
      </div>
      <div className={styles.chartContainer}>
        {isLoading ? (
          <div className={styles.loadingWrapper}>
            <Loading text="Loading body record..." />
          </div>
        ) : (
          <TrendChart data={filteredData} backgroundColor="#414141" height={202} />
        )}
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
