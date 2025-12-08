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

  // If no admin, render without layout (for login page)
  if (!admin) {
    return <div className="min-h-screen bg-gray-50">{children}</div>;
  }

  return (
    <div className="flex min-h-screen bg-[#F5E7D8]">
      {/* Sidebar Navigation */}
      <AdminNav username={admin.username} />

      {/* Main Content */}
      <main className="ml-[280px] w-full">{children}</main>
    </div>
  );
}
