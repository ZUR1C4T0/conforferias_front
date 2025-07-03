import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const { pathname } = request.nextUrl;

  const isPublicRoute = pathname === "/login";
  const isProtectedRoute = pathname.startsWith("/dashboard");

  if (isPublicRoute && accessToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (isProtectedRoute) {
    if (!accessToken && refreshToken) {
      try {
        const response = await fetch(
          `${process.env.BACKEND_URL}/auth/refresh`,
          {
            method: "POST",
            body: JSON.stringify({ refreshToken }),
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        const contentType = response.headers.get("Content-Type");
        if (response.ok && contentType?.includes("json")) {
          const { accessToken: newAccessToken } = await response.json();
          const res = NextResponse.next();
          res.cookies.set("accessToken", newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60, // 1h
            path: "/",
          });
          return res;
        }
      } catch {
        // Falló el intento de refresh → continuar a redirección
      }
    }
    if (!accessToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
