import { eq } from "drizzle-orm";
import { db } from "../db";
import { admins } from "../db/schema";
import { getUser } from "./queries";

/**
 * Check if the current user is an admin
 * @returns true if user is admin, false otherwise
 */
export async function isAdmin(): Promise<boolean> {
  const user = await getUser();
  if (!user) return false;

  const [admin] = await db
    .select()
    .from(admins)
    .where(eq(admins.username, user.username))
    .limit(1);

  return !!admin;
}

/**
 * Require admin access - throws error if user is not admin
 * Use this in server actions and API routes
 */
export async function requireAdmin(): Promise<void> {
  const user = await getUser();

  if (!user) {
    throw new Error("Authentication required");
  }

  const [admin] = await db
    .select()
    .from(admins)
    .where(eq(admins.username, user.username))
    .limit(1);

  if (!admin) {
    throw new Error("Admin access required");
  }
}

/**
 * Get current user with admin check
 * @returns User object if admin, null otherwise
 */
export async function getAdminUser() {
  const user = await getUser();

  if (!user) {
    return null;
  }

  const [admin] = await db
    .select()
    .from(admins)
    .where(eq(admins.username, user.username))
    .limit(1);

  if (!admin) {
    return null;
  }

  return user;
}
