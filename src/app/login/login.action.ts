"use server";

import { isAxiosError } from "axios";
import { cookies } from "next/headers";
import { RedirectType, redirect } from "next/navigation";
import { axiosInstance } from "@/lib/axios";

export async function login(formData: FormData): Promise<string | undefined> {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const { data } = await axiosInstance.post("/auth/login", {
      email,
      password,
    });

    const cookiesStore = await cookies();
    cookiesStore.set("accessToken", data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 1, // One hour
      path: "/",
    });
    cookiesStore.set("refreshToken", data.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 5, // Five days
      path: "/",
    });
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      return "Credenciales incorrectas";
    }
    return "Ocurrió un error inesperado durante el inicio de sesión.";
  }

  // `redirect` no se puede usar dentro de un try/catch
  redirect("/dashboard", RedirectType.push);
}
