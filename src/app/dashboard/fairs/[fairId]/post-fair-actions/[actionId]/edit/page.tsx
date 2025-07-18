import { Icon } from "@iconify/react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { secureFetch } from "@/lib/axios";
import EditActionForm from "./EditActionForm";

export default async function EditActionPage({ params }: NextPageContext) {
  const { fairId, actionId } = await params;

  const actions = await secureFetch<PostFairAction[]>({
    url: `/fairs/${fairId}/post-fair-actions`,
    method: "GET",
  });

  const action = actions.find((action) => action.id === actionId);
  if (!action) return notFound();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="../" className="btn btn-secondary btn-soft btn-circle">
          <Icon icon="tabler:arrow-left" className="size-5" />
        </Link>
        <h1 className="font-semibold text-xl sm:text-3xl">
          Editar Acción Postferia
        </h1>
      </div>

      <EditActionForm action={action} />
    </div>
  );
}
