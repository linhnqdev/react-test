"use client";

import { useState } from "react";

import styles from "./TrendChart.module.scss";

export interface ITrendChartProps {
  data?: Array<{ month: string; value1: number; value2: number }>;
}

interface IHoverPoint {
  x: number;
  y: number;
  value: number;
}

export function TrendChart({ data }: ITrendChartProps) {
  // Mock data for the chart (shape roughly follows design)
  const chartData = data || [
    { month: "6月", value1: 24, value2: 24 },
    { month: "7月", value1: 24, value2: 25 },
    { month: "8月", value1: 23, value2: 24 },
    { month: "9月", value1: 23, value2: 24 },
    { month: "10月", value1: 22, value2: 23 },
    { month: "11月", value1: 23, value2: 25 },
    { month: "12月", value1: 24, value2: 25 },
    { month: "1月", value1: 25, value2: 26 },
    { month: "2月", value1: 24, value2: 25 },
    { month: "3月", value1: 24, value2: 25 },
    { month: "4月", value1: 23, value2: 24 },
    { month: "5月", value1: 25, value2: 26 },
  ];

  const maxValue = Math.max(...chartData.map((d) => Math.max(d.value1, d.value2)));
  const minValue = Math.min(...chartData.map((d) => Math.min(d.value1, d.value2)));
  const range = maxValue - minValue || 1;

  // add padding so min/max không dính sát mép
  const padding = range * 0.1;
  const effectiveMin = minValue - padding;
  const effectiveMax = maxValue + padding;
  const effectiveRange = effectiveMax - effectiveMin || 1;
  const [hover, setHover] = useState<IHoverPoint | null>(null);

  const getY = (value: number) => 100 - ((value - effectiveMin) / effectiveRange) * 80 - 5; // leave small top/bottom margin

  const getPath = (values: number[]) => {
    if (values.length === 0) return "";
    return values
      .map((value, index) => {
        const x = chartLeft + (index / (values.length - 1)) * (chartRight - chartLeft);
        const y = getY(value);
        return `${index === 0 ? "M" : "L"} ${x} ${y}`;
      })
      .join(" ");
  };

  const line1Values = chartData.map((d) => d.value1);
  const line2Values = chartData.map((d) => d.value2);
  const chartLeft = 4;
  const chartRight = 96;
  const xPositions = chartData.map(
    (_, index) => chartLeft + (index / (chartData.length - 1)) * (chartRight - chartLeft),
  );

  return (
    <div className={styles.container}>
      <svg viewBox="0 0 100 100" className={styles.chart} preserveAspectRatio="none">
        {/* Vertical grid lines */}
        {xPositions.map((x) => (
          <line
            key={x}
            x1={x}
            y1="0"
            x2={x}
            y2="95"
            stroke="rgba(255, 255, 255, 0.18)"
            strokeWidth="0.4"
          />
        ))}

        {/* Line 1 (Yellow) */}
        <path
          d={getPath(line1Values)}
          fill="none"
          stroke="#FFCC21"
          strokeWidth="0.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data points for Line 1 */}
        {line1Values.map((value, index) => {
          const x = xPositions[index];
          const y = getY(value);
          return (
            <circle
              key={`line1-${index}`}
              cx={x}
              cy={y}
              r="1"
              fill="#FFCC21"
              stroke="#2E2E2E"
              strokeWidth="0.5"
              onMouseEnter={() => setHover({ x, y, value })}
              onMouseLeave={() => setHover(null)}
            />
          );
        })}

        {/* Line 2 (Teal) */}
        <path
          d={getPath(line2Values)}
          fill="none"
          stroke="#8FE9D0"
          strokeWidth=".5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data points for Line 2 */}
        {line2Values.map((value, index) => {
          const x = xPositions[index];
          const y = getY(value);
          return (
            <circle
              key={`line2-${index}`}
              cx={x}
              cy={y}
              r="1"
              fill="#8FE9D0"
              stroke="#2E2E2E"
              strokeWidth="0.5"
              onMouseEnter={() => setHover({ x, y, value })}
              onMouseLeave={() => setHover(null)}
            />
          );
        })}

        {/* Month labels inside SVG */}
        {chartData.map((item, index) => {
          const x = xPositions[index];
          return (
            <text
              key={item.month}
              x={x}
              y={98}
              textAnchor="middle"
              className={styles.monthLabel}
            >
              {item.month}
            </text>
          );
        })}

        {hover && (
          <g>
            <rect
              x={hover.x - 6}
              y={hover.y - 9}
              width={12}
              height={5}
              rx={0.8}
              fill="#FF4B3A"
            />
            <text
              x={hover.x}
              y={hover.y - 5.5}
              textAnchor="middle"
              fontSize="2.2"
              fill="#FFFFFF"
            >
              {hover.value}
            </text>
          </g>
        )}
      </svg>
    </div>
  );
}
