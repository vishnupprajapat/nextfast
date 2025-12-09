import { sql } from "@vercel/postgres";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { products } from "@/db/schema";

const db = drizzle(sql);

async function updateProductsData() {
  console.log("Updating products with sample data...");

  const allProducts = await db.select().from(products);

  for (const product of allProducts) {
    const rating = (4.0 + Math.random() * 1.0).toFixed(1);
    const reviews = Math.floor(50 + Math.random() * 250);
    const sales = Math.floor(300 + Math.random() * 2000);
    const price = Number.parseFloat(product.price);
    const earnings = (price * sales).toFixed(2);
    const stock = Math.floor(Math.random() * 200);

    let status = "in";
    if (stock === 0) {
      status = "out";
    } else if (stock < 20) {
      status = "low";
    }

    await db
      .update(products)
      .set({
        rating,
        reviews,
        sales,
        earnings,
        stock,
        status,
      })
      .where(eq(products.slug, product.slug));

    console.log(`✓ Updated ${product.name}`);
  }

  console.log(`\n✅ Successfully updated ${allProducts.length} products!`);
}

updateProductsData()
  .then(() => {
    console.log("Done!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error:", error);
    process.exit(1);
  });
