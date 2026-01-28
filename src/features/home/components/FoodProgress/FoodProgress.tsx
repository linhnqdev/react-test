"use client";

import Image from "next/image";
import styles from "./FoodProgress.module.scss";

export interface IFoodProgressProps {
  date?: string;
  progress?: number;
  imageUrl?: string;
}

export function FoodProgress({ date = "05/21", progress = 75, imageUrl }: IFoodProgressProps) {
  const SIZE = 181;
  const STROKE = 4;
  const cx = SIZE / 2;
  const cy = SIZE / 2;
  const r = (SIZE - STROKE) / 2;
  const circumference = 2 * Math.PI * r; // full circle
  const offset = circumference * (1 - (progress /  100));

  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt="Food"
            fill
            className={styles.image}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className={styles.placeholder}>
            <span>Food Image</span>
          </div>
        )}
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
      </div>
    </div>
  );
}
