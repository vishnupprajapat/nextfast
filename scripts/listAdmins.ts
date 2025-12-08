/**
 * Script to list all admin users from the admins table
 * Usage: tsx scripts/listAdmins.ts
 */

import "../drizzle/envConfig";
import { db } from "../src/db";
import { admins } from "../src/db/schema";

async function listAdmins() {
  try {
    const adminList = await db
      .select({
        id: admins.id,
        username: admins.username,
        email: admins.email,
        createdAt: admins.createdAt,
      })
      .from(admins);

    if (adminList.length === 0) {
      console.log("ℹ️  No admin users found");
      console.log("\nTo create an admin user, run:");
      console.log("  pnpm admin:create <username> <password>");
      return;
    }

    console.log(`\n✅ Found ${adminList.length} admin user(s):\n`);
    adminList.forEach((admin, index) => {
      console.log(`${index + 1}. Username: ${admin.username}`);
      console.log(`   ID: ${admin.id}`);
      console.log(`   Email: ${admin.email || "Not set"}`);
      console.log(`   Created: ${admin.createdAt.toLocaleDateString()}`);
      console.log("");
    });
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

listAdmins();
