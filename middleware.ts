import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("binntech_token")?.value;
  const role = request.cookies.get("binntech_role")?.value;
  const { pathname } = request.nextUrl;

  /* ======================
     PUBLIC ROUTES
  ====================== */
  if (
    pathname === "/" ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/auth") ||
    pathname.startsWith("/admin/login")
  ) {
    return NextResponse.next();
  }

  /* ======================
     NOT LOGGED IN
  ====================== */
  if (!token) {
    // trying to access admin
    if (pathname.startsWith("/admin")) {
      return NextResponse.redirect(
        new URL("/admin/login", request.url)
      );
    }

    // normal user
    return NextResponse.redirect(
      new URL("/auth/login", request.url)
    );
  }

  /* ======================
     ADMIN ROUTES
  ====================== */
  if (pathname.startsWith("/admin")) {
    if (role !== "admin") {
      return NextResponse.redirect(
        new URL("/dashboard", request.url)
      );
    }
  }

  /* ======================
     USER ROUTES
  ====================== */
  if (
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/ai") ||
    pathname.startsWith("/store")
  ) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

/* ======================
   MATCHER
====================== */
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/ai/:path*",
    "/store/:path*",
    "/admin/:path*",
  ],
};
