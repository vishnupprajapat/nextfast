"use client";

import {
  AlertCircle,
  CheckCircle,
  DollarSign,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react";

interface Activity {
  id: number;
  type: "order" | "product" | "payment" | "user" | "alert" | "success";
  title: string;
  description: string;
  time: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
}

const activities: Activity[] = [
  {
    id: 1,
    type: "order",
    title: "New order received",
    description: "Order #8472 from Sarah Johnson",
    time: "2 minutes ago",
    icon: <ShoppingCart size={18} strokeWidth={2} />,
    iconBg: "#FFF7ED",
    iconColor: "#FF8A1F",
  },
  {
    id: 2,
    type: "product",
    title: "Low stock alert",
    description: "Wireless Headphones - Only 5 left",
    time: "15 minutes ago",
    icon: <AlertCircle size={18} strokeWidth={2} />,
    iconBg: "#FFF7ED",
    iconColor: "#F59E0B",
  },
  {
    id: 3,
    type: "payment",
    title: "Payment received",
    description: "$1,247.00 from Order #8461",
    time: "32 minutes ago",
    icon: <DollarSign size={18} strokeWidth={2} />,
    iconBg: "#ECFDF5",
    iconColor: "#10B981",
  },
  {
    id: 4,
    type: "user",
    title: "New customer registered",
    description: "Michael Chen joined the platform",
    time: "1 hour ago",
    icon: <Users size={18} strokeWidth={2} />,
    iconBg: "#EFF6FF",
    iconColor: "#3B82F6",
  },
  {
    id: 5,
    type: "product",
    title: "Product updated",
    description: "Smart Watch - Price changed to $199",
    time: "2 hours ago",
    icon: <Package size={18} strokeWidth={2} />,
    iconBg: "#F5F3FF",
    iconColor: "#8B5CF6",
  },
  {
    id: 6,
    type: "success",
    title: "Inventory restocked",
    description: "Organic T-Shirts - 250 units added",
    time: "3 hours ago",
    icon: <CheckCircle size={18} strokeWidth={2} />,
    iconBg: "#ECFDF5",
    iconColor: "#10B981",
  },
];

export function RecentActivity() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
      <h2 className="mb-6 font-semibold text-[#1E1E1E] text-xl">
        Recent Activity
      </h2>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="group flex cursor-pointer items-start gap-4 rounded-xl p-3 transition-colors hover:bg-[#FFF9F5]"
          >
            <div
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
              style={{
                backgroundColor: activity.iconBg,
                color: activity.iconColor,
              }}
            >
              {activity.icon}
            </div>

            <div className="min-w-0 flex-1">
              <div className="mb-1 flex items-start justify-between gap-2">
                <h3 className="font-medium text-[#1E1E1E] text-sm transition-colors group-hover:text-[#FF8A1F]">
                  {activity.title}
                </h3>
                <span className="whitespace-nowrap text-[#666666] text-xs">
                  {activity.time}
                </span>
              </div>
              <p className="text-[#666666] text-sm">{activity.description}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-4 w-full rounded-xl py-2.5 font-medium text-[#FF8A1F] text-sm transition-colors hover:bg-[#FFF7ED]">
        View All Activity
      </button>
    </div>
  );
}
