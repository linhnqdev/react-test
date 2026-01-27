"use client";

import Link from "next/link";
import { useState } from "react";

import { FoodProgress } from "@/features/dashboard/components/FoodProgress";
import { MealCategoryButtons } from "@/features/dashboard/components/MealCategoryButtons";
import { MealLogGrid } from "@/features/dashboard/components/MealLogGrid";
import { TrendChart } from "@/features/dashboard/components/TrendChart";
import { MainLayout } from "@/shared/components/layout/MainLayout";
import { Button } from "@/shared/components/ui/Button";
import { Card } from "@/shared/components/ui/Card";

import styles from "./page.module.scss";

export default function Home() {
  const [selectedMealType, setSelectedMealType] = useState<"morning" | "lunch" | "dinner" | "snack" | null>(null);

  return (
    <MainLayout>
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
    </MainLayout>
  );
}
