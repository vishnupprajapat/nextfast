"use client";

import {
  DollarSign,
  Package,
  ShoppingCart,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import numeral from "numeral";

interface MetricCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
  trend: "up" | "down";
}

function MetricCard({ title, value, change, icon, trend }: MetricCardProps) {
  const isPositive = trend === "up";
  const formattedChange = Math.abs(change).toFixed(1);

  return (
    <div className="group rounded-2xl bg-white p-6 shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFF7ED] text-[#FF8A1F] transition-colors group-hover:bg-[#FFEDD5]">
            {icon}
          </div>
          <h3 className="font-medium text-[#666666] text-sm">{title}</h3>
        </div>
      </div>

      <div className="flex items-end justify-between">
        <div className="font-semibold text-[#1E1E1E] text-[32px] tabular-nums tracking-tight">
          {value}
        </div>

        <div
          className={`flex items-center gap-1 rounded-lg px-2.5 py-1 font-medium text-xs ${
            isPositive
              ? "bg-[#ECFDF5] text-[#065F46]"
              : "bg-[#FEF2F2] text-[#991B1B]"
          }`}
        >
          {isPositive ? (
            <TrendingUp size={14} strokeWidth={2.5} />
          ) : (
            <TrendingDown size={14} strokeWidth={2.5} />
          )}
          <span>{formattedChange}%</span>
        </div>
      </div>
    </div>
  );
}

export function MetricsGrid() {
  const metrics = [
    {
      title: "Total Revenue",
      value: "$983,410",
      change: 12.5,
      trend: "up" as const,
      icon: <DollarSign size={20} strokeWidth={2} />,
    },
    {
      title: "Orders",
      value: numeral(58375).format("0,0"),
      change: 8.2,
      trend: "up" as const,
      icon: <ShoppingCart size={20} strokeWidth={2} />,
    },
    {
      title: "Customers",
      value: numeral(237782).format("0,0"),
      change: 15.3,
      trend: "up" as const,
      icon: <Users size={20} strokeWidth={2} />,
    },
    {
      title: "Products Sold",
      value: numeral(1284).format("0,0"),
      change: 3.1,
      trend: "down" as const,
      icon: <Package size={20} strokeWidth={2} />,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>
  );
}
