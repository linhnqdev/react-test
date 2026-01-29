"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState } from "react";

import styles from "./Header.module.scss";

const RecordIcon: React.FC = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect opacity="0.01" width="32" height="32" fill="#FF963C"/>
    <path d="M29.549 10.6651L28.5568 9.67398C27.9561 9.07205 26.9811 9.07327 26.3792 9.67398L25.4519 10.6025L28.6207 13.7712L29.5489 12.8438C30.1498 12.242 30.1498 11.267 29.5489 10.6651H29.549Z" fill="#FF963C"/>
    <path d="M16.76 19.2868V22.4561H19.9294L27.7571 14.6284L24.5879 11.459L16.76 19.2868Z" fill="#FF963C"/>
    <rect x="9.34717" y="9.93436" width="8.9516" height="1.49193" fill="#FF963C"/>
    <rect x="9.34717" y="15.3984" width="8.9516" height="1.49193" fill="#FF963C"/>
    <rect x="9.36621" y="20.8626" width="5.47042" height="1.49193" fill="#FF963C"/>
    <path d="M22.5858 26.5985C22.5858 26.826 22.4027 27.0117 22.1775 27.0129H5.36658C5.14148 27.0117 4.9596 26.826 4.95838 26.5985V5.40259C4.9596 5.17407 5.14149 4.98828 5.36658 4.98718H22.1775C22.4027 4.98828 22.5858 5.17407 22.5858 5.40259V11.3897L24.5441 9.40253V5.40259C24.543 4.07593 23.4861 3.0011 22.1775 3H5.36658C4.05933 3.0011 3.00147 4.07593 3 5.40259V26.5985C3.00146 27.9252 4.05933 28.9989 5.36658 29H22.1775C23.4861 28.9989 24.543 28.7748 24.5441 27.4482V19.9488L22.5858 21.9359V26.5985Z" fill="#FF963C"/>
  </svg>
);

const ChallengeIcon: React.FC = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect opacity="0.01" width="32" height="32" fill="#FF963C" />
    <g clipPath="url(#clip0_77128_593)">
      <path d="M11.2522 14.468L10.4399 15.0223C10.9592 15.7839 11.6218 16.4266 12.3809 16.9232L12.919 16.0993C12.2666 15.6732 11.6983 15.1201 11.2522 14.468Z" fill="#FF963C"/>
      <path d="M14.7857 5.71515C15.1976 5.62921 15.6061 5.58795 16.0099 5.58795C16.3805 5.58795 16.7465 5.62213 17.1032 5.68915L17.2844 4.7229C16.8678 4.64532 16.4418 4.604 16.0099 4.604C15.5402 4.604 15.0623 4.65228 14.5857 4.75116L14.5669 4.75592L14.7694 5.71747L14.7857 5.71515Z" fill="#FF963C"/>
      <path d="M12.8181 6.46692L12.2625 5.65601C11.5022 6.17615 10.8596 6.83887 10.364 7.59803L11.188 8.13587C11.6128 7.48377 12.166 6.91297 12.8181 6.46692Z" fill="#FF963C"/>
      <path d="M10.2739 11.2433C10.2739 10.8714 10.3091 10.5042 10.3762 10.1452L9.41016 9.96399C9.33106 10.3818 9.29004 10.8091 9.29004 11.2433C9.29004 11.7141 9.33814 12.1908 9.43823 12.6686L9.44067 12.6804L10.4033 12.4791L10.4009 12.4686C10.3149 12.0566 10.2739 11.647 10.2739 11.2433V11.2433Z" fill="#FF963C"/>
      <path d="M17.2146 16.8912C16.8025 16.9772 16.394 17.0183 15.9905 17.0183C15.6162 17.0183 15.2466 16.9831 14.8865 16.9147L14.7041 17.881C15.1231 17.9599 15.554 18.0011 15.9905 18.0011C16.46 18.0011 16.9368 17.9528 17.4146 17.854L17.4204 17.8527L17.2202 16.89L17.2146 16.8912Z" fill="#FF963C"/>
      <path d="M22.5614 9.83667L22.5568 9.81299L21.594 10.0166L21.5986 10.0378C21.6846 10.4486 21.7258 10.8581 21.7258 11.2618C21.7258 11.6385 21.6893 12.0093 21.621 12.3706L22.5874 12.5542C22.6674 12.1328 22.7085 11.7008 22.7085 11.2618C22.7085 10.7922 22.6616 10.3144 22.5614 9.83666V9.83667Z" fill="#FF963C"/>
      <path d="M19.1731 16.0415L19.7274 16.8536C20.4889 16.3346 21.1327 15.672 21.6293 14.9139L20.8066 14.375C20.3794 15.027 19.8263 15.5956 19.1731 16.0415L19.1731 16.0415Z" fill="#FF963C"/>
      <path d="M20.7421 8.02493L21.5531 7.46933C21.0317 6.70902 20.3678 6.06638 19.6086 5.57199L19.072 6.3959C19.7252 6.82083 20.2949 7.37277 20.7421 8.02493Z" fill="#FF963C"/>
      <path d="M19.3721 10.14L17.0415 9.80145L15.9995 7.69L14.9575 9.80145L12.627 10.14L14.3132 11.7838L13.9153 14.1044L15.9995 13.0087L18.0837 14.1044L17.6858 11.7838L19.3721 10.14Z" fill="#FF963C"/>
      <path  fillRule="evenodd" clipRule="evenodd" d="M26.1128 11.5726C26.1128 8.65613 24.979 6.00561 23.1521 4.09534C22.1625 3.06079 20.9657 2.23926 19.6339 1.70374C18.5046 1.2483 17.2798 1 16.001 1C14.7119 1 13.4746 1.25293 12.3387 1.71558C11.0171 2.2522 9.83167 3.06787 8.84888 4.09534C7.02173 6.00562 5.88794 8.65613 5.88794 11.5726C5.88794 14.4879 7.02173 17.1361 8.84888 19.0463C10.676 20.9589 13.2112 22.144 16.001 22.144C18.7895 22.144 21.3248 20.9589 23.1521 19.0463C24.979 17.1361 26.1128 14.4879 26.1128 11.5726ZM16.001 20.1774C13.7246 20.1774 11.6735 19.217 10.1796 17.6575C8.68896 16.0957 7.76928 13.9524 7.76928 11.5726C7.76928 9.19287 8.68896 7.04602 10.1796 5.48767C11.1533 4.47192 12.3623 3.70935 13.719 3.3009C14.4416 3.08557 15.2084 2.96789 16.001 2.96789C16.7811 2.96789 17.5365 3.07958 18.2513 3.29382C19.6193 3.69751 20.8406 4.46496 21.8213 5.48767C23.3119 7.04602 24.2316 9.19287 24.2316 11.5726C24.2316 13.9524 23.3119 16.0957 21.8213 17.6575C20.3273 19.217 18.2773 20.1774 16.001 20.1774H16.001Z" fill="#FF963C" />
      <path d="M8.73693 20.2418C8.5841 20.1181 8.42992 19.9957 8.28161 19.8639L8.28051 19.8675L8.26867 19.858L4.60461 27.7048L4.5 27.9861L4.63892 28.2061C4.73902 28.3592 4.90125 28.4499 5.08265 28.4499H5.16847L8.67006 27.3612L10.0552 30.6755C10.1413 30.8708 10.327 31.0003 10.5426 31.0003C10.7473 31.0003 10.9334 30.8803 11.0192 30.6943L13.8534 24.6259L14.6901 22.8429L14.6867 22.8416L14.6925 22.8275C12.4611 22.5097 10.4225 21.587 8.73695 20.2418L8.73693 20.2418Z" fill="#FF963C"/>
      <path d="M24.5542 21.6375L23.7314 19.8686L23.728 19.8709L23.7222 19.858C22.0745 21.3092 20.0334 22.3249 17.7903 22.7357C17.6323 22.764 17.4761 22.7958 17.3159 22.8169L17.3171 22.8204L17.303 22.824L20.9763 30.6943C21.062 30.8814 21.248 31.0003 21.4529 31.0003C21.6685 31.0003 21.8542 30.8708 21.9402 30.6755L23.3254 27.3612L26.7598 28.4262L26.8408 28.4499H26.9128C27.094 28.4499 27.2563 28.3592 27.3564 28.2062L27.5002 27.9391L24.5542 21.6375Z" fill="#FF963C"/>
    </g>
    <defs>
      <clipPath id="clip0_77128_593">
        <rect width="23.0002" height="30.0003" fill="#FF963C" transform="translate(4.5 1)"/>
      </clipPath>
    </defs>
  </svg>
);

const MesageIcon: React.FC = () => (
  <svg width="25" height="28" viewBox="0 0 25 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M25 22.2975H12.5722L4.57178 28V22.2975H0V0H25V22.2975H25ZM22.7142 2.27186H2.28577V20.0256H6.85755V23.5755L11.8374 20.0256H22.7142V2.27186ZM13.8634 10.391V16.9249H11.2335V10.391H13.8634ZM12.548 8.4314C13.4555 8.4314 14.1913 7.69983 14.1913 6.79798C14.1913 5.896 13.4555 5.16444 12.548 5.16444C11.6405 5.16444 10.9044 5.89601 10.9044 6.79798C10.9044 7.69984 11.6405 8.4314 12.548 8.4314Z"
      fill="#FF963C"
    />
  </svg>
);

const MenuIcon: React.FC = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect opacity="0.01" width="32" height="32" fill="#FF963C"/>
    <path d="M3 8H29" stroke="#FF963C" strokeWidth="3"/>
    <path d="M3 16H29" stroke="#FF963C" strokeWidth="3"/>
    <path d="M3 24H29" stroke="#FF963C" strokeWidth="3"/>
  </svg>
);

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const [menuPos, setMenuPos] = useState<{ top: number; left: number } | null>(null);
  const menuId = useId();

  useEffect(() => {
    if (!isMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    globalThis.addEventListener("keydown", onKeyDown);
    return () => globalThis.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const PANEL_WIDTH = 320;
    const GAP = 8;
    const PADDING = 8;

    let raf = 0;
    const updatePos = () => {
      const el = menuButtonRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const top = rect.bottom + GAP;
      const preferredLeft = rect.right - PANEL_WIDTH;
      const maxLeft = Math.max(PADDING, window.innerWidth - PANEL_WIDTH - PADDING);
      const left = Math.min(Math.max(preferredLeft, PADDING), maxLeft);

      setMenuPos({ top, left });
    };

    const scheduleUpdate = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(updatePos);
    };

    // initial position
    scheduleUpdate();

    window.addEventListener("resize", scheduleUpdate);
    // capture scroll so it updates even when scrolling nested containers
    window.addEventListener("scroll", scheduleUpdate, true);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("scroll", scheduleUpdate, true);
    };
  }, [isMenuOpen]);

  const menuPanelStyle = useMemo(() => {
    if (!menuPos) return undefined;
    return { top: `${menuPos.top}px`, left: `${menuPos.left}px` } as const;
  }, [menuPos]);

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
              <RecordIcon />
              <span className={styles.navText}>自分の記録</span>
            </Link>
            <Link
              href="/challenge"
              className={`${styles.navItem} ${pathname === "/challenge" ? styles.active : ""}`}
            >
              <ChallengeIcon />
              <span className={styles.navText}>チャレンジ</span>
            </Link>
            <Link
              href="/notifications"
              className={`${styles.navItem} ${pathname === "/notifications" ? styles.active : ""}`}
            >
              <div className={styles.badgeWrapper}>
                <MesageIcon />
                <span className={styles.badge}>1</span>
              </div>
              <span className={styles.navText}>お知らせ</span>
            </Link>
            <button
              ref={menuButtonRef}
              className={styles.menuButton}
              aria-label="Menu"
              aria-expanded={isMenuOpen}
              aria-controls={menuId}
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              <MenuIcon />
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
          <div className={styles.menuPanel} style={menuPanelStyle}>
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
                className={`${styles.menuItem} ${pathname === "/my-record" ? styles.menuItemActive : ""}`}
                onClick={() => setIsMenuOpen(false)}
              >
                自分の記録
              </Link>
              <Link
                href="/weight-graph"
                className={`${styles.menuItem} ${pathname === "/weight-graph" ? styles.menuItemActive : ""}`}
                onClick={() => setIsMenuOpen(false)}
              >
                体重グラフ
              </Link>
              <Link
                href="/goal"
                className={`${styles.menuItem} ${pathname === "/goal" ? styles.menuItemActive : ""}`}
                onClick={() => setIsMenuOpen(false)}
              >
                目標
              </Link>
              <Link
                href="/course"
                className={`${styles.menuItem} ${pathname === "/course" ? styles.menuItemActive : ""}`}
                onClick={() => setIsMenuOpen(false)}
              >
                選択中のコース
              </Link>
              <Link
                href="/columns"
                className={`${styles.menuItem} ${pathname === "/columns" ? styles.menuItemActive : ""}`}
                onClick={() => setIsMenuOpen(false)}
              >
                コラム一覧
              </Link>
              <Link
                href="/settings"
                className={`${styles.menuItem} ${pathname === "/settings" ? styles.menuItemActive : ""}`}
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
