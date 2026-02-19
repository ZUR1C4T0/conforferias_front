import "server-only";
import type { AxiosRequestConfig } from "axios";
import axios, { HttpStatusCode, isAxiosError } from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { refresh } from "./refresh";

export const axiosInstance = axios.create({
  adapter: "fetch",
  baseURL: process.env.BACKEND_URL,
});

export async function secureFetch<T = unknown>(
  config: AxiosRequestConfig,
): Promise<T> {
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get("accessToken")?.value;
  const refreshToken = cookiesStore.get("refreshToken")?.value;

  if (!accessToken && !refreshToken) {
    redirect("/login");
  }

  try {
    const response = await axiosInstance.request({
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    if (!isAxiosError(error)) throw error;
    if (
      error.response?.status === HttpStatusCode.Unauthorized &&
      refreshToken
    ) {
      const newAccessToken = await refresh(refreshToken);
      if (!newAccessToken) {
        redirect("/login");
      }
      try {
        const retry = await axiosInstance({
          ...config,
          headers: {
            ...config.headers,
            Authorization: `Bearer ${newAccessToken}`,
          },
        });
        return retry.data;
      } catch {
        redirect("/login");
      }
    }

    console.error(error.response?.data);
    throw error.response;
  }
}
