import { Icon } from "@iconify/react";
import Link from "next/link";
import { secureFetch } from "@/lib/axios";
import EditCompetitorForm from "./EditCompetitorForm";

export default async function EditCompetitorPage({ params }: NextPageContext) {
  const { competitorId } = await params;
  const competitor = await secureFetch<Competitor>({
    url: `/competitors/${competitorId}`,
    method: "GET",
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="./" className="btn btn-secondary btn-soft btn-circle">
          <Icon icon="tabler:arrow-left" className="size-5" />
        </Link>
        <h1 className="font-semibold text-xl sm:text-3xl">Editar Competidor</h1>
      </div>

      <EditCompetitorForm competitor={competitor} />
    </div>
  );
}
