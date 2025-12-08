"use client";

import type { LucideIcon } from "lucide-react";
import {
  cn,
  formatCurrency,
  formatNumber,
  formatPercentage,
} from "@/lib/design-system";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive?: boolean;
  };
  format?: "number" | "currency" | "percentage" | "none";
  className?: string;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  format = "none",
  className,
}: StatCardProps) {
  // Format value based on type
  const formattedValue = (() => {
    if (typeof value === "string") return value;

    switch (format) {
      case "currency":
        return formatCurrency(value);
      case "number":
        return formatNumber(value);
      case "percentage":
        return formatPercentage(value);
      default:
        return value;
    }
  })();

  const showTrend = trend !== undefined;
  const trendIsPositive = trend?.isPositive !== false;
  const trendValue = trend?.value || 0;

  return (
    <div
      className={cn(
        "group rounded-2xl bg-white p-6 shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)]",
        className,
      )}
    >
      <div className="mb-4 flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFF7ED] text-[#FF8A1F] transition-colors group-hover:bg-[#FFEDD5]">
          <Icon size={20} strokeWidth={2} />
        </div>
        {showTrend && (
          <div
            className={cn(
              "flex items-center gap-1 rounded-lg px-2.5 py-1 font-medium text-xs",
              trendIsPositive
                ? "bg-[#ECFDF5] text-[#065F46]"
                : "bg-[#FEF2F2] text-[#991B1B]",
            )}
          >
            <span>{trendIsPositive ? "↑" : "↓"}</span>
            <span>{Math.abs(trendValue).toFixed(1)}%</span>
          </div>
        )}
      </div>

      <h3 className="mb-2 font-medium text-[#666666] text-sm">{title}</h3>
      <div className="font-semibold text-[#1E1E1E] text-[32px] tabular-nums tracking-tight">
        {formattedValue}
      </div>
    </div>
  );
}
