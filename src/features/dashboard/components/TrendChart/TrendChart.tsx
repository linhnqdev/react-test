"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./TrendChart.module.scss";

export interface ITrendChartProps {
  data?: Array<{ month: string; value1: number; value2: number }>;
  height?: number;
  backgroundColor?: string;
}

interface Size {
  width: number;
  height: number;
}

interface HoverPoint {
  x: number;
  y: number;
  value: number;
}

export function TrendChart({
  data,
  height = 292,
  backgroundColor = "#2e2e2e",
}: ITrendChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<Size>({ width: 0, height });
  const [hover, setHover] = useState<HoverPoint | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver(([entry]) => {
      setSize({
        width: entry.contentRect.width,
        height,
      });
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [height]);

  const chartData = data || [
    { month: "6月", value1: 24, value2: 24 },
    { month: "7月", value1: 25, value2: 26 },
    { month: "8月", value1: 24, value2: 25 },
    { month: "9月", value1: 24, value2: 25 },
    { month: "10月", value1: 23, value2: 24 },
    { month: "11月", value1: 25, value2: 26 },
    { month: "12月", value1: 26, value2: 27 },
    { month: "1月", value1: 27, value2: 28 },
    { month: "2月", value1: 26, value2: 27 },
    { month: "3月", value1: 26, value2: 27 },
    { month: "4月", value1: 25, value2: 26 },
    { month: "5月", value1: 27, value2: 28 },
  ];

  const values = chartData.flatMap(d => [d.value1, d.value2]);
  const max = Math.max(...values);
  const min = Math.min(...values);
  const padding = (max - min) * 0.1;

  const VIEW_WIDTH = size.width;
  const VIEW_HEIGHT = size.height;

  /* ✅ PADDING TRÁI / PHẢI */
  const PADDING_LEFT = 24;
  const PADDING_RIGHT = 24;
  const CHART_WIDTH =
    VIEW_WIDTH - PADDING_LEFT - PADDING_RIGHT;

  const CHART_TOP = 20;
  const CHART_BOTTOM = VIEW_HEIGHT - 28;
  const CHART_HEIGHT = CHART_BOTTOM - CHART_TOP;

  const getX = (index: number) =>
    PADDING_LEFT +
    (index / (chartData.length - 1)) * CHART_WIDTH;

  const getY = (value: number) =>
    CHART_BOTTOM -
    ((value - (min - padding)) / (max - min + padding * 2)) *
      CHART_HEIGHT;

  const buildPath = (key: "value1" | "value2") =>
    chartData
      .map(
        (d, i) =>
          `${i === 0 ? "M" : "L"} ${getX(i)} ${getY(d[key])}`,
      )
      .join(" ");

  return (
    <div
      ref={containerRef}
      className={styles.container}
      style={{ height, backgroundColor }}
    >
      {VIEW_WIDTH > 0 && (
        <svg
          viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
          className={styles.chart}
          preserveAspectRatio="none"
        >
          {/* GRID */}
          {chartData.map((_, i) => {
            const x = getX(i);
            return (
              <line
                key={i}
                x1={x}
                x2={x}
                y1={CHART_TOP}
                y2={CHART_BOTTOM}
                stroke="rgba(255,255,255,0.18)"
                strokeWidth="1"
              />
            );
          })}

          {/* LINE 1 */}
          <path
            d={buildPath("value1")}
            fill="none"
            stroke="#FFCC21"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* CIRCLES LINE 1 */}
          {chartData.map((d, i) => {
            const x = getX(i);
            const y = getY(d.value1);
            return (
              <circle
                key={`c1-${i}`}
                cx={x}
                cy={y}
                r={4}
                fill="#FFCC21"
                onMouseEnter={() =>
                  setHover({ x, y, value: d.value1 })
                }
                onMouseLeave={() => setHover(null)}
              />
            );
          })}

          {/* LINE 2 */}
          <path
            d={buildPath("value2")}
            fill="none"
            stroke="#8FE9D0"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* CIRCLES LINE 2 */}
          {chartData.map((d, i) => {
            const x = getX(i);
            const y = getY(d.value2);
            return (
              <circle
                key={`c2-${i}`}
                cx={x}
                cy={y}
                r={4}
                fill="#8FE9D0"
                onMouseEnter={() =>
                  setHover({ x, y, value: d.value2 })
                }
                onMouseLeave={() => setHover(null)}
              />
            );
          })}

          {/* MONTH LABEL */}
          {chartData.map((d, i) => (
            <text
              key={d.month}
              x={getX(i)}
              y={VIEW_HEIGHT - 6}
              textAnchor="middle"
              className={styles.label}
            >
              {d.month}
            </text>
          ))}

          {/* TOOLTIP */}
          {hover && (
            <g>
              <rect
                x={hover.x - 18}
                y={hover.y - 28}
                width={36}
                height={20}
                rx={6}
                fill="#FF4B3A"
              />
              <text
                x={hover.x}
                y={hover.y - 14}
                textAnchor="middle"
                fontSize="12"
                fill="#fff"
              >
                {hover.value}
              </text>
            </g>
          )}
        </svg>
      )}
    </div>
  );
}
