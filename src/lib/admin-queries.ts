import { and, eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { db } from "@/db";
import { admins } from "@/db/schema";
import { verifyAdminToken } from "./admin-session";

export async function getAdminUser() {
  const sessionCookie = (await cookies()).get("admin_session");
  if (!sessionCookie || !sessionCookie.value) {
    return null;
  }

  const sessionData = await verifyAdminToken(sessionCookie.value);
  if (
    !sessionData ||
    !sessionData.admin ||
    typeof sessionData.admin.id !== "number"
  ) {
    return null;
  }

  if (new Date(sessionData.expires) < new Date()) {
    return null;
  }

  const admin = await db
    .select()
    .from(admins)
    .where(and(eq(admins.id, sessionData.admin.id)))
    .limit(1);

  if (admin.length === 0) {
    return null;
  }

  return admin[0];
}

/**
 * Check if the current user is an admin
 * @returns true if user is admin, false otherwise
 */
export async function isAdmin(): Promise<boolean> {
  const admin = await getAdminUser();
  return admin !== null;
}

/**
 * Require admin access - throws error if user is not admin
 * Use this in server actions and API routes
 */
export async function requireAdmin(): Promise<void> {
  const admin = await getAdminUser();

  if (!admin) {
    throw new Error("Admin authentication required");
  }
}
