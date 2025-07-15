import axios, { HttpStatusCode, isAxiosError } from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const contentType = req.headers.get("Content-Type");
  if (!contentType?.includes("multipart/form-data")) {
    return new Response("Invalid content type", { status: 400 });
  }

  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get("accessToken")?.value;
  const refreshToken = cookiesStore.get("refreshToken")?.value;

  if (!accessToken && !refreshToken) {
    return Response.redirect("/login");
  }

  // ✅ Leer el body completo como FormData (compatible con Node.js)
  const formData = await req.formData();

  try {
    const resp = await axios.request({
      method: "POST",
      baseURL: process.env.BACKEND_URL,
      url: "/fairs",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: formData,
    });

    revalidatePath("/dashboard/fairs");
    return new Response(JSON.stringify(resp.data), { status: 200 });
  } catch (error) {
    // 🔄 Si el token expiró, intenta refresh
    if (
      isAxiosError(error) &&
      error.response?.status === HttpStatusCode.Unauthorized
    ) {
      try {
        const refreshResp = await axios.post(
          `${process.env.BACKEND_URL}/auth/refresh`,
          { refreshToken },
        );

        const newAccessToken = refreshResp.data.accessToken;

        // Nota: actualizar cookies desde API route (Next.js) requiere workaround con Response
        const retryResp = await axios.request({
          method: "POST",
          url: `${process.env.BACKEND_URL}/fairs`,
          headers: {
            Authorization: `Bearer ${newAccessToken}`,
          },
          data: formData,
        });

        // Revalidar y devolver la respuesta
        revalidatePath("/dashboard/fairs");
        return new Response(JSON.stringify(retryResp.data), { status: 200 });
      } catch {
        return Response.redirect("/login");
      }
    }

    // Errores generales
    if (isAxiosError(error)) {
      return new Response(JSON.stringify(error.response?.data), {
        status: error.response?.status || 500,
      });
    }

    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
