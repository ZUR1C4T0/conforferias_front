"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { axiosInstance } from "@/lib/axios";

export async function logout() {
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
  redirect("/login");
}
