import { redirect } from "next/navigation";
import { ActivityList } from "@/components/ui/activity-list";
import { ChartCard, SimpleLineChart } from "@/components/ui/chart-card";
import { MetricCard } from "@/components/ui/metric-card";
import { getAdminUser } from "@/lib/admin-queries";

export default async function CreatorDashboard() {
  const admin = await getAdminUser();

  if (!admin) {
    redirect("/admin/admin-auth");
  }

  // Sample data for demonstration
  const weeklyData = [
    { label: "Mon", value: 2840 },
    { label: "Tue", value: 3210 },
    { label: "Wed", value: 2950 },
    { label: "Thu", value: 3580 },
    { label: "Fri", value: 4120 },
    { label: "Sat", value: 3890 },
    { label: "Sun", value: 3450 },
  ];

  const monthlyData = [
    { label: "Jan", value: 65000 },
    { label: "Feb", value: 72000 },
    { label: "Mar", value: 68000 },
    { label: "Apr", value: 81000 },
    { label: "May", value: 89000 },
    { label: "Jun", value: 95000 },
  ];

  const recentActivity = [
    {
      id: "1",
      title: "New subscriber milestone reached",
      description: "You've reached 10,000 subscribers!",
      timestamp: "2 hours ago",
      badge: { label: "Milestone", variant: "success" as const },
      icon: (
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      ),
    },
    {
      id: "2",
      title: "Video performance update",
      description: '"Getting Started Guide" hit 50K views',
      timestamp: "5 hours ago",
      badge: { label: "Trending", variant: "warning" as const },
      icon: (
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          />
        </svg>
      ),
    },
    {
      id: "3",
      title: "New comment on your post",
      description: "Sarah M. commented on your latest tutorial",
      timestamp: "1 day ago",
      badge: { label: "Comment", variant: "info" as const },
      icon: (
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      ),
    },
    {
      id: "4",
      title: "Monthly report available",
      description: "View your analytics for November 2025",
      timestamp: "2 days ago",
      badge: { label: "Report", variant: "neutral" as const },
      icon: (
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-bold text-3xl text-gray-900">Creator Analytics</h1>
        <p className="mt-2 text-gray-600 text-sm">
          Track your content performance and audience growth
        </p>
      </div>

      {/* Top Metrics Row */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Views"
          value="1.2M"
          delta={{ value: "+12.5%", positive: true }}
          subtitle="vs last month"
          icon={
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          }
        />

        <MetricCard
          title="Subscribers"
          value="10,482"
          delta={{ value: "+8.2%", positive: true }}
          subtitle="vs last month"
          icon={
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          }
        />

        <MetricCard
          title="Avg. Watch Time"
          value="6m 42s"
          delta={{ value: "+15.3%", positive: true }}
          subtitle="vs last month"
          icon={
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
        />

        <MetricCard
          title="Engagement Rate"
          value="4.8%"
          delta={{ value: "-0.3%", positive: false }}
          subtitle="vs last month"
          icon={
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          }
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ChartCard
          title="Weekly Views"
          subtitle="Last 7 days performance"
          actions={
            <button className="rounded-full border border-gray-200 bg-white px-3 py-1.5 font-medium text-gray-700 text-xs hover:bg-gray-50">
              Last 7 days
            </button>
          }
        >
          <SimpleLineChart data={weeklyData} />
        </ChartCard>

        <ChartCard
          title="Monthly Revenue"
          subtitle="Revenue trend over 6 months"
          actions={
            <button className="rounded-full border border-gray-200 bg-white px-3 py-1.5 font-medium text-gray-700 text-xs hover:bg-gray-50">
              6 months
            </button>
          }
        >
          <SimpleLineChart data={monthlyData} />
        </ChartCard>
      </div>

      {/* Bottom Row: Activity and Additional Metrics */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ActivityList title="Recent Activity" items={recentActivity} />
        </div>

        <div className="space-y-6">
          <MetricCard
            title="Total Revenue"
            value="$89,432"
            delta={{ value: "+22.4%", positive: true }}
            subtitle="vs last month"
          />
          <MetricCard
            title="Content Published"
            value="24"
            subtitle="This month"
          />
        </div>
      </div>
    </div>
  );
}
