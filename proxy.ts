// File: middleware.tsx (REPLACING line 16)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/dashboard"];
const loginRoute = "/"; 

export function proxy(request: NextRequest) {
  // 1. Get the cookie value from the incoming request
  const isLoggedIn = request.cookies.get("user")?.value;

  // 2. Check if the current path is one that requires authentication
  const isProtected = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );
  
  if (isProtected && !isLoggedIn) {
      // Redirect unauthenticated users away from protected pages
      const url = request.nextUrl.clone();
      url.pathname = loginRoute;

      return NextResponse.redirect(url);
  }

  const isLoginPage = request.nextUrl.pathname === loginRoute;
  const dashboardRoute = "/dashboard";
  
  if (isLoginPage && isLoggedIn) {
      // Redirect authenticated users from the login page to the dashboard
      const url = request.nextUrl.clone();
      url.pathname = dashboardRoute;
      return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/"],
};