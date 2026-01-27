import { OverviewCards } from "@/features/dashboard/components/OverviewCards";
import { BodyRecordChart } from "@/features/dashboard/components/BodyRecordChart";
import { ExerciseLog } from "@/features/dashboard/components/ExerciseLog";
import { DiaryGrid } from "@/features/dashboard/components/DiaryGrid";

import styles from "./page.module.scss";

export default function MyRecordPage() {
  return (
    <div className="container">
      <div className={styles.container}>
        <OverviewCards />
        <BodyRecordChart />
        <ExerciseLog />
        <DiaryGrid />
      </div>
    </div>
  );
}
