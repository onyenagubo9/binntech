import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("binntech_token")?.value;
  const role = request.cookies.get("binntech_role")?.value;

  /* ==========================
     PUBLIC ROUTES (NO AUTH)
  ========================== */
  const isPublicRoute =
    pathname === "/" ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/auth") ||
    pathname === "/admin/login";

  if (isPublicRoute) {
    return NextResponse.next();
  }

  /* ==========================
     NOT AUTHENTICATED
  ========================== */
  if (!token) {
    // Trying to access admin without login
    if (pathname.startsWith("/admin")) {
      return NextResponse.redirect(
        new URL("/admin/login", request.url)
      );
    }

    // Normal protected routes
    return NextResponse.redirect(
      new URL("/auth/login", request.url)
    );
  }

  /* ==========================
     ADMIN-ONLY ROUTES
  ========================== */
  if (pathname.startsWith("/admin")) {
    if (role !== "admin") {
      // Logged in but NOT admin
      return NextResponse.redirect(
        new URL("/dashboard", request.url)
      );
    }

    // ✅ Admin verified
    return NextResponse.next();
  }

  /* ==========================
     USER ROUTES (LOGGED IN)
  ========================== */
  if (
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/ai") ||
    pathname.startsWith("/store")
  ) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

/* ==========================
   ROUTE MATCHER
========================== */
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/ai/:path*",
    "/store/:path*",
    "/admin/:path*",
  ],
};
