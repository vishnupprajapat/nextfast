import { eq } from "drizzle-orm";
import slugify from "slugify";
import { db } from "../src/db";
import { collections } from "../src/db/schema";

const collectionsData = await db.query.collections.findMany();
for (const collection of collectionsData) {
  await db
    .update(collections)
    .set({ slug: slugify(collection.name, { lower: true }) })
    .where(eq(collections.id, collection.id));
}
