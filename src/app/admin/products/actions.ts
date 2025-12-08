"use server";

import { put } from "@vercel/blob";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { products } from "@/db/schema";
import { requireAdmin } from "@/lib/admin-queries";

export async function saveProduct(formData: FormData) {
  try {
    // Check admin access
    await requireAdmin();
    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const description = formData.get("description") as string;
    const price = formData.get("price") as string;
    const subcategory_slug = formData.get("subcategory_slug") as string;
    const image_url = formData.get("image_url") as string;
    const original_slug = formData.get("original_slug") as string | null;

    // Validate required fields
    if (!name || !slug || !description || !price || !subcategory_slug) {
      return { error: "All fields are required" };
    }

    const productData = {
      name,
      slug,
      description,
      price,
      subcategory_slug,
      image_url: image_url || null,
    };

    if (original_slug) {
      // Update existing product
      if (original_slug !== slug) {
        // If slug changed, check if new slug exists
        const existing = await db
          .select()
          .from(products)
          .where(eq(products.slug, slug));
        if (existing.length > 0) {
          return { error: "A product with this slug already exists" };
        }
        // Delete old and create new (since slug is primary key)
        await db.delete(products).where(eq(products.slug, original_slug));
        await db.insert(products).values(productData);
      } else {
        await db
          .update(products)
          .set(productData)
          .where(eq(products.slug, original_slug));
      }
    } else {
      // Create new product
      const existing = await db
        .select()
        .from(products)
        .where(eq(products.slug, slug));
      if (existing.length > 0) {
        return { error: "A product with this slug already exists" };
      }
      await db.insert(products).values(productData);
    }

    revalidatePath("/admin/products");
    revalidatePath("/products");
    return { success: true };
  } catch (error) {
    console.error("Error saving product:", error);
    return { error: "Failed to save product" };
  }
}

export async function deleteProduct(slug: string) {
  try {
    // Check admin access
    await requireAdmin();

    await db.delete(products).where(eq(products.slug, slug));
    revalidatePath("/admin/products");
    revalidatePath("/products");
    return { success: true };
  } catch (error) {
    console.error("Error deleting product:", error);
    return { error: "Failed to delete product" };
  }
}

export async function uploadImage(formData: FormData) {
  try {
    // Check admin access
    await requireAdmin();

    const file = formData.get("file") as File;
    if (!file) {
      return { error: "No file provided" };
    }

    // Upload to Vercel Blob
    const blob = await put(file.name, file, {
      access: "public",
    });

    return { url: blob.url };
  } catch (error) {
    console.error("Error uploading image:", error);
    return { error: "Failed to upload image" };
  }
}
