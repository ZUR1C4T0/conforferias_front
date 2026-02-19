import { RedirectType, redirect } from "next/navigation";

export default function DashboardPage() {
  return redirect("/dashboard/fairs", RedirectType.replace);
}
