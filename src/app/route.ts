import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session_token");

  const { searchParams } = new URL(request.url);
  const redirectTo = searchParams.get("redirectTo") || "/dashboard"; // Default redirect if authenticated

  if (sessionToken) {
    // If authenticated, redirect to the intended page (e.g., dashboard)
    return NextResponse.redirect(new URL(redirectTo, request.url));
  } else {
    // If not authenticated, redirect to the login page
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
