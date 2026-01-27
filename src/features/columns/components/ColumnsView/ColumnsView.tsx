"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import styles from "./ColumnsView.module.scss";

type ColumnCategory = "recommended" | "diet" | "beauty" | "health";

interface IColumnItem {
  id: string;
  category: ColumnCategory;
  imageUrl: string;
  date: string; // e.g. 2021.05.17
  time: string; // e.g. 23:25
  title: string;
  tags: string[];
}

const CATEGORY_CARDS: Array<{ key: ColumnCategory; title: string; subtitle: string }> = [
  { key: "recommended", title: "RECOMMENDED\nCOLUMN", subtitle: "オススメ" },
  { key: "diet", title: "RECOMMENDED\nDIET", subtitle: "ダイエット" },
  { key: "beauty", title: "RECOMMENDED\nBEAUTY", subtitle: "美容" },
  { key: "health", title: "RECOMMENDED\nHEALTH", subtitle: "健康" },
];

const ALL_ITEMS: IColumnItem[] = [
  {
    id: "1",
    category: "recommended",
    imageUrl: "/images/columns/column-1.jpg",
    date: "2021.05.17",
    time: "23:25",
    title: "魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリット",
    tags: ["#魚料理", "#和食", "#DHA"],
  },
  {
    id: "2",
    category: "diet",
    imageUrl: "/images/columns/column-2.jpg",
    date: "2021.05.17",
    time: "23:25",
    title: "魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリット",
    tags: ["#魚料理", "#和食", "#DHA"],
  },
  {
    id: "3",
    category: "beauty",
    imageUrl: "/images/columns/column-3.jpg",
    date: "2021.05.17",
    time: "23:25",
    title: "魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリット",
    tags: ["#魚料理", "#和食", "#DHA"],
  },
  {
    id: "4",
    category: "health",
    imageUrl: "/images/columns/column-4.jpg",
    date: "2021.05.17",
    time: "23:25",
    title: "魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリット",
    tags: ["#魚料理", "#和食", "#DHA"],
  },
  {
    id: "5",
    category: "recommended",
    imageUrl: "/images/columns/column-5.jpg",
    date: "2021.05.17",
    time: "23:25",
    title: "魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリット",
    tags: ["#魚料理", "#和食", "#DHA"],
  },
  {
    id: "6",
    category: "diet",
    imageUrl: "/images/columns/column-6.jpg",
    date: "2021.05.17",
    time: "23:25",
    title: "魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリット",
    tags: ["#魚料理", "#和食", "#DHA"],
  },
  {
    id: "7",
    category: "beauty",
    imageUrl: "/images/columns/column-7.jpg",
    date: "2021.05.17",
    time: "23:25",
    title: "魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリット",
    tags: ["#魚料理", "#和食", "#DHA"],
  },
  {
    id: "8",
    category: "health",
    imageUrl: "/images/columns/column-8.jpg",
    date: "2021.05.17",
    time: "23:25",
    title: "魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリット",
    tags: ["#魚料理", "#和食", "#DHA"],
  },
  {
    id: "9",
    category: "recommended",
    imageUrl: "/images/columns/column-2.jpg",
    date: "2021.05.16",
    time: "21:10",
    title: "魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリット",
    tags: ["#魚料理", "#和食", "#DHA"],
  },
  {
    id: "10",
    category: "diet",
    imageUrl: "/images/columns/column-3.jpg",
    date: "2021.05.16",
    time: "21:10",
    title: "魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリット",
    tags: ["#魚料理", "#和食", "#DHA"],
  },
  {
    id: "11",
    category: "beauty",
    imageUrl: "/images/columns/column-4.jpg",
    date: "2021.05.16",
    time: "21:10",
    title: "魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリット",
    tags: ["#魚料理", "#和食", "#DHA"],
  },
  {
    id: "12",
    category: "health",
    imageUrl: "/images/columns/column-5.jpg",
    date: "2021.05.16",
    time: "21:10",
    title: "魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリット",
    tags: ["#魚料理", "#和食", "#DHA"],
  },
  {
    id: "13",
    category: "recommended",
    imageUrl: "/images/columns/column-6.jpg",
    date: "2021.05.15",
    time: "18:40",
    title: "魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリット",
    tags: ["#魚料理", "#和食", "#DHA"],
  },
  {
    id: "14",
    category: "diet",
    imageUrl: "/images/columns/column-7.jpg",
    date: "2021.05.15",
    time: "18:40",
    title: "魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリット",
    tags: ["#魚料理", "#和食", "#DHA"],
  },
  {
    id: "15",
    category: "beauty",
    imageUrl: "/images/columns/column-8.jpg",
    date: "2021.05.15",
    time: "18:40",
    title: "魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリット",
    tags: ["#魚料理", "#和食", "#DHA"],
  },
  {
    id: "16",
    category: "health",
    imageUrl: "/images/columns/column-1.jpg",
    date: "2021.05.15",
    time: "18:40",
    title: "魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリット",
    tags: ["#魚料理", "#和食", "#DHA"],
  },
];

export function ColumnsView() {
  const [selectedCategory, setSelectedCategory] = useState<ColumnCategory | null>(null);
  const [displayCount, setDisplayCount] = useState(8);

  const filtered = useMemo(() => {
    const base = selectedCategory ? ALL_ITEMS.filter((x) => x.category === selectedCategory) : ALL_ITEMS;
    return base;
  }, [selectedCategory]);

  const visibleItems = filtered.slice(0, displayCount);
  const hasMore = filtered.length > displayCount;

  const onSelectCategory = (key: ColumnCategory) => {
    setSelectedCategory((prev) => (prev === key ? null : key));
    setDisplayCount(8);
  };

  return (
    <div className="container">
      <div className={styles.page}>
        <div className={styles.categories}>
          {CATEGORY_CARDS.map((card) => (
            <button
              key={card.key}
              type="button"
              className={`${styles.categoryCard} ${selectedCategory === card.key ? styles.active : ""}`}
              onClick={() => onSelectCategory(card.key)}
              aria-pressed={selectedCategory === card.key}
            >
              <div className={styles.categoryTitle}>
                {card.title.split("\n").map((line) => (
                  <span key={`${card.key}-${line}`} className={styles.titleLine}>
                    {line}
                  </span>
                ))}
              </div>
              <div className={styles.divider} />
              <div className={styles.categorySubtitle}>{card.subtitle}</div>
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          {visibleItems.map((item) => (
            <article key={item.id} className={styles.card}>
              <div className={styles.imageWrap}>
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className={styles.image}
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
                <div className={styles.dateLabel}>
                  {item.date} <span className={styles.time}>{item.time}</span>
                </div>
              </div>
              <div className={styles.body}>
                <div className={styles.title} title={item.title}>
                  {item.title}
                </div>
                <div className={styles.tags}>
                  {item.tags.map((t) => (
                    <span key={t} className={styles.tag}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {hasMore && (
          <div className={styles.loadMoreWrap}>
            <button
              type="button"
              className={styles.loadMoreBtn}
              onClick={() => hasMore && setDisplayCount((p) => p + 8)}
              disabled={!hasMore}
              aria-disabled={!hasMore}
            >
              コラムをもっと見る
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

