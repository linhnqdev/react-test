"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { FiMenu, FiFileText, FiAward, FiBell } from "react-icons/fi";

import styles from "./Header.module.scss";

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    if (!isMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    globalThis.addEventListener("keydown", onKeyDown);
    return () => globalThis.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen]);

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.content}>
          <Link href="/" className={styles.logo}>
            <Image src="/images/logo.svg" alt="グループ 138" width={120} height={40} />
          </Link>

          <nav className={styles.nav}>
            <Link
              href="/my-record"
              className={`${styles.navItem} ${pathname === "/my-record" ? styles.active : ""}`}
            >
              <FiFileText className={styles.icon} />
              <span className={styles.navText}>自分の記録</span>
            </Link>
            <Link
              href="/challenge"
              className={`${styles.navItem} ${pathname === "/challenge" ? styles.active : ""}`}
            >
              <FiAward className={styles.icon} />
              <span className={styles.navText}>チャレンジ</span>
            </Link>
            <Link
              href="/notifications"
              className={`${styles.navItem} ${pathname === "/notifications" ? styles.active : ""}`}
            >
              <div className={styles.badgeWrapper}>
                <FiBell className={styles.icon} />
                <span className={styles.badge}>1</span>
              </div>
              <span className={styles.navText}>お知らせ</span>
            </Link>
            <button
              className={styles.menuButton}
              aria-label="Menu"
              aria-expanded={isMenuOpen}
              aria-controls={menuId}
              onClick={() => setIsMenuOpen(true)}
            >
              <FiMenu className={styles.icon} />
            </button>
          </nav>
        </div>
      </div>

      {isMenuOpen && (
        <dialog
          id={menuId}
          className={styles.menuDialog}
          aria-label="Menu"
          open
        >
          <button
            type="button"
            className={styles.menuBackdrop}
            aria-label="Close menu"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className={styles.menuPanel}>
            <button
              type="button"
              className={styles.menuClose}
              aria-label="Close menu"
              onClick={() => setIsMenuOpen(false)}
            >
              ×
            </button>

            <nav className={styles.menuList} aria-label="Menu items">
              <Link
                href="/my-record"
                className={styles.menuItem}
                onClick={() => setIsMenuOpen(false)}
              >
                自分の記録
              </Link>
              <Link
                href="/weight-graph"
                className={styles.menuItem}
                onClick={() => setIsMenuOpen(false)}
              >
                体重グラフ
              </Link>
              <Link
                href="/goal"
                className={styles.menuItem}
                onClick={() => setIsMenuOpen(false)}
              >
                目標
              </Link>
              <Link
                href="/course"
                className={styles.menuItem}
                onClick={() => setIsMenuOpen(false)}
              >
                選択中のコース
              </Link>
              <Link
                href="/columns"
                className={styles.menuItem}
                onClick={() => setIsMenuOpen(false)}
              >
                コラム一覧
              </Link>
              <Link
                href="/settings"
                className={styles.menuItem}
                onClick={() => setIsMenuOpen(false)}
              >
                設定
              </Link>
            </nav>
          </div>
        </dialog>
      )}
    </header>
  );
}
