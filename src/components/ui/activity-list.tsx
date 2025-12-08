import type { ReactNode } from "react";

interface ActivityItem {
  id: string;
  title: string;
  description?: string;
  timestamp: string;
  icon?: ReactNode;
  badge?: {
    label: string;
    variant: "success" | "warning" | "info" | "neutral";
  };
}

interface ActivityListProps {
  title: string;
  items: ActivityItem[];
}

const badgeStyles = {
  success: "bg-green-50 text-green-700",
  warning: "bg-orange-50 text-orange-700",
  info: "bg-blue-50 text-blue-700",
  neutral: "bg-gray-100 text-gray-700",
};

export function ActivityList({ title, items }: ActivityListProps) {
  return (
    <div className="rounded-[18px] border border-gray-200/60 bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
      <h3 className="mb-4 font-bold text-gray-900 text-lg">{title}</h3>

      <div className="space-y-0">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`flex items-start gap-3 py-3.5 ${
              index !== items.length - 1 ? "border-gray-100 border-b" : ""
            }`}
          >
            {/* Icon */}
            {item.icon && (
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-orange-50 text-[#FF8A1F]">
                {item.icon}
              </div>
            )}

            {/* Content */}
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-gray-900 text-sm">
                    {item.title}
                  </p>
                  {item.description && (
                    <p className="mt-0.5 text-gray-500 text-xs">
                      {item.description}
                    </p>
                  )}
                </div>
                {item.badge && (
                  <span
                    className={`inline-flex flex-shrink-0 items-center rounded-full px-2.5 py-0.5 font-semibold text-xs ${
                      badgeStyles[item.badge.variant]
                    }`}
                  >
                    {item.badge.label}
                  </span>
                )}
              </div>
              <p className="mt-1 text-gray-400 text-xs">{item.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
