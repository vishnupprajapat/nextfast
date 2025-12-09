import { jwtVerify } from "jose";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const key = new TextEncoder().encode(process.env.AUTH_SECRET);

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow access to admin login page and logout
  if (
    pathname.startsWith("/admin/admin-auth") ||
    pathname === "/admin/logout"
  ) {
    return NextResponse.next();
  }

  // Protect all other admin routes
  if (pathname.startsWith("/admin")) {
    const adminSession = request.cookies.get("admin_session");

    if (!adminSession?.value) {
      // Redirect to admin login if no session cookie
      const url = request.nextUrl.clone();
      url.pathname = "/admin/admin-auth";
      return NextResponse.redirect(url);
    }

    try {
      // Verify the JWT token
      const { payload } = await jwtVerify(adminSession.value, key, {
        algorithms: ["HS256"],
      });

      // Check if token is expired
      if (payload.expires && new Date(payload.expires as string) < new Date()) {
        const url = request.nextUrl.clone();
        url.pathname = "/admin/admin-auth";
        return NextResponse.redirect(url);
      }
    } catch (_error) {
      // Invalid token - redirect to login
      const url = request.nextUrl.clone();
      url.pathname = "/admin/admin-auth";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
