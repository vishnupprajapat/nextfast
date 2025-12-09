import { Plus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminUser } from "@/lib/admin-queries";
import { ProductsTable } from "./products-table";

export default async function ProductsPage() {
  const admin = await getAdminUser();

  if (!admin) {
    redirect("/admin/admin-auth");
  }

  return (
    <div className="min-h-screen bg-[#F5F6FA] p-8">
      {/* Page Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-semibold text-[#1E293B] text-[24px] leading-tight">
          Products
        </h1>
        <Link
          href="/admin/products/new"
          className="hover:-translate-y-0.5 flex items-center gap-2 rounded-lg bg-[#FF6B2C] px-5 py-2.5 font-medium text-[14px] text-white transition-all hover:bg-[#FF5A1A] hover:shadow-[0_4px_12px_rgba(255,107,44,0.3)]"
        >
          <Plus className="h-[18px] w-[18px]" />
          Add Product
        </Link>
      </div>

      {/* Main Content Card */}
      <div className="rounded-2xl bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
        <ProductsTable />
      </div>
    </div>
  );
}
