"use client";

import Image from "next/image";
import Link from "next/link";

import styles from "./OverviewCards.module.scss";

interface ICard {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  href: string;
}

const cards: ICard[] = [
  {
    id: "body-record",
    title: "BODY RECORD",
    subtitle: "自分のカラダの記録",
    imageUrl: "/images/recommend/MyRecommend-1.jpg",
    href: "#body-record",
  },
  {
    id: "exercise",
    title: "MY EXERCISE",
    subtitle: "自分の運動の記録",
    imageUrl: "/images/recommend/MyRecommend-2.jpg",
    href: "#exercise",
  },
  {
    id: "diary",
    title: "MY DIARY",
    subtitle: "自分の日記",
    imageUrl: "/images/recommend/MyRecommend-3.jpg",
    href: "#diary",
  },
];

export function OverviewCards() {
  return (
    <div className={styles.container}>
      {cards.map((card) => (
        <Link key={card.id} href={card.href} className={styles.card}>
          <div className={styles.imageWrapper}>
            <Image src={card.imageUrl} alt={card.title} fill className={styles.image} sizes="33vw" />
            <div className={styles.overlay} />
            <div className={styles.content}>
              <div className={styles.border} />
              <h2 className={styles.title}>{card.title}</h2>
              <p className={styles.subtitle}>{card.subtitle}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
