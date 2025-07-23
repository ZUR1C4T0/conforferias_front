export async function refresh(refreshToken: string) {
  try {
    const response = await fetch("/api/auth/refresh", {
      method: "POST",
      body: JSON.stringify({ refreshToken }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const contentType = response.headers.get("Content-Type");
    if (response.ok && contentType?.includes("json")) {
      const { accessToken } = await response.json();
      return accessToken as string;
    }
    throw new Error("Refresh failed");
  } catch {
    return null;
  }
}
