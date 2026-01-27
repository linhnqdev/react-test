"use client";

import Image from "next/image";
import styles from "./FoodProgress.module.scss";

export interface IFoodProgressProps {
  date?: string;
  progress?: number;
  imageUrl?: string;
}

export function FoodProgress({ date = "05/21", progress = 75, imageUrl }: IFoodProgressProps) {
  // Calculate arc path for semi-circle progress
  const radius = 50;
  const circumference = Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

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
          <svg className={styles.progressSvg} viewBox="0 0 120 70">
            {/* Background arc */}
            <path
              d="M 10 60 A 50 50 0 0 1 110 60"
              fill="none"
              stroke="rgba(255, 255, 255, 0.3)"
              strokeWidth="4"
            />
            {/* Progress arc */}
            <path
              d="M 10 60 A 50 50 0 0 1 110 60"
              fill="none"
              stroke="#ffffff"
              strokeWidth="4"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
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
