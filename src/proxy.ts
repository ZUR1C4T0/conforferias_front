import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { refresh } from "./lib/refresh";

export async function proxy(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const { pathname } = request.nextUrl;

  const isPublicRoute = pathname === "/login";
  const isProtectedRoute = pathname.startsWith("/dashboard");

  // Redireccionar al dashboard si la sesión está activa
  if (isPublicRoute) {
    if (accessToken) {
      return NextResponse.redirect(new URL("/dashboard/fairs", request.url));
    }
    if (refreshToken) {
      const newAccessToken = await refresh(refreshToken);
      if (!newAccessToken) {
        const res = NextResponse.next();
        res.cookies.delete("refreshToken");
        return res;
      }
      const res = NextResponse.redirect(
        new URL("/dashboard/fairs", request.url),
      );
      res.cookies.set("accessToken", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 1, // One hour
        path: "/",
      });
      return res;
    }
    return NextResponse.next();
  }

  if (isProtectedRoute) {
    if (!accessToken && !refreshToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (!accessToken && refreshToken) {
      const newAccessToken = await refresh(refreshToken);
      if (!newAccessToken) {
        const res = NextResponse.redirect(new URL("/login", request.url));
        res.cookies.delete("refreshToken");
        return res;
      }
      const res = NextResponse.next();
      res.cookies.set("accessToken", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 1, // One hour
        path: "/",
      });
      return res;
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
