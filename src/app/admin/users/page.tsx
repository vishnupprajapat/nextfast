import { redirect } from "next/navigation";
import { db } from "@/db";
import { users } from "@/db/schema";
import { getAdminUser } from "@/lib/admin-queries";

export default async function AdminUsersPage() {
  const admin = await getAdminUser();

  if (!admin) {
    redirect("/admin/admin-auth");
  }

  const usersList = await db
    .select({
      id: users.id,
      username: users.username,
      createdAt: users.createdAt,
    })
    .from(users)
    .orderBy(users.createdAt)
    .limit(100);

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-bold text-2xl text-gray-900">Website Users</h2>
        <p className="mt-1 text-gray-500 text-sm">
          Manage customer accounts and user information
        </p>
      </div>

      <div className="overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wider"
                >
                  ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wider"
                >
                  Username
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wider"
                >
                  Created At
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {usersList.length === 0 ? (
                <tr>
                  <td
                    colSpan={3}
                    className="px-6 py-12 text-center text-gray-500 text-sm"
                  >
                    No users found
                  </td>
                </tr>
              ) : (
                usersList.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 text-sm">
                      {user.id}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-gray-900 text-sm">
                      {user.username}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-gray-500 text-sm">
                      {user.createdAt.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 text-gray-600 text-sm">
        <p>Total users: {usersList.length}</p>
      </div>
    </div>
  );
}
