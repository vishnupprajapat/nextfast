import type { Metadata } from "next";
import "../globals.css";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

export const metadata: Metadata = {
  title: {
    template: "%s | Admin",
    default: "Admin Panel",
  },
  description: "Admin management panel",
};

export default function AdminRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} flex min-h-screen flex-col antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
