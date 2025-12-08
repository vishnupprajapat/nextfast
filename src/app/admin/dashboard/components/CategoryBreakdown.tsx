"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Electronics", value: 35, color: "#FF8A1F" },
  { name: "Clothing", value: 28, color: "#3B82F6" },
  { name: "Home & Kitchen", value: 18, color: "#10B981" },
  { name: "Accessories", value: 12, color: "#F59E0B" },
  { name: "Books", value: 7, color: "#8B5CF6" },
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      className="font-semibold text-sm"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export function CategoryBreakdown() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-semibold text-[#1E1E1E] text-xl">
          Sales by Category
        </h2>
        <select className="rounded-xl border border-[#E5DDD1] bg-white px-4 py-2 text-[#1E1E1E] text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#FF8A1F]">
          <option>Last 30 days</option>
          <option>Last 7 days</option>
          <option>Last 90 days</option>
          <option>Last year</option>
        </select>
      </div>

      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #E5DDD1",
                  borderRadius: "12px",
                  padding: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                }}
                formatter={(value: number) => [`${value}%`, "Share"]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-4">
          {data.map((category, index) => (
            <div
              key={index}
              className="group flex items-center justify-between rounded-xl p-4 transition-colors hover:bg-[#FFF9F5]"
            >
              <div className="flex items-center gap-3">
                <div
                  className="h-4 w-4 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                <span className="font-medium text-[#1E1E1E] text-sm transition-colors group-hover:text-[#FF8A1F]">
                  {category.name}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-2 w-32 overflow-hidden rounded-full bg-[#F5E7D8]">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${category.value}%`,
                      backgroundColor: category.color,
                    }}
                  />
                </div>
                <span className="w-12 text-right font-semibold text-[#1E1E1E] text-sm tabular-nums">
                  {category.value}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
