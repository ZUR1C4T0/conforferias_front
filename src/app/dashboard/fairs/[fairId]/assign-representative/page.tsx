import { Icon } from "@iconify/react";
import Link from "next/link";
import { secureFetch } from "@/lib/axios";
import AssignRepsForm from "./components/AssignRepsForm";

export default async function AssignRepresentativePage({
  params,
}: NextPageContext) {
  const { fairId } = await params;
  const representatives = await secureFetch<Representative[]>({
    url: `/fairs/${fairId}/representatives`,
    method: "GET",
  });
  const users = await secureFetch<User[]>({
    url: `/users/representatives`,
    method: "GET",
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="./" className="btn btn-secondary btn-soft btn-circle">
          <Icon icon="tabler:arrow-left" className="size-5" />
        </Link>
        <h1 className="font-semibold text-xl sm:text-3xl">
          Asignar representantes
        </h1>
      </div>

      <div className="card card-border">
        <div className="card-body">
          <AssignRepsForm users={users} representatives={representatives} />
        </div>
      </div>
    </div>
  );
}
