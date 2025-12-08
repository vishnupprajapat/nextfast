"use client";

interface StatRowProps {
  platform: string;
  percentage: number;
  color: string;
}

function StatRow({ platform, percentage, color }: StatRowProps) {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex flex-1 items-center gap-3">
        <div className="text-[#666666] text-sm">{platform}</div>
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#F5E7D8]">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${percentage}%`,
              backgroundColor: color,
            }}
          />
        </div>
      </div>
      <div className="ml-4 w-12 text-right font-semibold text-[#1E1E1E] text-sm tabular-nums">
        {percentage}%
      </div>
    </div>
  );
}

export function ActiveUsers() {
  const stats = [
    { platform: "United States", percentage: 38, color: "#FF8A1F" },
    { platform: "United Kingdom", percentage: 25, color: "#FB923C" },
    { platform: "Canada", percentage: 22, color: "#FDBA74" },
    { platform: "Indonesia", percentage: 15, color: "#FED7AA" },
  ];

  return (
    <div className="rounded-2xl bg-white p-6 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-semibold text-[#1E1E1E] text-xl">Active Users</h2>
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

      <div className="mb-6">
        <div className="font-semibold text-[#1E1E1E] text-[32px] tabular-nums">
          2,758
        </div>
        <div className="mt-2 flex items-center gap-1">
          <span className="font-medium text-[#065F46] text-xs">+8.09%</span>
          <span className="text-[#666666] text-xs">from last month</span>
        </div>
      </div>

      <div className="space-y-1">
        {stats.map((stat, index) => (
          <StatRow key={index} {...stat} />
        ))}
      </div>
    </div>
  );
}
