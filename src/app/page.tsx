import type { Metadata } from "next";

import { FoodProgress } from "@/features/home/components/FoodProgress";
import { HomeMealsSection } from "@/features/home/components/HomeMealsSection";
import { TrendChart } from "@/features/home/components/TrendChart";
import { getHomeMeta } from "@/features/home/server";
import { MainLayout } from "@/shared/components/layout/MainLayout";

import styles from "./page.module.scss";

export async function generateMetadata(): Promise<Metadata> {
  const meta = await getHomeMeta();

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    openGraph: {
      title: meta.title,
      description: meta.description,
      images: meta.ogImage ? [{ url: meta.ogImage }] : undefined,
    },
  };
}

export default async function Home() {
  const meta = await getHomeMeta();
  return (
    <MainLayout>
      <div className={styles.container}>
        <h1 className="d-none">
          {meta.heading ?? meta.title}
        </h1>
        <div className={styles.topPage}>
          <div className={styles.topPageBanner}>
            <FoodProgress />
          </div>
          <div className={styles.topPageChart}>
            <TrendChart />
          </div>
        </div>
        <HomeMealsSection />
      </div>
    </MainLayout>
  );
}
