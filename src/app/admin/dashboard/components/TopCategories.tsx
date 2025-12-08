"use client";

export function TopCategories() {
  const categories = [
    {
      name: "Electronics",
      sales: "$1,300,000",
      color: "#FF8A1F",
      percentage: 35,
    },
    { name: "Fashion", sales: "$950,000", color: "#3B82F6", percentage: 26 },
    {
      name: "Home & Kitchen",
      sales: "$850,000",
      color: "#10B981",
      percentage: 23,
    },
    { name: "Books", sales: "$600,000", color: "#F59E0B", percentage: 16 },
  ];

  return (
    <div className="rounded-2xl bg-white p-6 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-semibold text-[#1E1E1E] text-xl">Top Categories</h2>
        <button className="font-medium text-[#FF8A1F] text-sm hover:text-[#EA580C]">
          See All
        </button>
      </div>

      <div className="space-y-4">
        {categories.map((category, index) => (
          <div
            key={index}
            className="group rounded-xl p-3 transition-colors hover:bg-[#FFF9F5]"
          >
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                <span className="font-medium text-[#1E1E1E] text-sm transition-colors group-hover:text-[#FF8A1F]">
                  {category.name}
                </span>
              </div>
              <span className="font-semibold text-[#1E1E1E] text-sm tabular-nums">
                {category.sales}
              </span>
            </div>
            <div className="ml-5 flex items-center gap-3">
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#F5E7D8]">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${category.percentage}%`,
                    backgroundColor: category.color,
                  }}
                />
              </div>
              <span className="w-12 text-right font-medium text-[#666666] text-xs tabular-nums">
                {category.percentage}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
