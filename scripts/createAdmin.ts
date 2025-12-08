/**
 * Script to create a new admin user in the admins table
 * Usage: tsx scripts/createAdmin.ts <username> <password>
 */

import "../drizzle/envConfig";
import { eq } from "drizzle-orm";
import { db } from "../src/db";
import { admins } from "../src/db/schema";
import { hashPassword } from "../src/lib/admin-session";

const username = process.argv[2];
const password = process.argv[3];

if (!username || !password) {
  console.error("❌ Please provide username and password");
  console.log("Usage: tsx scripts/createAdmin.ts <username> <password>");
  process.exit(1);
}

async function createAdmin() {
  try {
    // Check if admin already exists
    const existingAdmin = await db
      .select()
      .from(admins)
      .where(eq(admins.username, username))
      .limit(1);

    if (existingAdmin.length > 0) {
      console.log(`ℹ️  Admin "${username}" already exists!`);
      console.log(`   ID: ${existingAdmin[0].id}`);
      console.log(`   Username: ${existingAdmin[0].username}`);
      return;
    }

    // Hash the password
    const passwordHash = await hashPassword(password);

    // Create new admin user
    const [newAdmin] = await db
      .insert(admins)
      .values({
        username,
        passwordHash,
      })
      .returning();

    console.log(`✅ Admin user created successfully!`);
    console.log(`   ID: ${newAdmin.id}`);
    console.log(`   Username: ${newAdmin.username}`);
    console.log(`\nYou can now login at: /admin/login`);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

createAdmin();
