"use server";

import { isAxiosError } from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { axiosInstance } from "@/lib/axios";

export async function logout() {
  const cookiesStore = await cookies();
  try {
    cookiesStore.delete("accessToken");
    cookiesStore.delete("refreshToken");
    await axiosInstance.delete("/auth/logout");
    axiosInstance.defaults.headers.common.Authorization = undefined;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      cookiesStore.delete("accessToken");
      cookiesStore.delete("refreshToken");
    }
    return;
  }
  redirect("/login");
}
