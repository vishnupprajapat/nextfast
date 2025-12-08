/**
 * Design System Utilities
 * Based on design.json specifications
 */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes with proper precedence
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Design System Colors from design.json
 */
export const colors = {
  // Background
  canvas: "#F5E7D8",
  canvasSubtle: "#EDE3D5",
  surface: "#FFFFFF",
  surfaceHover: "#FAFAFA",
  surfaceSubtle: "#FFF9F5",

  // Primary
  primary: "#FF8A1F",
  primaryHover: "#EA580C",
  primaryLight: "#FFF7ED",
  primaryLighter: "#FFEDD5",

  // Text
  textPrimary: "#1E1E1E",
  textSecondary: "#666666",
  textTertiary: "#999999",

  // Borders
  borderSubtle: "#F0E8DC",
  borderDefault: "#E5DDD1",
  borderMedium: "#D4CAB8",
  borderStrong: "#9E9383",

  // Semantic
  success: {
    bg: "#ECFDF5",
    bgHover: "#D1FAE5",
    border: "#A7F3D0",
    text: "#065F46",
    icon: "#10B981",
  },
  warning: {
    bg: "#FFF7ED",
    bgHover: "#FFEDD5",
    border: "#FED7AA",
    text: "#92400E",
    icon: "#F59E0B",
  },
  error: {
    bg: "#FEF2F2",
    bgHover: "#FEE2E2",
    border: "#FECACA",
    text: "#991B1B",
    icon: "#EF4444",
  },
  info: {
    bg: "#EFF6FF",
    bgHover: "#DBEAFE",
    border: "#BFDBFE",
    text: "#1E40AF",
    icon: "#3B82F6",
  },
} as const;

/**
 * Design System Spacing (4px base unit)
 */
export const spacing = {
  0: "0px",
  1: "4px",
  2: "8px",
  3: "12px",
  4: "16px",
  5: "20px",
  6: "24px",
  8: "32px",
  10: "40px",
  12: "48px",
  16: "64px",
  20: "80px",
  24: "96px",
} as const;

/**
 * Design System Border Radius
 */
export const radius = {
  none: "0px",
  xs: "4px",
  sm: "6px",
  md: "8px",
  lg: "12px",
  xl: "16px",
  "2xl": "20px",
  "3xl": "24px",
  full: "9999px",
} as const;

/**
 * Design System Shadows
 */
export const shadows = {
  none: "none",
  subtle: "0 1px 2px rgba(0, 0, 0, 0.04)",
  card: "0 4px 12px rgba(0, 0, 0, 0.08)",
  cardHover: "0 8px 24px rgba(0, 0, 0, 0.12)",
  modal: "0 20px 60px rgba(0, 0, 0, 0.15)",
} as const;

/**
 * Card styles based on design system
 */
export const cardStyles = {
  base: "bg-white rounded-2xl p-6 shadow-[0_4px_12px_rgba(0,0,0,0.08)]",
  hoverable:
    "bg-white rounded-2xl p-6 shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all duration-300",
  elevated: "bg-white rounded-2xl p-6 shadow-[0_8px_24px_rgba(0,0,0,0.12)]",
} as const;

/**
 * Button styles based on design system
 */
export const buttonStyles = {
  primary:
    "px-4 py-2.5 bg-[#FF8A1F] text-white rounded-xl font-medium hover:bg-[#EA580C] transition-colors text-sm",
  secondary:
    "px-4 py-2.5 bg-white text-[#1E1E1E] rounded-xl border border-[#E5DDD1] font-medium hover:bg-[#FAFAFA] transition-colors text-sm",
  ghost:
    "px-4 py-2.5 text-[#666666] rounded-xl font-medium hover:bg-[#FFF9F5] hover:text-[#1E1E1E] transition-colors text-sm",
  danger:
    "px-4 py-2.5 bg-[#EF4444] text-white rounded-xl font-medium hover:bg-[#DC2626] transition-colors text-sm",
} as const;

/**
 * Icon sizes based on design system
 */
export const iconSizes = {
  xs: 14,
  sm: 16,
  md: 18,
  lg: 20,
  xl: 24,
  "2xl": 32,
} as const;

/**
 * Typography scale
 */
export const fontSize = {
  xs: "11px",
  sm: "12px",
  base: "14px",
  md: "16px",
  lg: "18px",
  xl: "20px",
  "2xl": "24px",
  "3xl": "28px",
  "4xl": "32px",
  "5xl": "36px",
} as const;

/**
 * Format currency according to design system
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Format number with commas
 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

/**
 * Format percentage
 */
export function formatPercentage(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Format date according to design system
 */
export function formatDate(
  date: Date,
  format: "short" | "medium" | "long" = "medium",
): string {
  const optionsMap: Record<string, Intl.DateTimeFormatOptions> = {
    short: { month: "short", day: "numeric" },
    medium: { month: "short", day: "numeric", year: "numeric" },
    long: { weekday: "long", year: "numeric", month: "long", day: "numeric" },
  };

  const options = optionsMap[format];
  return new Intl.DateTimeFormat("en-US", options).format(date);
}

/**
 * Get trend color based on value and direction
 */
export function getTrendColor(
  value: number,
  isPositive: boolean = true,
): string {
  const isGood = isPositive ? value > 0 : value < 0;
  return isGood ? colors.success.text : colors.error.text;
}

/**
 * Get trend background color
 */
export function getTrendBgColor(
  value: number,
  isPositive: boolean = true,
): string {
  const isGood = isPositive ? value > 0 : value < 0;
  return isGood ? colors.success.bg : colors.error.bg;
}

/**
 * Animation durations from design system
 */
export const duration = {
  fast: 150,
  normal: 200,
  slow: 300,
  slower: 400,
  slowest: 600,
} as const;

/**
 * Transition timing functions
 */
export const transitions = {
  default: "cubic-bezier(0.4, 0, 0.2, 1)",
  smooth: "cubic-bezier(0.4, 0, 0.6, 1)",
  bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
} as const;
