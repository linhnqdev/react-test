"use client";

import { useEffect, useState } from "react";

import { Footer } from "../Footer";
import { Header } from "../Header";

import styles from "./MainLayout.module.scss";

interface IMainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: IMainLayoutProps) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const y = globalThis.scrollY ?? 0;
      setShowScrollTop(y > 200);
    };

    handleScroll();
    globalThis.addEventListener("scroll", handleScroll);
    return () => globalThis.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTop = () => {
    globalThis.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>{children}</main>
      {showScrollTop && (
        <button
          type="button"
          className={styles.scrollTopButton}
          aria-label="ページの先頭へ"
          onClick={handleScrollTop}
        >
          <span className={styles.scrollTopArrow} />
        </button>
      )}
      <Footer />
    </div>
  );
}
