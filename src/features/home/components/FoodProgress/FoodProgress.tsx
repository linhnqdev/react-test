"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { homeApi } from "@/features/home/api";
import type { IFoodProgress } from "@/features/home/types";
import { Loading } from "@/shared/components/ui/Loading";

import styles from "./FoodProgress.module.scss";

export function FoodProgress() {
  const SIZE = 181;
  const STROKE = 4;
  const cx = SIZE / 2;
  const cy = SIZE / 2;
  const r = (SIZE - STROKE) / 2;
  const circumference = 2 * Math.PI * r; // full circle
  const [data, setData] = useState<IFoodProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const result = await homeApi.getFoodProgress();
        if (isMounted) {
          setData(result);
        }
      } catch (error) {
        // Fallback to default mock values if request fails
        if (isMounted) {
          setData({
            date: "05/21",
            progress: 75,
            imageUrl: "/images/food-progress.jpg",
          });
        }
        // Optional: log error in dev
        if (process.env.NODE_ENV === "development") {
          // eslint-disable-next-line no-console
          console.error("Failed to load food progress mock data", error);
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

  const date = data?.date ?? "05/21";
  const progress = data?.progress ?? 75;
  const imageUrl = data?.imageUrl ?? "/images/food-progress.jpg";

  const offset = circumference * (1 - progress / 100);

  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        <Image
          src={imageUrl}
          alt="Food"
          fill
          className={styles.image}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {isLoading ? (
          <div className={styles.placeholder}>
            <Loading text="Loading..." />
          </div>
        ) : (
          <div className={styles.progressOverlay}>
            <svg
              className={styles.progressSvg}
              width={SIZE}
              height={SIZE}
              viewBox={`0 0 ${SIZE} ${SIZE}`}
            >
              {/* Background */}
              <circle
                cx={cx}
                cy={cy}
                r={r}
                fill="none"
                stroke="none"
                strokeWidth={STROKE}
                strokeDasharray={circumference}
                strokeDashoffset={0}
                transform={`rotate(-90 ${cx} ${cy})`}
              />

              {/* Progress */}
              <circle
                cx={cx}
                cy={cy}
                r={r}
                fill="none"
                stroke="#fff"
                strokeWidth={STROKE}
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                transform={`rotate(-90 ${cx} ${cy})`}
              />
            </svg>
            <div className={styles.progressContent}>
              <div className={styles.date}>{date}</div>
              <div className={styles.percentage}>{progress}%</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
