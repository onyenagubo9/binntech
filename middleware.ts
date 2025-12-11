import { NextRequest, NextResponse } from "next/server";

// PROTECTED ROUTES
const protectedRoutes = ["/dashboard", "/ai", "/store", "/admin"];

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("binntech_token")?.value;

  // Check if the request path requires authentication
  const path = request.nextUrl.pathname;
  const requiresAuth = protectedRoutes.some(route => path.startsWith(route));

  if (!requiresAuth) return NextResponse.next();

  // If no token → redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Verify Firebase token using Google endpoint (safe + server side)
  const verifyUrl = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`;

  try {
    const response = await fetch(verifyUrl, {
      method: "POST",
      body: JSON.stringify({ idToken: token }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();

    // Invalid token → redirect to login
    if (!data.users) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    // Token valid → allow route
    return NextResponse.next();
  } catch (err) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/ai/:path*",
    "/store/:path*",
    "/admin/:path*",
  ],
};
