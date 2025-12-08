import { desc } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { products } from "@/db/schema";
import { getAdminUser } from "@/lib/admin-queries";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const admin = await getAdminUser();

  if (!admin) {
    redirect("/admin/admin-auth");
  }

  const params = await searchParams;
  const page = Number.parseInt(params.page || "1", 10);
  const limit = 20;
  const offset = (page - 1) * limit;

  const productList = await db
    .select()
    .from(products)
    .orderBy(desc(products.slug))
    .limit(limit)
    .offset(offset);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-bold text-2xl text-gray-900">Products</h2>
        <Link
          href="/admin/products/new"
          className="rounded-md bg-blue-600 px-4 py-2 font-medium text-sm text-white hover:bg-blue-700"
        >
          Add Product
        </Link>
      </div>

      <div className="overflow-hidden bg-white shadow sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {productList.map((product) => (
            <li key={product.slug}>
              <Link
                href={`/admin/products/${product.slug}`}
                className="block hover:bg-gray-50"
              >
                <div className="flex items-center px-4 py-4 sm:px-6">
                  <div className="flex min-w-0 flex-1 items-center">
                    <div className="flex-shrink-0">
                      {product.image_url ? (
                        <Image
                          src={product.image_url}
                          alt={product.name}
                          width={64}
                          height={64}
                          className="h-16 w-16 rounded-md object-cover"
                        />
                      ) : (
                        <div className="flex h-16 w-16 items-center justify-center rounded-md bg-gray-200 text-gray-500 text-xs">
                          No Image
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1 px-4">
                      <div>
                        <p className="truncate font-medium text-blue-600 text-sm">
                          {product.name}
                        </p>
                        <p className="mt-1 line-clamp-2 text-gray-500 text-sm">
                          {product.description}
                        </p>
                      </div>
                      <div className="mt-2 flex">
                        <div className="flex items-center text-gray-500 text-sm">
                          <span className="font-medium text-gray-900">
                            ${product.price}
                          </span>
                          <span className="ml-4 text-xs">
                            {product.subcategory_slug}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <svg
                      className="h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex gap-2">
          {page > 1 && (
            <Link
              href={`/admin/products?page=${page - 1}`}
              className="rounded-md bg-white px-4 py-2 font-medium text-gray-700 text-sm hover:bg-gray-50"
            >
              Previous
            </Link>
          )}
          <Link
            href={`/admin/products?page=${page + 1}`}
            className="rounded-md bg-white px-4 py-2 font-medium text-gray-700 text-sm hover:bg-gray-50"
          >
            Next
          </Link>
        </div>
        <span className="text-gray-700 text-sm">Page {page}</span>
      </div>
    </div>
  );
}
