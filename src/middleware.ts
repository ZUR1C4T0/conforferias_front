import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get("accessToken");
  const { pathname } = request.nextUrl;

  const publicPaths = ["/login"];
  const protectedPaths = ["/dashboard"];

  const isPublicPath = publicPaths.includes(pathname);
  const isProtectedRoute = protectedPaths.some((path) =>
    pathname.startsWith(path),
  );

  if (sessionToken && isPublicPath) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!sessionToken && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
