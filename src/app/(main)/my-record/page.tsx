import { OverviewCards } from "@/features/my-record/components/OverviewCards";
import { BodyRecordChart } from "@/features/my-record/components/BodyRecordChart";
import { ExerciseLog } from "@/features/my-record/components/ExerciseLog";
import { DiaryGrid } from "@/features/my-record/components/DiaryGrid";

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
