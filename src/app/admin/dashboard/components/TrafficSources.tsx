"use client";

interface TrafficSource {
  name: string;
  percentage: number;
  color: string;
}

export function TrafficSources() {
  const sources: TrafficSource[] = [
    { name: "Direct Traffic", percentage: 40, color: "#FF8A1F" },
    { name: "Organic Search", percentage: 30, color: "#FB923C" },
    { name: "Social Media", percentage: 15, color: "#FDBA74" },
    { name: "Referral Traffic", percentage: 10, color: "#FED7AA" },
    { name: "Email Campaigns", percentage: 5, color: "#FFEDD5" },
  ];

  const total = sources.reduce((sum, source) => sum + source.percentage, 0);

  return (
    <div className="rounded-2xl bg-white p-6 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-semibold text-[#1E1E1E] text-xl">
          Traffic Sources
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

      {/* Bar Chart Visualization */}
      <div className="mb-6">
        <div className="flex h-48 items-end gap-2">
          {sources.map((source, index) => (
            <div
              key={index}
              className="flex flex-1 flex-col items-center gap-2"
            >
              <div
                className="flex w-full items-end justify-center"
                style={{ height: "100%" }}
              >
                <div
                  className="w-full cursor-pointer rounded-t-lg transition-all duration-500 hover:opacity-80"
                  style={{
                    height: `${source.percentage * 3}%`,
                    backgroundColor: source.color,
                  }}
                  title={`${source.name}: ${source.percentage}%`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-3">
        {sources.map((source, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-lg p-2 transition-colors hover:bg-[#FFF9F5]"
          >
            <div className="flex items-center gap-3">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: source.color }}
              />
              <span className="text-[#666666] text-sm">{source.name}</span>
            </div>
            <span className="font-semibold text-[#1E1E1E] text-sm tabular-nums">
              {source.percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
