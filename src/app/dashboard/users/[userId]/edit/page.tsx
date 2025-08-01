import { Icon } from "@iconify/react";
import Link from "next/link";
import { secureFetch } from "@/lib/axios";
import { EditUserForm } from "./EditUserForm";

export default async function EditUserPage({ params }: NextPageContext) {
  const { userId } = await params;
  const user = await secureFetch<User>({
    url: `/users/${userId}`,
    method: "GET",
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="../" className="btn btn-secondary btn-soft btn-circle">
          <Icon icon="tabler:arrow-left" className="size-5" />
        </Link>
        <h1 className="font-semibold text-xl sm:text-3xl">Editar usuario</h1>
      </div>

      <div className="card card-border">
        <div className="card-body">
          <EditUserForm user={user} />
        </div>
      </div>
    </div>
  );
}
