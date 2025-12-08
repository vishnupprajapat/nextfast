"use client";

import {
  BarChart3,
  FolderTree,
  LayoutDashboard,
  LogOut,
  Package,
  Settings,
  ShoppingCart,
  Store,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    href: "/admin/dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard size={20} strokeWidth={2} />,
  },
  {
    href: "/admin/products",
    label: "Products",
    icon: <Package size={20} strokeWidth={2} />,
  },
  {
    href: "/admin/orders",
    label: "Orders",
    icon: <ShoppingCart size={20} strokeWidth={2} />,
  },
  {
    href: "/admin/users",
    label: "Users",
    icon: <Users size={20} strokeWidth={2} />,
  },
  {
    href: "/admin/categories",
    label: "Categories",
    icon: <FolderTree size={20} strokeWidth={2} />,
  },
  {
    href: "/admin/analytics",
    label: "Analytics",
    icon: <BarChart3 size={20} strokeWidth={2} />,
  },
];

interface AdminNavProps {
  username: string;
}

export function AdminNav({ username }: AdminNavProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/admin/dashboard") {
      return pathname === "/admin" || pathname === "/admin/dashboard";
    }
    return pathname?.startsWith(href);
  };

  return (
    <aside className="fixed top-0 left-0 z-40 h-screen w-[280px] bg-white shadow-[2px_0_12px_rgba(0,0,0,0.04)]">
      <div className="flex h-full flex-col p-6">
        {/* Logo/Brand */}
        <div className="mb-8">
          <Link
            href="/admin/dashboard"
            className="group flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF8A1F]">
              <Store size={24} strokeWidth={2} className="text-white" />
            </div>
            <div>
              <h1 className="font-semibold text-[#1E1E1E] text-xl transition-colors group-hover:text-[#FF8A1F]">
                EzMart
              </h1>
              <p className="text-[#666666] text-xs">Admin Panel</p>
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 font-medium text-sm transition-all duration-200 ${
                  active
                    ? "bg-[#FFF7ED] text-[#FF8A1F] shadow-sm"
                    : "text-[#666666] hover:bg-[#FFF9F5] hover:text-[#1E1E1E]"
                }`}
              >
                <span className={active ? "text-[#FF8A1F]" : "text-[#666666]"}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="space-y-4 border-[#F0E8DC] border-t pt-4">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 rounded-xl px-4 py-3 font-medium text-[#666666] text-sm transition-all hover:bg-[#FFF9F5] hover:text-[#1E1E1E]"
          >
            <Store size={20} strokeWidth={2} />
            <span>View Website</span>
          </Link>

          <Link
            href="/admin/settings"
            className="flex items-center gap-3 rounded-xl px-4 py-3 font-medium text-[#666666] text-sm transition-all hover:bg-[#FFF9F5] hover:text-[#1E1E1E]"
          >
            <Settings size={20} strokeWidth={2} />
            <span>Settings</span>
          </Link>

          {/* User Info */}
          <div className="rounded-xl bg-[#F5E7D8] px-4 py-3">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF8A1F] font-semibold text-sm text-white">
                {username.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate font-medium text-[#1E1E1E] text-sm">
                  {username}
                </div>
                <div className="text-[#666666] text-xs">Administrator</div>
              </div>
            </div>

            <form action="/admin/logout" method="POST">
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#E5DDD1] bg-white px-4 py-2.5 font-medium text-[#1E1E1E] text-sm transition-colors hover:bg-[#FAFAFA]"
              >
                <LogOut size={16} strokeWidth={2} />
                <span>Logout</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </aside>
  );
}
