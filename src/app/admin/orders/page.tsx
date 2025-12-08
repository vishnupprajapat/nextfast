import { redirect } from "next/navigation";
import { getAdminUser } from "@/lib/admin-queries";

export default async function AdminOrdersPage() {
  const admin = await getAdminUser();

  if (!admin) {
    redirect("/admin/admin-auth");
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-bold text-2xl text-gray-900">Orders</h2>
        <p className="mt-1 text-gray-500 text-sm">
          View and manage customer orders
        </p>
      </div>

      <div className="overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="px-4 py-12 text-center">
          <div className="mx-auto max-w-md">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <h3 className="mt-4 font-medium text-gray-900 text-lg">
              No Order System Yet
            </h3>
            <p className="mt-2 text-gray-500 text-sm">
              The order management system is not implemented yet. Currently,
              this is a product catalog demo without order processing.
            </p>
            <div className="mt-6 rounded-md bg-blue-50 p-4">
              <p className="text-blue-700 text-sm">
                <strong>To implement orders:</strong> You need to create an
                orders table in the database and add checkout functionality.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-lg border border-gray-200 bg-white p-6">
        <h3 className="font-medium text-gray-900 text-lg">
          Order System Features to Add:
        </h3>
        <ul className="mt-4 space-y-2 text-gray-600 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-gray-400">•</span>
            <span>
              Create orders table in database (order_id, user_id, items, total,
              status, etc.)
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-gray-400">•</span>
            <span>Add checkout page for users to place orders</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-gray-400">•</span>
            <span>Implement payment processing (Stripe, PayPal, etc.)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-gray-400">•</span>
            <span>
              Add order status tracking (pending, processing, shipped,
              delivered)
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-gray-400">•</span>
            <span>Create order management UI for admins</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-gray-400">•</span>
            <span>Add email notifications for order updates</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
