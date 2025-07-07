import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { axiosInstance } from "@/lib/axios";

export async function GET(request: NextRequest) {
  const cookiesStore = await cookies();
  try {
    const token = cookiesStore.get("accessToken")?.value;
    if (token) {
      await axiosInstance.delete("/auth/logout", {
        headers: { Authorization: `Bearer ${token}` },
      });
    }
  } catch (error) {
    console.error({ error });
  } finally {
    cookiesStore.delete("accessToken");
    cookiesStore.delete("refreshToken");
  }
  return NextResponse.redirect(new URL("/login", request.url));
}
