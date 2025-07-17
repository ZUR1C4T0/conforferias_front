import { Icon } from "@iconify/react";
import Link from "next/link";
import CreateCompetitorForm from "./CreateCompetitorForm";

export interface CompetitorProfile {
  id: string;
  name: string;
  description: string | null;
}

export default async function CreateCompetitorPage({
  params,
}: NextPageContext) {
  const { fairId } = await params;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="../" className="btn btn-secondary btn-soft btn-circle">
          <Icon icon="tabler:arrow-left" className="size-5" />
        </Link>
        <h1 className="font-semibold text-xl sm:text-3xl">
          Agregar Competidor
        </h1>
      </div>

      <div className="card card-border">
        <div className="card-body">
          <CreateCompetitorForm fairId={fairId} />
        </div>
      </div>
    </div>
  );
}
