import { format, formatDistanceToNow, parseISO } from "date-fns";

/**
 * Formatting utility functions
 */

/**
 * Format date to readable string
 */
export function formatDate(date: Date | string | number, formatStr: string = "dd/MM/yyyy"): string {
  try {
    const dateObj = typeof date === "string" ? parseISO(date) : new Date(date);
    return format(dateObj, formatStr);
  } catch {
    return String(date);
  }
}

/**
 * Format date to relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(date: Date | string | number): string {
  try {
    const dateObj = typeof date === "string" ? parseISO(date) : new Date(date);
    return formatDistanceToNow(dateObj, { addSuffix: true });
  } catch {
    return String(date);
  }
}

/**
 * Format currency (Vietnamese Dong)
 */
export function formatCurrency(amount: number, currency: string = "VND"): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: currency,
  }).format(amount);
}

/**
 * Format number with thousand separators
 */
export function formatNumber(num: number, decimals: number = 0): string {
  return new Intl.NumberFormat("vi-VN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
}

/**
 * Format percentage
 */
export function formatPercentage(value: number, decimals: number = 2): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Format file name (remove special characters, limit length)
 */
export function formatFileName(fileName: string, maxLength: number = 50): string {
  // Remove special characters except dots, hyphens, underscores
  let formatted = fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
  // Limit length
  if (formatted.length > maxLength) {
    const ext = formatted.substring(formatted.lastIndexOf("."));
    const name = formatted.substring(0, maxLength - ext.length);
    formatted = name + ext;
  }
  return formatted;
}

/**
 * Format initials from name
 */
export function formatInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}
