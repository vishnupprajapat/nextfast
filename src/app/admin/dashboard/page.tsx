import { Suspense } from "react";
import {
  ActiveUsers,
  ConversionRate,
  DashboardHeader,
  MetricsGrid,
  MonthlyTarget,
  RecentActivity,
  RecentOrders,
  RevenueChart,
  TopCategories,
  TopProductsTable,
  TrafficSources,
} from "./components";

export default function DashboardPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-[1440px]">
        <DashboardHeader />

        <div className="space-y-6">
          {/* Row 1: Top Metrics - 3 Cards */}
          <Suspense fallback={<MetricsSkeleton />}>
            <MetricsGrid />
          </Suspense>

          {/* Row 2: Revenue Chart & Monthly Target */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Suspense fallback={<ChartSkeleton />}>
                <RevenueChart />
              </Suspense>
            </div>
            <Suspense fallback={<CardSkeleton />}>
              <MonthlyTarget />
            </Suspense>
          </div>

          {/* Row 3: Active Users, Conversion Rate, Traffic Sources */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <Suspense fallback={<CardSkeleton />}>
              <ActiveUsers />
            </Suspense>

            <Suspense fallback={<CardSkeleton />}>
              <ConversionRate />
            </Suspense>

            <Suspense fallback={<CardSkeleton />}>
              <TrafficSources />
            </Suspense>
          </div>

          {/* Row 4: Recent Orders & Recent Activity */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Suspense fallback={<TableSkeleton />}>
              <RecentOrders />
            </Suspense>

            <Suspense fallback={<ActivitySkeleton />}>
              <RecentActivity />
            </Suspense>
          </div>

          {/* Row 5: Top Products & Top Categories */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Suspense fallback={<TableSkeleton />}>
              <TopProductsTable />
            </Suspense>

            <Suspense fallback={<CardSkeleton />}>
              <TopCategories />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}

// Loading Skeletons
function MetricsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="animate-pulse rounded-2xl bg-white p-6">
          <div className="mb-4 h-4 w-24 rounded bg-gray-200" />
          <div className="h-8 w-32 rounded bg-gray-200" />
        </div>
      ))}
    </div>
  );
}

function ChartSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl bg-white p-6">
      <div className="mb-6 h-6 w-32 rounded bg-gray-200" />
      <div className="h-64 rounded bg-gray-100" />
    </div>
  );
}

function TableSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl bg-white p-6">
      <div className="mb-6 h-6 w-32 rounded bg-gray-200" />
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-12 rounded bg-gray-100" />
        ))}
      </div>
    </div>
  );
}

function CardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl bg-white p-6">
      <div className="mb-6 h-6 w-32 rounded bg-gray-200" />
      <div className="space-y-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-8 rounded bg-gray-100" />
        ))}
      </div>
    </div>
  );
}

function ActivitySkeleton() {
  return (
    <div className="animate-pulse rounded-2xl bg-white p-6">
      <div className="mb-6 h-6 w-32 rounded bg-gray-200" />
      <div className="space-y-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex gap-4">
            <div className="h-10 w-10 rounded-full bg-gray-200" />
            <div className="flex-1">
              <div className="mb-2 h-4 w-3/4 rounded bg-gray-200" />
              <div className="h-3 w-1/2 rounded bg-gray-100" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
