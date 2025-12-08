"use client";

interface ConversionMetric {
  stage: string;
  visitors: number;
  percentage: number;
}

export function ConversionRate() {
  const metrics: ConversionMetric[] = [
    { stage: "Website Visits", visitors: 25000, percentage: 100 },
    { stage: "Product Views", visitors: 12000, percentage: 48 },
    { stage: "Add to Cart", visitors: 8500, percentage: 34 },
    { stage: "Checkout", visitors: 6200, percentage: 25 },
    { stage: "Purchase", visitors: 5000, percentage: 20 },
  ];

  return (
    <div className="rounded-2xl bg-white p-6 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-semibold text-[#1E1E1E] text-xl">
          Conversion Rate
        </h2>
        <button className="text-[#666666] hover:text-[#1E1E1E]">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="10" cy="10" r="1" />
            <circle cx="10" cy="5" r="1" />
            <circle cx="10" cy="15" r="1" />
          </svg>
        </button>
      </div>

      <div className="space-y-4">
        {metrics.map((metric, index) => {
          const isLast = index === metrics.length - 1;
          return (
            <div key={index}>
              <div className="mb-2 flex items-center justify-between">
                <span className="font-medium text-[#1E1E1E] text-sm">
                  {metric.stage}
                </span>
                <span className="font-semibold text-[#1E1E1E] text-sm tabular-nums">
                  {metric.visitors.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#F5E7D8]">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${metric.percentage}%`,
                      backgroundColor: isLast ? "#10B981" : "#FF8A1F",
                    }}
                  />
                </div>
                <span className="w-12 text-right font-medium text-[#666666] text-xs tabular-nums">
                  {metric.percentage}%
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 border-[#F0E8DC] border-t pt-6">
        <div className="flex items-center justify-between">
          <span className="text-[#666666] text-sm">Overall Conversion</span>
          <span className="font-semibold text-[#10B981] text-lg tabular-nums">
            20.0%
          </span>
        </div>
      </div>
    </div>
  );
}
