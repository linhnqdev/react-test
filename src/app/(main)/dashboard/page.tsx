"use client";

import { FoodProgress } from "@/features/dashboard/components/FoodProgress";
import { TrendChart } from "@/features/dashboard/components/TrendChart";
import { MealCategoryButtons } from "@/features/dashboard/components/MealCategoryButtons";
import { MealLogGrid } from "@/features/dashboard/components/MealLogGrid";

export default function DashboardPage() {
  return (
    <div className="container">
      {/* Top Section: Food Progress and Chart */}
      <div className="row g-4 mb-4">
        <div className="col-md-6">
          <FoodProgress date="05/21" progress={75} />
        </div>
        <div className="col-md-6">
          <TrendChart />
        </div>
      </div>

      {/* Meal Category Buttons */}
      <MealCategoryButtons />

      {/* Meal Log Grid */}
      <MealLogGrid />
    </div>
  );
}
