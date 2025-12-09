import { and, count, eq, ilike } from "drizzle-orm";
import type { NextRequest } from "next/server";
import { db } from "@/db";
import { products } from "@/db/schema";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "all";
    const page = Number.parseInt(searchParams.get("page") || "1", 10);
    const limit = 10;
    const offset = (page - 1) * limit;

    // Build where conditions
    const conditions = [];

    if (search) {
      conditions.push(ilike(products.name, `%${search}%`));
    }

    if (status !== "all") {
      conditions.push(eq(products.status, status));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    // Get total count
    const [{ total }] = await db
      .select({ total: count() })
      .from(products)
      .where(whereClause);

    // Get paginated results
    const productList = await db
      .select()
      .from(products)
      .where(whereClause)
      .limit(limit)
      .offset(offset);

    // Add product IDs
    const enrichedProducts = productList.map((product, idx) => ({
      ...product,
      productId: `PRD-${String(offset + idx + 1).padStart(4, "0")}`,
    }));

    return Response.json({
      products: enrichedProducts,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Search error:", error);
    return Response.json(
      { error: "Failed to search products" },
      { status: 500 },
    );
  }
}
