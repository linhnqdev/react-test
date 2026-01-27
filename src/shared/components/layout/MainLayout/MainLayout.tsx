import { Header } from "../Header";
import { Footer } from "../Footer";
import styles from "./MainLayout.module.scss";

interface IMainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: IMainLayoutProps) {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
}
