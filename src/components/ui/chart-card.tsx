import type { ReactNode } from "react";

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  actions?: ReactNode;
}

export function ChartCard({
  title,
  subtitle,
  children,
  actions,
}: ChartCardProps) {
  return (
    <div className="rounded-[18px] border border-gray-200/60 bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h3 className="font-bold text-gray-900 text-lg">{title}</h3>
          {subtitle && <p className="mt-1 text-gray-500 text-sm">{subtitle}</p>}
        </div>
        {actions && <div className="flex gap-2">{actions}</div>}
      </div>

      {/* Chart Content */}
      <div>{children}</div>
    </div>
  );
}

interface SimpleLineChartProps {
  data: { label: string; value: number }[];
}

export function SimpleLineChart({ data }: SimpleLineChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <div className="space-y-4">
      {/* Chart Area */}
      <div className="flex h-48 items-end gap-2">
        {data.map((point, i) => {
          const height = (point.value / maxValue) * 100;
          return (
            <div key={i} className="flex flex-1 flex-col items-center gap-2">
              <div className="relative w-full">
                <div
                  className="w-full rounded-t-lg bg-gradient-to-t from-[#FF8A1F] to-[#FF8A1F]/70 transition-all duration-300 hover:from-[#FF6C02] hover:to-[#FF8A1F]"
                  style={{ height: `${height}%`, minHeight: "8px" }}
                >
                  <div className="-top-6 -translate-x-1/2 absolute left-1/2 font-semibold text-gray-900 text-xs">
                    {point.value.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* X-axis Labels */}
      <div className="flex gap-2">
        {data.map((point, i) => (
          <div key={i} className="flex-1 text-center text-gray-500 text-xs">
            {point.label}
          </div>
        ))}
      </div>
    </div>
  );
}
