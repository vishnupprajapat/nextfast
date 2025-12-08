"use client";

import { TrendingUp } from "lucide-react";

export function MonthlyTarget() {
  const percentage = 85;
  const achievement = 600000;
  const target = 810000;
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="rounded-2xl bg-white p-6 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
      <h2 className="mb-6 font-semibold text-[#1E1E1E] text-xl">
        Monthly Target
      </h2>

      {/* Circular Progress */}
      <div className="mb-6 flex justify-center">
        <div className="relative h-40 w-40">
          <svg className="-rotate-90 transform" width="160" height="160">
            {/* Background track */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke="#FED7AA"
              strokeWidth="14"
              fill="none"
            />
            {/* Progress */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke="#FF8A1F"
              strokeWidth="14"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
              style={{ animationDelay: "200ms" }}
            />
          </svg>
          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="font-bold text-[#1E1E1E] text-[32px] tabular-nums">
              {percentage}%
            </div>
            <div className="mt-1 text-[#666666] text-xs">
              4.19% from last month
            </div>
          </div>
        </div>
      </div>

      {/* Achievement vs Target */}
      <div className="mb-6 flex justify-between">
        <div>
          <div className="mb-1 text-[#666666] text-xs">Our achievement</div>
          <div className="font-semibold text-[#1E1E1E] text-base tabular-nums">
            ${(achievement / 1000).toFixed(0)}k
          </div>
        </div>
        <div className="text-right">
          <div className="mb-1 text-[#666666] text-xs">Our target</div>
          <div className="font-semibold text-[#1E1E1E] text-base tabular-nums">
            ${(target / 1000).toFixed(0)}k
          </div>
        </div>
      </div>

      {/* Direct Progress Info */}
      <div className="border-[#F0E8DC] border-t pt-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#FFF7ED]">
            <TrendingUp size={20} strokeWidth={2} className="text-[#FF8A1F]" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="mb-1 font-medium text-[#1E1E1E] text-sm">
              Direct Progress
            </div>
            <div className="text-[#666666] text-xs leading-relaxed">
              Our achievement on {percentage}% of $
              {(achievement / 1000).toFixed(0)}k/${(target / 1000).toFixed(0)}k
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
