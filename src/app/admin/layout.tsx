import type { Metadata } from "next";
import { getAdminUser } from "@/lib/admin-queries";
import { AdminNav } from "./components/AdminNav";

export const metadata: Metadata = {
  title: {
    template: "%s | Admin Panel",
    default: "Admin Panel",
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getAdminUser();

  // If no admin and not on login page, the middleware will handle redirect
  // This layout just renders appropriately for login vs authenticated pages
  if (!admin) {
    // Render without sidebar for login page
    return <div className="min-h-screen bg-gray-50">{children}</div>;
  }

  // Render with sidebar for authenticated pages
  return (
    <div className="flex min-h-screen bg-[#F5E7D8]">
      {/* Sidebar Navigation */}
      <AdminNav username={admin.username} />

      {/* Main Content */}
      <main className="ml-[280px] w-full">{children}</main>
    </div>
  );
}
