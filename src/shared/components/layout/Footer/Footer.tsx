import Link from "next/link";
import styles from "./Footer.module.scss";

export function Footer() {
  const links = [
    { label: "会員登録", href: "#" },
    { label: "運営会社", href: "#" },
    { label: "利用規約", href: "#" },
    { label: "個人情報の取扱について", href: "#" },
    { label: "特定商取引法に基づく表記", href: "#" },
    { label: "お問い合わせ", href: "#" },
  ];

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.content}>
          {links.map((link, index) => (
            <span key={index}>
              <Link href={link.href} className={styles.link}>
                {link.label}
              </Link>
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
