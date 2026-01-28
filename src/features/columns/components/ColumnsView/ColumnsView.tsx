"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import type { ColumnCategory } from "@/features/columns/api";
import { useColumns } from "@/features/columns/hooks/useColumns";
import { Loading } from "@/shared/components/ui/Loading";
import { LoadMoreButton } from "@/shared/components/ui/LoadMoreButton";

import styles from "./ColumnsView.module.scss";

const CATEGORY_CARDS: Array<{ key: ColumnCategory; title: string; subtitle: string }> = [
  { key: "recommended", title: "RECOMMENDED\nCOLUMN", subtitle: "オススメ" },
  { key: "diet", title: "RECOMMENDED\nDIET", subtitle: "ダイエット" },
  { key: "beauty", title: "RECOMMENDED\nBEAUTY", subtitle: "美容" },
  { key: "health", title: "RECOMMENDED\nHEALTH", subtitle: "健康" },
];

export function ColumnsView() {
  const [selectedCategory, setSelectedCategory] = useState<ColumnCategory | null>(null);
  const [displayCount, setDisplayCount] = useState(8);
  const { items, isLoading, error, reload } = useColumns();

  const filtered = useMemo(() => {
    const base = selectedCategory ? items.filter((x) => x.category === selectedCategory) : items;
    return base;
  }, [items, selectedCategory]);

  const visibleItems = filtered.slice(0, displayCount);
  const hasMore = filtered.length > displayCount;

  const onSelectCategory = (key: ColumnCategory) => {
    setSelectedCategory((prev) => (prev === key ? null : key));
    setDisplayCount(8);
  };

  return (
    <div className="container">
      <div className={styles.page}>
        {isLoading && <Loading text="Loading..." />}
        {error && (
          <div className="text-center py-4" role="alert">
            <p className="mb-3">{error}</p>
            <LoadMoreButton
              label="Retry"
              onClick={reload}
            />
          </div>
        )}

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
          <div className="text-center">
            <LoadMoreButton
              label="コラムをもっと見る"
              className={styles.loadMoreBtn}
              onClick={() => hasMore && setDisplayCount((p) => p + 8)}
              disabled={!hasMore}
              aria-disabled={!hasMore}
            />
          </div>
        )}
      </div>
    </div>
  );
}

