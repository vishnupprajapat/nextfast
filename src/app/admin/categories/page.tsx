import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { getAdminUser } from "@/lib/admin-queries";

export default async function CategoriesPage() {
  const admin = await getAdminUser();

  if (!admin) {
    redirect("/admin/admin-auth");
  }

  const categoryList = await db.query.categories.findMany({
    with: {
      collection: true,
    },
    orderBy: (categories, { asc }) => [asc(categories.name)],
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-bold text-2xl text-gray-900">Categories</h2>
        <Link
          href="/admin/categories/new"
          className="rounded-md bg-blue-600 px-4 py-2 font-medium text-sm text-white hover:bg-blue-700"
        >
          Add Category
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categoryList.map((category) => (
          <Link
            key={category.slug}
            href={`/admin/categories/${category.slug}`}
            className="block overflow-hidden rounded-lg bg-white shadow hover:shadow-md"
          >
            {category.image_url ? (
              <div className="relative h-48 w-full">
                <Image
                  src={category.image_url}
                  alt={category.name}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="flex h-48 items-center justify-center bg-gray-100">
                <span className="text-gray-400">No Image</span>
              </div>
            )}
            <div className="p-4">
              <h3 className="font-semibold text-gray-900">{category.name}</h3>
              <p className="mt-1 text-gray-500 text-sm">
                Collection: {category.collection.name}
              </p>
              <p className="mt-1 text-gray-400 text-xs">
                Slug: {category.slug}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
