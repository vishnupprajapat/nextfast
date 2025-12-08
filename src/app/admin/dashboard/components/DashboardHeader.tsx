"use client";

import { Calendar, Download } from "lucide-react";

export function DashboardHeader() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="mb-8">
      <div className="mb-2 flex items-center justify-between">
        <h1 className="font-semibold text-[#1E1E1E] text-[32px] tracking-tight">
          Dashboard Overview
        </h1>
        <button className="flex items-center gap-2 rounded-xl border border-[#E5DDD1] bg-white px-4 py-2.5 font-medium text-[#1E1E1E] text-sm transition-colors hover:bg-[#FAFAFA]">
          <Download size={18} strokeWidth={2} />
          Export Report
        </button>
      </div>
      <div className="flex items-center gap-2 text-[#666666] text-sm">
        <Calendar size={16} strokeWidth={2} />
        <span>{currentDate}</span>
      </div>
    </div>
  );
}
