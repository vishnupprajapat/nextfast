import { eq } from "drizzle-orm";
import { notFound, redirect } from "next/navigation";
import { db } from "@/db";
import { categories, products, subcategories } from "@/db/schema";
import { getAdminUser } from "@/lib/admin-queries";
import { ProductForm } from "../product-form";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const admin = await getAdminUser();

  if (!admin) {
    redirect("/admin/admin-auth");
  }

  const { slug } = await params;
  const [product] = await db
    .select()
    .from(products)
    .where(eq(products.slug, slug));

  if (!product) {
    notFound();
  }

  const categoryList = await db.select().from(categories);
  const subcategoryList = await db.select().from(subcategories);

  return (
    <div>
      <h2 className="mb-6 font-bold text-2xl text-gray-900">Edit Product</h2>
      <div className="rounded-lg bg-white p-6 shadow">
        <ProductForm
          product={product}
          categories={categoryList}
          subcategories={subcategoryList}
        />
      </div>
    </div>
  );
}
