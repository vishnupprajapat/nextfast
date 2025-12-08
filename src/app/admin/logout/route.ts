import { redirect } from "next/navigation";
import { clearAdminSession } from "@/lib/admin-session";

export async function POST() {
  await clearAdminSession();
  redirect("/admin/admin-auth");
}

export async function GET() {
  await clearAdminSession();
  redirect("/admin/admin-auth");
}
