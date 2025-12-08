"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export function LayoutClient({
  header,
  footer,
  children,
}: {
  header: ReactNode;
  footer: ReactNode;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/admin");

  return (
    <>
      {!isAdminPage && header}
      <div className={!isAdminPage ? "pt-[85px] sm:pt-[70px]" : ""}>
        {children}
      </div>
      {!isAdminPage && footer}
    </>
  );
}
