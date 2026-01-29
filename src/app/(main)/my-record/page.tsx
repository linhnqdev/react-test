import type { Metadata } from "next";

import { BodyRecordChart } from "@/features/my-record/components/BodyRecordChart";
import { DiaryGrid } from "@/features/my-record/components/DiaryGrid";
import { ExerciseLog } from "@/features/my-record/components/ExerciseLog";
import { OverviewCards } from "@/features/my-record/components/OverviewCards";
import { getMyRecordMeta } from "@/features/my-record/server";

import styles from "./page.module.scss";

export async function generateMetadata(): Promise<Metadata> {
  const meta = await getMyRecordMeta();

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

export default async function MyRecordPage() {
  const meta = await getMyRecordMeta();

  return (
    <div className="container">
      <h1 className="d-none">
        {meta.heading ?? meta.title}
      </h1>
      <div className={styles.container}>
        <OverviewCards />
        <BodyRecordChart />
        <ExerciseLog />
        <DiaryGrid />
      </div>
    </div>
  );
}
