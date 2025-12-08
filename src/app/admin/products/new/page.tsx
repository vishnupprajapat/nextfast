import { redirect } from "next/navigation";
import { db } from "@/db";
import { subcategories } from "@/db/schema";
import { getAdminUser } from "@/lib/admin-queries";
import { ProductForm } from "../product-form";

export default async function NewProductPage() {
  const admin = await getAdminUser();

  if (!admin) {
    redirect("/admin/admin-auth");
  }

  const subcategoryList = await db.select().from(subcategories);

  return (
    <div>
      <h2 className="mb-6 font-bold text-2xl text-gray-900">Add New Product</h2>
      <div className="rounded-lg bg-white p-6 shadow">
        <ProductForm subcategories={subcategoryList} />
      </div>
    </div>
  );
}
