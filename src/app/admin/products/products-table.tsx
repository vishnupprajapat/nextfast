"use client";

import {
  Download,
  Edit,
  Filter,
  MoreVertical,
  Search,
  Star,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import type { Product } from "@/db/schema";

type EnrichedProduct = Product & {
  productId: string;
};

export function ProductsTable() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [products, setProducts] = useState<EnrichedProduct[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [openActionMenu, setOpenActionMenu] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  // Initialize from URL params - no local state
  const urlSearch = searchParams.get("search") || "";
  const urlStatus = searchParams.get("status") || "all";
  const urlPage = searchParams.get("page") || "1";

  // Local state only for input values (controlled inputs)
  const [searchInput, setSearchInput] = useState(urlSearch);
  const [statusInput, setStatusInput] = useState(urlStatus);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (_e: MouseEvent) => {
      if (openActionMenu) {
        setOpenActionMenu(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [openActionMenu]);

  // Load products whenever URL params change
  useEffect(() => {
    const loadProducts = async () => {
      setIsSearching(true);
      const params = new URLSearchParams();

      if (urlSearch) params.set("search", urlSearch);
      if (urlStatus !== "all") params.set("status", urlStatus);
      params.set("page", urlPage);

      try {
        const response = await fetch(
          `/api/admin/products/search?${params.toString()}`,
        );
        const data = await response.json();
        setProducts(data.products);
        setCurrentPage(data.page);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setIsSearching(false);
      }
    };

    loadProducts();
  }, [urlSearch, urlStatus, urlPage]); // Only depend on URL params

  // Debounced search - updates URL which triggers the load effect above
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== urlSearch || statusInput !== urlStatus) {
        const params = new URLSearchParams();
        if (searchInput) params.set("search", searchInput);
        if (statusInput !== "all") params.set("status", statusInput);
        params.set("page", "1");

        startTransition(() => {
          router.push(`/admin/products?${params.toString()}`);
        });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput, statusInput, urlSearch, urlStatus, router]);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams();
    if (urlSearch) params.set("search", urlSearch);
    if (urlStatus !== "all") params.set("status", urlStatus);
    params.set("page", String(newPage));

    startTransition(() => {
      router.push(`/admin/products?${params.toString()}`);
    });
  };

  const handleDelete = (slug: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      console.log("Delete product:", slug);
      setOpenActionMenu(null);
    }
  };

  const handleClearFilters = () => {
    setSearchInput("");
    setStatusInput("all");

    startTransition(() => {
      router.push("/admin/products?page=1");
    });
  };

  return (
    <>
      {/* Filter Toolbar */}
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <div className="relative">
          <Search className="-translate-y-1/2 absolute top-1/2 left-3 h-[18px] w-[18px] text-[#94A3B8]" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            disabled={isSearching}
            className="h-10 w-[280px] rounded-lg border border-[#E2E8F0] bg-white py-0 pr-4 pl-10 text-[#1E293B] text-[14px] placeholder:text-[#94A3B8] focus:border-[#FF6B2C] focus:outline-none focus:ring-[#FF6B2C]/10 focus:ring-[3px] disabled:opacity-50"
          />
          {isSearching && (
            <div className="-translate-y-1/2 absolute top-1/2 right-3">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#FF6B2C] border-t-transparent" />
            </div>
          )}
        </div>

        <select
          value={statusInput}
          onChange={(e) => setStatusInput(e.target.value)}
          disabled={isSearching}
          className="flex h-10 min-w-[140px] rounded-lg border border-[#E2E8F0] bg-white px-4 text-[#1E293B] text-[14px] disabled:opacity-50"
        >
          <option value="all">All Status</option>
          <option value="in">In Stock</option>
          <option value="low">Low Stock</option>
          <option value="out">Out of Stock</option>
        </select>

        {(searchInput || statusInput !== "all") && (
          <button
            onClick={handleClearFilters}
            disabled={isSearching}
            className="flex h-10 items-center gap-2 rounded-lg border border-[#E2E8F0] bg-white px-4 text-[#64748B] text-[14px] hover:bg-[#F9FAFB] disabled:opacity-50"
            type="button"
          >
            Clear Filters
          </button>
        )}

        <div className="ml-auto flex gap-3">
          <button
            type="button"
            onClick={() => alert("Advanced filters coming soon!")}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#E2E8F0] bg-white text-[#64748B] hover:bg-[#F9FAFB]"
          >
            <Filter className="h-[18px] w-[18px]" />
          </button>
          <button
            type="button"
            onClick={() => {
              const csv = [
                [
                  "Product",
                  "ID",
                  "Price",
                  "Rating",
                  "Sales",
                  "Stock",
                  "Status",
                ].join(","),
                ...products.map((p) =>
                  [
                    p.name,
                    p.productId,
                    p.price,
                    p.rating || "0",
                    p.sales || "0",
                    p.stock || "0",
                    p.status,
                  ].join(","),
                ),
              ].join("\n");
              const blob = new Blob([csv], { type: "text/csv" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = `products-${new Date().toISOString().split("T")[0]}.csv`;
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#E2E8F0] bg-white text-[#64748B] hover:bg-[#F9FAFB]"
          >
            <Download className="h-[18px] w-[18px]" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-[#E2E8F0]">
        <table className="w-full">
          <thead className="border-[#E2E8F0] border-b bg-[#F9FAFB]">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-[#64748B] text-[13px]">
                Product
              </th>
              <th className="px-4 py-3 text-left font-semibold text-[#64748B] text-[13px]">
                ID
              </th>
              <th className="px-4 py-3 text-left font-semibold text-[#64748B] text-[13px]">
                Price
              </th>
              <th className="px-4 py-3 text-left font-semibold text-[#64748B] text-[13px]">
                Rating
              </th>
              <th className="px-4 py-3 text-left font-semibold text-[#64748B] text-[13px]">
                Sales
              </th>
              <th className="px-4 py-3 text-left font-semibold text-[#64748B] text-[13px]">
                Stock
              </th>
              <th className="px-4 py-3 text-left font-semibold text-[#64748B] text-[13px]">
                Status
              </th>
              <th className="px-4 py-3 text-left font-semibold text-[#64748B] text-[13px]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, idx) => (
              <tr
                key={product.slug}
                className={`border-[#F1F5F9] border-b hover:bg-[#F9FAFB] ${idx === products.length - 1 ? "border-b-0" : ""}`}
              >
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    {product.image_url ? (
                      <Image
                        src={product.image_url}
                        alt={product.name}
                        width={40}
                        height={40}
                        className="h-10 w-10 rounded-lg object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F1F5F9] text-[11px]">
                        No img
                      </div>
                    )}
                    <div>
                      <Link
                        href={`/admin/products/${product.slug}`}
                        className="font-medium text-[14px] hover:text-[#FF6B2C]"
                      >
                        {product.name}
                      </Link>
                      <div className="text-[#64748B] text-[13px]">
                        {product.subcategory_slug}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 font-mono text-[13px]">
                  {product.productId}
                </td>
                <td className="px-4 py-4 font-semibold text-[14px]">
                  ${Number.parseFloat(product.price).toFixed(2)}
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-1.5">
                    <Star className="h-4 w-4 fill-[#FFC107] text-[#FFC107]" />
                    <span className="font-semibold text-[14px]">
                      {product.rating
                        ? Number.parseFloat(product.rating).toFixed(1)
                        : "0.0"}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  {(product.sales || 0).toLocaleString()}
                </td>
                <td className="px-4 py-4">{product.stock || 0}</td>
                <td className="px-4 py-4">
                  {product.status === "in" && (
                    <span className="rounded-full bg-[#E8F5F1] px-3 py-1.5 text-[#0D9B6F] text-[13px]">
                      In Stock
                    </span>
                  )}
                  {product.status === "low" && (
                    <span className="rounded-full bg-[#FFF4EF] px-3 py-1.5 text-[#FF6B2C] text-[13px]">
                      Low Stock
                    </span>
                  )}
                  {product.status === "out" && (
                    <span className="rounded-full bg-[#F3F2FF] px-3 py-1.5 text-[#7C6FDC] text-[13px]">
                      Out
                    </span>
                  )}
                </td>
                <td className="relative px-4 py-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenActionMenu(
                        openActionMenu === product.slug ? null : product.slug,
                      );
                    }}
                    className="rounded-md p-1 hover:bg-[#F1F5F9]"
                    type="button"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </button>
                  {openActionMenu === product.slug && (
                    <div className="absolute top-12 right-4 z-50 w-40 rounded-lg border bg-white p-1 shadow-lg">
                      <Link
                        href={`/admin/products/${product.slug}`}
                        className="flex items-center gap-2 rounded px-3 py-2 text-[14px] hover:bg-[#F9FAFB]"
                        onClick={() => setOpenActionMenu(null)}
                      >
                        <Edit className="h-4 w-4" />
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(product.slug)}
                        className="flex w-full items-center gap-2 rounded px-3 py-2 text-[#EF4444] text-[14px] hover:bg-[#FEF2F2]"
                        type="button"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {products.length > 0 && (
        <div className="mt-6 flex items-center justify-between">
          <div className="text-[#64748B] text-[14px]">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1 || isSearching}
              className="rounded-lg border px-4 py-2 disabled:opacity-50"
              type="button"
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || isSearching}
              className="rounded-lg border px-4 py-2 disabled:opacity-50"
              type="button"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {products.length === 0 && !isSearching && (
        <div className="py-12 text-center">
          <div className="mb-4 text-[48px]">📦</div>
          <h3 className="mb-2 text-[18px]">No products found</h3>
          <p className="text-[#64748B] text-[14px]">
            Try adjusting your filters
          </p>
        </div>
      )}
    </>
  );
}
