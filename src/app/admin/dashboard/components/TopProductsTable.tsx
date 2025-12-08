"use client";

import { TrendingDown, TrendingUp } from "lucide-react";
import numeral from "numeral";

interface Product {
  id: number;
  name: string;
  category: string;
  sales: number;
  revenue: number;
  trend: number;
  icon: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    category: "Electronics",
    sales: 1247,
    revenue: 124700,
    trend: 12.5,
    icon: "🎧",
  },
  {
    id: 2,
    name: "Organic Cotton T-Shirt",
    category: "Clothing",
    sales: 2156,
    revenue: 64680,
    trend: 8.3,
    icon: "👕",
  },
  {
    id: 3,
    name: "Smart Fitness Watch",
    category: "Electronics",
    sales: 892,
    revenue: 178400,
    trend: 15.7,
    icon: "⌚",
  },
  {
    id: 4,
    name: "Leather Messenger Bag",
    category: "Accessories",
    sales: 634,
    revenue: 76080,
    trend: -3.2,
    icon: "💼",
  },
  {
    id: 5,
    name: "Bamboo Coffee Mug",
    category: "Home & Kitchen",
    sales: 1523,
    revenue: 30460,
    trend: 22.1,
    icon: "☕",
  },
];

export function TopProductsTable() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
      <h2 className="mb-6 font-semibold text-[#1E1E1E] text-xl">
        Top Products
      </h2>

      <div className="overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-[#F0E8DC] border-b">
              <th className="pb-3 text-left font-medium text-[#666666] text-xs uppercase tracking-wider">
                Product
              </th>
              <th className="pb-3 text-right font-medium text-[#666666] text-xs uppercase tracking-wider">
                Sales
              </th>
              <th className="pb-3 text-right font-medium text-[#666666] text-xs uppercase tracking-wider">
                Revenue
              </th>
              <th className="pb-3 text-right font-medium text-[#666666] text-xs uppercase tracking-wider">
                Trend
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => {
              const isPositive = product.trend > 0;
              return (
                <tr
                  key={product.id}
                  className={`border-[#F0E8DC] border-b transition-colors last:border-0 hover:bg-[#FFF9F5] ${
                    index === 0 ? "bg-[#FFF7ED]" : ""
                  }`}
                >
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F5E7D8] text-xl">
                        {product.icon}
                      </div>
                      <div>
                        <div className="font-medium text-[#1E1E1E] text-sm">
                          {product.name}
                        </div>
                        <div className="text-[#666666] text-xs">
                          {product.category}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="text-right font-medium text-[#1E1E1E] text-sm tabular-nums">
                    {numeral(product.sales).format("0,0")}
                  </td>
                  <td className="text-right font-medium text-[#1E1E1E] text-sm tabular-nums">
                    ${numeral(product.revenue).format("0,0")}
                  </td>
                  <td className="text-right">
                    <div
                      className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 font-medium text-xs ${
                        isPositive
                          ? "bg-[#ECFDF5] text-[#065F46]"
                          : "bg-[#FEF2F2] text-[#991B1B]"
                      }`}
                    >
                      {isPositive ? (
                        <TrendingUp size={14} strokeWidth={2.5} />
                      ) : (
                        <TrendingDown size={14} strokeWidth={2.5} />
                      )}
                      <span>{Math.abs(product.trend).toFixed(1)}%</span>
                    </div>
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
