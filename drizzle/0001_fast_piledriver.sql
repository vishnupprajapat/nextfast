CREATE TABLE "admins" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar(100) NOT NULL,
	"password_hash" text NOT NULL,
	"email" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "admins_username_unique" UNIQUE("username")
);
--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "rating" numeric DEFAULT '0';--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "reviews" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "sales" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "earnings" numeric DEFAULT '0';--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "stock" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "status" text DEFAULT 'in';