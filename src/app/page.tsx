"use client";

import { useState } from "react";

import { FoodProgress } from "@/features/home/components/FoodProgress";
import { MealCategoryButtons } from "@/features/home/components/MealCategoryButtons";
import { MealLogGrid } from "@/features/home/components/MealLogGrid";
import { TrendChart } from "@/features/home/components/TrendChart";
import { MainLayout } from "@/shared/components/layout/MainLayout";

import styles from "./page.module.scss";

export default function Home() {
  const [selectedMealType, setSelectedMealType] = useState<"morning" | "lunch" | "dinner" | "snack" | null>(null);

  return (
    <MainLayout>
      <div className={styles.container}>
        <div className={styles.topPage}>
          <div className={styles.topPageBanner}>
            <FoodProgress date="05/21" progress={75} imageUrl="/images/food-progress.jpg" />
          </div>
          <div className={styles.topPageChart}>
            <TrendChart />
          </div>
        </div>
        <div className={styles.mealCategories}>
          <MealCategoryButtons selected={selectedMealType} onSelect={setSelectedMealType} />
        </div>
        <div className={styles.mealLogSection}>
          <MealLogGrid filter={selectedMealType} />
        </div>
      </div>
    </MainLayout>
  );
}
