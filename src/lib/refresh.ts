import { isAxiosError } from "axios";
import { axiosInstance } from "./axios";

export async function refresh(refreshToken: string) {
  try {
    const { data } = await axiosInstance.post("/auth/refresh", {
      refreshToken,
    });
    return data.accessToken as string;
  } catch (error) {
    console.error("Error refreshing token:");
    if (isAxiosError(error)) {
      console.error(error.response);
    } else {
      console.error(error);
    }
    return null;
  }
}
