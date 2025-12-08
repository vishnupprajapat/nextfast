"use server";

import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "@/db";
import { admins } from "@/db/schema";
import { comparePasswords, setAdminSession } from "@/lib/admin-session";

const adminAuthSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export async function adminSignIn(
  _prevState: unknown,
  formData: FormData,
): Promise<{ error?: string } | undefined> {
  try {
    const data = {
      username: formData.get("username") as string,
      password: formData.get("password") as string,
    };

    const validated = adminAuthSchema.parse(data);

    const admin = await db
      .select()
      .from(admins)
      .where(eq(admins.username, validated.username))
      .limit(1);

    if (admin.length === 0) {
      return { error: "Invalid username or password" };
    }

    const foundAdmin = admin[0];

    const isPasswordValid = await comparePasswords(
      validated.password,
      foundAdmin.passwordHash,
    );

    if (!isPasswordValid) {
      return { error: "Invalid username or password" };
    }

    await setAdminSession(foundAdmin);
  } catch (error) {
    return { error: "An error occurred during sign in" };
  }

  redirect("/admin");
}
