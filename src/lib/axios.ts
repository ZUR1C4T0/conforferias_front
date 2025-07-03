import type { AxiosRequestConfig } from "axios";
import axios, { HttpStatusCode, isAxiosError } from "axios";
import { cookies } from "next/headers";

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

  if (!accessToken || !refreshToken) {
    throw new Error("Sin sesión activa");
  }

  try {
    const response = await axiosInstance({
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    if (
      isAxiosError(error) &&
      error.response?.status === HttpStatusCode.Unauthorized
    ) {
      try {
        const { data } = await axiosInstance.post("/auth/refresh", {
          refreshToken,
        });
        cookiesStore.set("accessToken", data.accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 60 * 60 * 1, // One hour
          path: "/",
        });
        const retry = await axiosInstance({
          ...config,
          headers: {
            ...config.headers,
            Authorization: `Bearer ${data.accessToken}`,
          },
        });
        return retry.data;
      } catch {
        throw new Error("SESSION_EXPIRED");
      }
    }
    throw error;
  }
}
