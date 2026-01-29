"use client";

import { useState } from "react";

import styles from "@/app/page.module.scss";

import { MealCategoryButtons } from "./MealCategoryButtons";
import { MealLogGrid } from "./MealLogGrid";

type MealType = "morning" | "lunch" | "dinner" | "snack";

export const HomeMealsSection: React.FC = () => {
  const [selectedMealType, setSelectedMealType] = useState<MealType | null>(null);

  return (
    <>
      <div className={styles.mealCategories}>
        <MealCategoryButtons selected={selectedMealType} onSelect={setSelectedMealType} />
      </div>
      <div className={styles.mealLogSection}>
        <MealLogGrid filter={selectedMealType} />
      </div>
    </>
  );
};

