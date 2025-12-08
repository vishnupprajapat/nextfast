import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { MenuIcon } from "lucide-react";
import { Suspense } from "react";
import { Toaster } from "sonner";
import { Cart } from "@/components/cart";
import { LayoutClient } from "@/components/LayoutClient";
import { SearchDropdownComponent } from "@/components/search-dropdown";
import { Link } from "@/components/ui/link";
import { AuthServer } from "./auth.server";
import { WelcomeToast } from "./welcome-toast";

export const metadata: Metadata = {
  title: {
    template: "%s | NextFaster",
    default: "NextFaster",
  },
  description: "A performant site built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const header = (
    <header className="fixed top-0 z-10 flex h-[90px] w-[100vw] flex-grow items-center justify-between border-accent2 border-b-2 bg-background p-2 pt-2 pb-[4px] sm:h-[70px] sm:flex-row sm:gap-4 sm:p-4 sm:pt-0 sm:pb-[4px]">
      <div className="flex flex-grow flex-col">
        <div className="absolute top-2 right-2 flex justify-end pt-2 font-sans text-sm hover:underline sm:relative sm:top-0 sm:right-0">
          <Suspense
            fallback={
              <button className="flex flex-row items-center gap-1">
                <div className="h-[20px]" />
                <svg viewBox="0 0 10 6" className="h-[6px] w-[10px]">
                  <polygon points="0,0 5,6 10,0" />
                </svg>
              </button>
            }
          >
            <AuthServer />
          </Suspense>
        </div>
        <div className="flex w-full flex-col items-start justify-center sm:w-auto sm:flex-row sm:items-center sm:gap-2">
          <Link
            prefetch={true}
            href="/"
            className="font-bold text-4xl text-accent1"
          >
            NextFaster
          </Link>
          <div className="items flex w-full flex-row items-center justify-between gap-4">
            <div className="mx-0 flex-grow sm:mx-auto sm:flex-grow-0">
              <SearchDropdownComponent />
            </div>
            <div className="flex flex-row justify-between space-x-4">
              <div className="relative">
                <Link
                  prefetch={true}
                  href="/order"
                  className="text-accent1 text-lg hover:underline"
                >
                  ORDER
                </Link>
                <Suspense>
                  <Cart />
                </Suspense>
              </div>
              <Link
                prefetch={true}
                href="/order-history"
                className="hidden text-accent1 text-lg hover:underline md:block"
              >
                ORDER HISTORY
              </Link>
              <Link
                prefetch={true}
                href="/order-history"
                aria-label="Order History"
                className="block text-accent1 text-lg hover:underline md:hidden"
              >
                <MenuIcon />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );

  const footer = (
    <footer className="fixed bottom-0 flex h-12 w-screen flex-col items-center justify-between space-y-2 border-gray-400 border-t bg-background px-4 font-sans text-[11px] sm:h-6 sm:flex-row sm:space-y-0">
      <div className="flex flex-wrap justify-center space-x-2 pt-2 sm:justify-start">
        <span className="hover:bg-accent2 hover:underline">Home</span>
        <span>|</span>
        <span className="hover:bg-accent2 hover:underline">FAQ</span>
        <span>|</span>
        <span className="hover:bg-accent2 hover:underline">Returns</span>
        <span>|</span>
        <span className="hover:bg-accent2 hover:underline">Careers</span>
        <span>|</span>
        <span className="hover:bg-accent2 hover:underline">Contact</span>
      </div>
      <div className="text-center sm:text-right">
        By using this website, you agree to check out the{" "}
        <Link
          href="https://github.com/ethanniser/NextFaster"
          className="font-bold text-accent1 hover:underline"
          target="_blank"
        >
          Source Code
        </Link>
      </div>
    </footer>
  );

  return (
    <html lang="en" className="h-full">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} flex flex-col overflow-y-auto overflow-x-hidden antialiased`}
      >
        <LayoutClient header={header} footer={footer}>
          {children}
        </LayoutClient>
        <Suspense fallback={null}>
          <Toaster closeButton />
          <WelcomeToast />
        </Suspense>
        <Analytics scriptSrc="/insights/events.js" endpoint="/hq/events" />
      </body>
    </html>
  );
}
