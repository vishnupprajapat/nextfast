import { redirect } from "next/navigation";
import { getAdminUser } from "@/lib/admin-queries";
import { AdminLoginForm } from "./login-form";

export default async function AdminLoginPage() {
  const admin = await getAdminUser();

  // If already logged in as admin, redirect to dashboard
  if (admin) {
    redirect("/admin");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center font-bold text-3xl text-gray-900 tracking-tight">
            Admin Login
          </h2>
          <p className="mt-2 text-center text-gray-600 text-sm">
            Sign in to access the admin dashboard
          </p>
        </div>
        <AdminLoginForm />
      </div>
    </div>
  );
}
