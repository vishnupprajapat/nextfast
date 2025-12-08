"use client";

interface Order {
  id: string;
  orderId: string;
  customer: string;
  product: string;
  quantity: number;
  total: number;
  status: "Shipped" | "Processing" | "Delivered" | "Pending";
  icon: string;
}

const orders: Order[] = [
  {
    id: "1",
    orderId: "#10234",
    customer: "Ananya Walker",
    product: "Wireless Headphones",
    quantity: 2,
    total: 100,
    status: "Shipped",
    icon: "🎧",
  },
  {
    id: "2",
    orderId: "#10235",
    customer: "Sebastian Adams",
    product: "Running Shoes",
    quantity: 1,
    total: 75,
    status: "Processing",
    icon: "👟",
  },
  {
    id: "3",
    orderId: "#10236",
    customer: "Suzanne Bright",
    product: "Smartwatch",
    quantity: 1,
    total: 150,
    status: "Delivered",
    icon: "⌚",
  },
  {
    id: "4",
    orderId: "#10237",
    customer: "Peter Howe",
    product: "Coffee Maker",
    quantity: 1,
    total: 60,
    status: "Pending",
    icon: "☕",
  },
  {
    id: "5",
    orderId: "#10238",
    customer: "Anita Singh",
    product: "Bluetooth Speaker",
    quantity: 3,
    total: 90,
    status: "Shipped",
    icon: "🔊",
  },
];

function getStatusColor(status: Order["status"]) {
  const colors = {
    Shipped: { bg: "#FFF7ED", text: "#FF8A1F" },
    Processing: { bg: "#EFF6FF", text: "#3B82F6" },
    Delivered: { bg: "#ECFDF5", text: "#10B981" },
    Pending: { bg: "#FFF7ED", text: "#F59E0B" },
  };
  return colors[status];
}

export function RecentOrders() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-semibold text-[#1E1E1E] text-xl">Recent Orders</h2>
        <button className="font-medium text-[#FF8A1F] text-sm hover:text-[#EA580C]">
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-[#F0E8DC] border-b">
              <th className="pb-3 text-left font-medium text-[#666666] text-xs uppercase tracking-wider">
                No.
              </th>
              <th className="pb-3 text-left font-medium text-[#666666] text-xs uppercase tracking-wider">
                Order ID
              </th>
              <th className="pb-3 text-left font-medium text-[#666666] text-xs uppercase tracking-wider">
                Customer
              </th>
              <th className="pb-3 text-left font-medium text-[#666666] text-xs uppercase tracking-wider">
                Product
              </th>
              <th className="pb-3 text-right font-medium text-[#666666] text-xs uppercase tracking-wider">
                Qty
              </th>
              <th className="pb-3 text-right font-medium text-[#666666] text-xs uppercase tracking-wider">
                Total
              </th>
              <th className="pb-3 text-right font-medium text-[#666666] text-xs uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => {
              const statusColors = getStatusColor(order.status);
              return (
                <tr
                  key={order.id}
                  className="border-[#F0E8DC] border-b transition-colors last:border-0 hover:bg-[#FFF9F5]"
                >
                  <td className="py-4 text-[#666666] text-sm">{index + 1}</td>
                  <td className="py-4 font-medium text-[#1E1E1E] text-sm">
                    {order.orderId}
                  </td>
                  <td className="py-4 text-[#1E1E1E] text-sm">
                    {order.customer}
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{order.icon}</span>
                      <span className="text-[#1E1E1E] text-sm">
                        {order.product}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 text-right text-[#1E1E1E] text-sm tabular-nums">
                    {order.quantity}
                  </td>
                  <td className="py-4 text-right font-medium text-[#1E1E1E] text-sm tabular-nums">
                    ${order.total}
                  </td>
                  <td className="py-4 text-right">
                    <span
                      className="inline-flex items-center rounded-full px-2.5 py-1 font-medium text-xs"
                      style={{
                        backgroundColor: statusColors.bg,
                        color: statusColors.text,
                      }}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
