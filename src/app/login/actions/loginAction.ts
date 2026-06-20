"use server";
import { HttpStatusCode, isAxiosError } from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { axiosInstance } from "@/lib/axios";

export type LoginState = {
  error?: string;
} | null;

export async function loginAction(_prevState: LoginState, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  try {
    const { data } = await axiosInstance.post("/auth/login", {
      email,
      password,
    });
    const cookiesStore = await cookies();
    cookiesStore.set("accessToken", data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 1,
      path: "/",
    });
    cookiesStore.set("refreshToken", data.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 5,
      path: "/",
    });
  } catch (error) {
    if (
      isAxiosError(error) &&
      error.response?.status === HttpStatusCode.Unauthorized
    ) {
      return { error: "Credenciales inválidas" };
    }
    return { error: "Error inesperado durante el inicio de sesión" };
  }
  redirect("/dashboard/fairs");
}
