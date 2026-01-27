"use client";

import styles from "./TrendChart.module.scss";

export interface ITrendChartProps {
  data?: Array<{ month: string; value1: number; value2: number }>;
}

export function TrendChart({ data }: ITrendChartProps) {
  // Mock data for the chart
  const chartData = data || [
    { month: "6月", value1: 75, value2: 70 },
    { month: "7月", value1: 72, value2: 68 },
    { month: "8月", value1: 70, value2: 65 },
    { month: "9月", value1: 68, value2: 63 },
    { month: "10月", value1: 65, value2: 60 },
    { month: "11月", value1: 63, value2: 58 },
    { month: "12月", value1: 60, value2: 55 },
    { month: "1月", value1: 58, value2: 53 },
    { month: "2月", value1: 55, value2: 50 },
    { month: "3月", value1: 53, value2: 48 },
    { month: "4月", value1: 50, value2: 45 },
    { month: "5月", value1: 48, value2: 43 },
  ];

  const maxValue = Math.max(...chartData.map((d) => Math.max(d.value1, d.value2)));
  const minValue = Math.min(...chartData.map((d) => Math.min(d.value1, d.value2)));
  const range = maxValue - minValue;

  const getY = (value: number) => {
    return 100 - ((value - minValue) / range) * 80; // 80% of height for chart area
  };

  const getPath = (values: number[]) => {
    if (values.length === 0) return "";
    return values
      .map((value, index) => {
        const x = (index / (values.length - 1)) * 100;
        const y = getY(value);
        return `${index === 0 ? "M" : "L"} ${x} ${y}`;
      })
      .join(" ");
  };

  const line1Values = chartData.map((d) => d.value1);
  const line2Values = chartData.map((d) => d.value2);

  return (
    <div className={styles.container}>
      <div className={styles.chartWrapper}>
        <svg viewBox="0 0 100 100" className={styles.chart} preserveAspectRatio="none">
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="100"
              y2={y}
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="0.5"
            />
          ))}

          {/* Line 1 (Yellow) */}
          <path
            d={getPath(line1Values)}
            fill="none"
            stroke="#ffd700"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data points for Line 1 */}
          {line1Values.map((value, index) => {
            const x = (index / (line1Values.length - 1)) * 100;
            const y = getY(value);
            return (
              <circle
                key={`line1-${index}`}
                cx={x}
                cy={y}
                r="1.5"
                fill="#ffd700"
                stroke="#2e2e2e"
                strokeWidth="0.5"
              />
            );
          })}

          {/* Line 2 (Teal) */}
          <path
            d={getPath(line2Values)}
            fill="none"
            stroke="#20b2aa"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data points for Line 2 */}
          {line2Values.map((value, index) => {
            const x = (index / (line2Values.length - 1)) * 100;
            const y = getY(value);
            return (
              <circle
                key={`line2-${index}`}
                cx={x}
                cy={y}
                r="1.5"
                fill="#20b2aa"
                stroke="#2e2e2e"
                strokeWidth="0.5"
              />
            );
          })}
        </svg>
      </div>
      <div className={styles.xAxis}>
        {chartData.map((item, index) => (
          <span key={index} className={styles.monthLabel}>
            {item.month}
          </span>
        ))}
      </div>
    </div>
  );
}
