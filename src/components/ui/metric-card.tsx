import type { ReactNode } from "react";

interface MetricCardProps {
  title: string;
  value: string | number;
  delta?: {
    value: string;
    positive: boolean;
  };
  icon?: ReactNode;
  subtitle?: string;
}

export function MetricCard({
  title,
  value,
  delta,
  icon,
  subtitle,
}: MetricCardProps) {
  return (
    <div className="flex flex-col gap-2 rounded-[18px] border border-gray-200/60 bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.06)] transition-all duration-200 hover:shadow-[0_20px_50px_rgba(15,23,42,0.1)]">
      {/* Title and Icon Row */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-500 text-xs uppercase tracking-wider">
          {title}
        </h3>
        {icon && <div className="text-gray-400">{icon}</div>}
      </div>

      {/* Main Value */}
      <div className="font-bold text-3xl text-gray-900 tracking-tight">
        {value}
      </div>

      {/* Delta or Subtitle */}
      {delta && (
        <div className="flex items-center gap-1.5">
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-semibold text-xs ${
              delta.positive
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-700"
            }`}
          >
            {delta.positive ? "↑" : "↓"} {delta.value}
          </span>
          {subtitle && (
            <span className="text-gray-500 text-xs">{subtitle}</span>
          )}
        </div>
      )}
      {!delta && subtitle && (
        <p className="text-gray-500 text-xs">{subtitle}</p>
      )}
    </div>
  );
}
