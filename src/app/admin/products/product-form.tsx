"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import type { Product, Subcategory } from "@/db/schema";
import { deleteProduct, saveProduct, uploadImage } from "./actions";

export function ProductForm({
  product,
  subcategories,
}: {
  product?: Product;
  subcategories: Subcategory[];
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    product?.image_url || null,
  );
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file");
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5MB");
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const result = await uploadImage(formData);

      if (result.error) {
        setError(result.error);
      } else if (result.url) {
        setImagePreview(result.url);
        // Update the hidden input value
        const imageUrlInput = document.getElementById(
          "image_url",
        ) as HTMLInputElement;
        if (imageUrlInput) {
          imageUrlInput.value = result.url;
        }
      }
    } catch (err) {
      setError("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (formData: FormData) => {
    setError(null);
    startTransition(async () => {
      const result = await saveProduct(formData);
      if (result.error) {
        setError(result.error);
      } else {
        router.push("/admin/products");
        router.refresh();
      }
    });
  };

  const handleDelete = async () => {
    if (!product) return;
    if (!confirm("Are you sure you want to delete this product?")) return;

    startTransition(async () => {
      const result = await deleteProduct(product.slug);
      if (result.error) {
        setError(result.error);
      } else {
        router.push("/admin/products");
        router.refresh();
      }
    });
  };

  return (
    <form action={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      {product && (
        <input type="hidden" name="original_slug" value={product.slug} />
      )}

      <div>
        <label
          htmlFor="name"
          className="block font-medium text-gray-700 text-sm"
        >
          Product Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          required
          defaultValue={product?.name}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
        />
      </div>

      <div>
        <label
          htmlFor="slug"
          className="block font-medium text-gray-700 text-sm"
        >
          Slug (URL-friendly name)
        </label>
        <input
          type="text"
          name="slug"
          id="slug"
          required
          defaultValue={product?.slug}
          pattern="[a-z0-9-]+"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
        />
        <p className="mt-1 text-gray-500 text-xs">
          Use lowercase letters, numbers, and hyphens only
        </p>
      </div>

      <div>
        <label
          htmlFor="description"
          className="block font-medium text-gray-700 text-sm"
        >
          Description
        </label>
        <textarea
          name="description"
          id="description"
          required
          rows={4}
          defaultValue={product?.description}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
        />
      </div>

      <div>
        <label
          htmlFor="price"
          className="block font-medium text-gray-700 text-sm"
        >
          Price ($)
        </label>
        <input
          type="number"
          name="price"
          id="price"
          required
          step="0.01"
          min="0"
          defaultValue={product?.price}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
        />
      </div>

      <div>
        <label
          htmlFor="subcategory_slug"
          className="block font-medium text-gray-700 text-sm"
        >
          Subcategory
        </label>
        <select
          name="subcategory_slug"
          id="subcategory_slug"
          required
          defaultValue={product?.subcategory_slug}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
        >
          <option value="">Select a subcategory</option>
          {subcategories.map((subcat) => (
            <option key={subcat.slug} value={subcat.slug}>
              {subcat.name} ({subcat.slug})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-medium text-gray-700 text-sm">
          Product Image
        </label>
        <div className="mt-2 flex items-start gap-4">
          {imagePreview && (
            <div className="relative h-32 w-32 flex-shrink-0">
              <Image
                src={imagePreview}
                alt="Product preview"
                fill
                className="rounded-lg object-cover"
              />
            </div>
          )}
          <div className="flex-1">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploading}
              className="block w-full text-gray-500 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:font-medium file:text-blue-700 file:text-sm hover:file:bg-blue-100"
            />
            <input
              type="hidden"
              name="image_url"
              id="image_url"
              defaultValue={product?.image_url || ""}
            />
            <p className="mt-1 text-gray-500 text-xs">
              PNG, JPG, GIF up to 5MB
            </p>
            {uploading && (
              <p className="mt-2 text-blue-600 text-sm">Uploading...</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-between border-t pt-6">
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isPending || uploading}
            className="rounded-md bg-blue-600 px-4 py-2 font-medium text-sm text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {isPending
              ? "Saving..."
              : product
                ? "Update Product"
                : "Create Product"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-md bg-gray-100 px-4 py-2 font-medium text-gray-700 text-sm hover:bg-gray-200"
          >
            Cancel
          </button>
        </div>
        {product && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={isPending}
            className="rounded-md bg-red-600 px-4 py-2 font-medium text-sm text-white hover:bg-red-700 disabled:opacity-50"
          >
            Delete Product
          </button>
        )}
      </div>
    </form>
  );
}
