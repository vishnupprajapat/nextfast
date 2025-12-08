"use client";

import { useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const allData = {
  "7days": [
    { month: "Mon", revenue: 12000, orders: 140 },
    { month: "Tue", revenue: 15000, orders: 180 },
    { month: "Wed", revenue: 13000, orders: 160 },
    { month: "Thu", revenue: 17000, orders: 200 },
    { month: "Fri", revenue: 19000, orders: 220 },
    { month: "Sat", revenue: 21000, orders: 250 },
    { month: "Sun", revenue: 16000, orders: 190 },
  ],
  "30days": [
    { month: "Jan", revenue: 45000, orders: 420 },
    { month: "Feb", revenue: 52000, orders: 580 },
    { month: "Mar", revenue: 48000, orders: 510 },
    { month: "Apr", revenue: 61000, orders: 680 },
    { month: "May", revenue: 55000, orders: 590 },
    { month: "Jun", revenue: 67000, orders: 750 },
    { month: "Jul", revenue: 72000, orders: 820 },
    { month: "Aug", revenue: 68000, orders: 780 },
    { month: "Sep", revenue: 79000, orders: 890 },
    { month: "Oct", revenue: 85000, orders: 920 },
    { month: "Nov", revenue: 91000, orders: 980 },
    { month: "Dec", revenue: 98000, orders: 1050 },
  ],
};

type TimeRange = "7days" | "30days";

export function RevenueChart() {
  const [timeRange, setTimeRange] = useState<TimeRange>("30days");
  const data = allData[timeRange];

  return (
    <div className="rounded-2xl bg-white p-6 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-semibold text-[#1E1E1E] text-xl">
          Revenue Analytics
        </h2>
        <div className="flex items-center gap-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as TimeRange)}
            className="cursor-pointer rounded-xl border border-[#E5DDD1] bg-white px-4 py-2 text-[#1E1E1E] text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#FF8A1F]"
          >
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
          </select>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[#FF8A1F]" />
            <span className="text-[#666666] text-sm">Revenue</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[#3B82F6]" />
            <span className="text-[#666666] text-sm">Orders</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#F0E8DC"
            vertical={false}
          />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#666666", fontSize: 12 }}
            dy={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#666666", fontSize: 12 }}
            tickFormatter={(value) => `$${value / 1000}k`}
            dx={-10}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #E5DDD1",
              borderRadius: "12px",
              padding: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
            labelStyle={{ color: "#1E1E1E", fontWeight: 600, marginBottom: 8 }}
            formatter={(value: number, name: string) => [
              name === "revenue"
                ? `$${value.toLocaleString()}`
                : value.toLocaleString(),
              name === "revenue" ? "Revenue" : "Orders",
            ]}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#FF8A1F"
            strokeWidth={3}
            dot={{ fill: "#FF8A1F", r: 4 }}
            activeDot={{ r: 6, fill: "#FF8A1F" }}
          />
          <Line
            type="monotone"
            dataKey="orders"
            stroke="#3B82F6"
            strokeWidth={3}
            dot={{ fill: "#3B82F6", r: 4 }}
            activeDot={{ r: 6, fill: "#3B82F6" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
