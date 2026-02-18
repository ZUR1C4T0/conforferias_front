import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";
import { axiosInstance } from "@/lib/axios";

export async function GET(_: NextRequest) {
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
  return redirect("/login");
}
