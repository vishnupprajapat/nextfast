/**
 * Script to make a user an admin
 * Usage: tsx scripts/makeAdmin.ts <username>
 */

import "../drizzle/envConfig";
import { eq } from "drizzle-orm";
import { db } from "../src/db";
import { admins, users } from "../src/db/schema";

const username = process.argv[2];

if (!username) {
  console.error("❌ Please provide a username");
  console.log("Usage: tsx scripts/makeAdmin.ts <username>");
  process.exit(1);
}

async function makeAdmin() {
  try {
    // Check if user exists
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.username, username))
      .limit(1);

    if (!user) {
      console.error(`❌ User "${username}" not found`);
      process.exit(1);
    }

    // Check if already an admin
    const [existingAdmin] = await db
      .select()
      .from(admins)
      .where(eq(admins.username, username))
      .limit(1);

    if (existingAdmin) {
      console.log(`✅ User "${username}" is already an admin!`);
      console.log(`   ID: ${existingAdmin.id}`);
      console.log(`   Username: ${existingAdmin.username}`);
      return;
    }

    // Create admin entry
    await db.insert(admins).values({
      username: user.username,
      passwordHash: user.passwordHash,
    });

    console.log(`✅ User "${username}" is now an admin!`);
    console.log(`   ID: ${user.id}`);
    console.log(`   Username: ${user.username}`);
    console.log(`   Status: Admin access granted`);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

makeAdmin();
