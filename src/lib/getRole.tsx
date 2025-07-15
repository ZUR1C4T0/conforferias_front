import "server-only";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getRole(): Promise<Role> {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("accessToken")?.value;
  if (!token) {
    return redirect("/login");
  }
  const payload = jwtDecode<JwtPayload>(token);
  return payload.role;
}
