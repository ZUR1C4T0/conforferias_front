import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");

  const { searchParams } = new URL(request.url);
  const redirectTo = searchParams.get("redirectTo") || "/dashboard/fairs";

  if (accessToken) {
    // If authenticated, redirect to the intended page (e.g., dashboard)
    return redirect(redirectTo);
  } else {
    // If not authenticated, redirect to the login page
    return redirect("/login");
  }
}
