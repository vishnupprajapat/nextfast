CREATE TABLE IF NOT EXISTS "categories" (
	"slug" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"collection_id" integer NOT NULL,
	"image_url" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "collections" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "products" (
	"slug" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"price" numeric NOT NULL,
	"subcategory_slug" text NOT NULL,
	"image_url" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "subcategories" (
	"slug" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"subcollection_id" integer NOT NULL,
	"image_url" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "subcollections" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"category_slug" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar(100) NOT NULL,
	"password_hash" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "categories" ADD CONSTRAINT "categories_collection_id_collections_id_fk" FOREIGN KEY ("collection_id") REFERENCES "public"."collections"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "products" ADD CONSTRAINT "products_subcategory_slug_subcategories_slug_fk" FOREIGN KEY ("subcategory_slug") REFERENCES "public"."subcategories"("slug") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "subcategories" ADD CONSTRAINT "subcategories_subcollection_id_subcollections_id_fk" FOREIGN KEY ("subcollection_id") REFERENCES "public"."subcollections"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "subcollections" ADD CONSTRAINT "subcollections_category_slug_categories_slug_fk" FOREIGN KEY ("category_slug") REFERENCES "public"."categories"("slug") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "categories_collection_id_idx" ON "categories" USING btree ("collection_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "name_search_index" ON "products" USING gin (to_tsvector('english', "name"));--> statement-breakpoint
CREATE INDEX CONCURRENTLY IF NOT EXISTS "name_trgm_index" ON "products" USING gin ("name" gin_trgm_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "products_subcategory_slug_idx" ON "products" USING btree ("subcategory_slug");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "subcategories_subcollection_id_idx" ON "subcategories" USING btree ("subcollection_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "subcollections_category_slug_idx" ON "subcollections" USING btree ("category_slug");