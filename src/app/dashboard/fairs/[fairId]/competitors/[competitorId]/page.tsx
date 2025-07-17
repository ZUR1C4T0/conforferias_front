import { Icon } from "@iconify/react";
import Link from "next/link";
import { secureFetch } from "@/lib/axios";

export default async function CompetitorDetailsPage({
  params,
}: NextPageContext) {
  const { competitorId } = await params;
  const competitor = await secureFetch<Competitor>({
    url: `/competitors/${competitorId}`,
    method: "GET",
  });

  return (
    <div className="space-y-6">
      {/* Header con botones de navegación */}
      <div className="flex items-center gap-4">
        <Link href="../" className="btn btn-secondary btn-soft btn-circle">
          <Icon icon="tabler:arrow-left" className="size-5" />
        </Link>
        <h1 className="grow font-semibold text-xl sm:text-3xl">
          Detalles del Competidor
        </h1>
        <Link href={`./${competitor.id}/edit`} className="btn btn-primary">
          <Icon icon="tabler:edit" className="size-5" /> Editar
        </Link>
      </div>

      {/* Grid principal de dos columnas */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Columna izquierda - Información básica */}
        <div className="card card-border">
          <div className="card-header">
            <h2 className="card-title">Información General</h2>
          </div>
          <div className="card-body grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="col-span-full">
              <h3 className="font-medium text-base-content/60 text-sm">
                Empresa
              </h3>
              <p className="text-base">{competitor.company}</p>
            </div>

            <div>
              <h3 className="font-medium text-base-content/60 text-sm">País</h3>
              <p className="text-base">{competitor.country}</p>
            </div>

            {competitor.city && (
              <div>
                <h3 className="font-medium text-base-content/60 text-sm">
                  Ciudad
                </h3>
                <p className="text-base">{competitor.city}</p>
              </div>
            )}

            <div className="col-span-full">
              <h3 className="font-medium text-base-content/60 text-sm">
                Productos destacados
              </h3>
              <p className="text-base">{competitor.featuredProducts}</p>
            </div>
          </div>
        </div>

        {/* Columna derecha - Análisis competitivo */}
        <div className="space-y-6">
          {/* Tarjeta de fortalezas */}
          <div className="card card-border">
            <div className="card-header bg-success/10">
              <h2 className="card-title flex items-center gap-2 text-success">
                <Icon icon="tabler:thumb-up" className="size-5" /> Fortalezas
              </h2>
            </div>
            <div className="card-body pt-5">
              <p className="whitespace-pre-line">{competitor.strengths}</p>
            </div>
          </div>

          {/* Tarjeta de debilidades */}
          <div className="card card-border">
            <div className="card-header bg-error/10">
              <h2 className="card-title flex items-center gap-2 text-error">
                <Icon icon="tabler:thumb-down" className="size-5" /> Debilidades
              </h2>
            </div>
            <div className="card-body pt-5">
              <p className="whitespace-pre-line">{competitor.weaknesses}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
