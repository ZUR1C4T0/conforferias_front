/** biome-ignore-all lint/a11y/noSvgWithoutTitle: TODO */
import { secureFetch } from "@/lib/axios";
import AchievementsTable from "./AchievementsTable";
import { CompetitorsTableMercadeo } from "./CompetitorsTable.mercadeo";
import DAFOTable from "./DAFOTable";
import ImprovementAreasTable from "./ImprovementAreasTable";
import { ProfileVisitorsGraph } from "./ProfileVisitorsGraph";
import { Valoration } from "./Valoration";
import { VisitorsCitiesGraph } from "./VisitorsCitiesGraph";
import { VisitorsCountryGraph } from "./VisitorsCountryGraph";

interface ApiResponse {
  visitors: {
    total: number;
    national: number;
    international: number;
    countries: {
      country: string;
      count: number;
    }[];
    cities: {
      city: string;
      count: number;
    }[];
    profiles: {
      id: string;
      name: string;
      contacts: number;
    }[];
  };
}

export default async function FairPageMercadeo({ fair }: { fair: Fair }) {
  const { visitors } = await secureFetch<ApiResponse>({
    url: `/fairs/${fair.id}/dashboard`,
    method: "GET",
  });

  return (
    <>
      {/* Primera fila de métricas */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        <div className="card">
          <div className="card-body text-center">
            <div className="font-semibold text-xl">Visitantes Nacionales</div>
            <p className="text-center font-bold text-4xl text-primary">
              {visitors.national}
            </p>
          </div>
        </div>
        <div className="card">
          <div className="card-body text-center">
            <div className="font-semibold text-xl">
              Visitantes Internacionales
            </div>
            <p className="text-center font-bold text-4xl text-accent">
              {visitors.international}
            </p>
          </div>
        </div>
        <div className="card">
          <div className="card-body text-center">
            <div className="font-semibold text-xl">Total de Visitantes</div>
            <p className="text-center font-bold text-4xl text-success">
              {visitors.total}
            </p>
          </div>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Países Visitantes */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Países visitantes</h2>
          </div>
          <div className="card-body">
            <div className="flex h-60 items-end gap-x-2">
              <VisitorsCountryGraph countries={visitors.countries} />
            </div>
          </div>
        </div>

        {/* Ciudades visitantes */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Ciudades visitantes</h2>
          </div>
          <div className="card-body">
            <div className="flex h-60 items-end gap-x-2">
              <VisitorsCitiesGraph cities={visitors.cities} />
            </div>
          </div>
        </div>

        {/* Perfil de visitantes */}
        <div className="card col-span-full">
          <div className="card-header">
            <h2 className="card-title">Perfil de visitantes</h2>
          </div>
          <div className="card-body min-h-32 gap-2">
            <ProfileVisitorsGraph
              profiles={visitors.profiles}
              total={visitors.total}
            />
          </div>
        </div>
      </div>

      {/* Competidores */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Competidores</h2>
        </div>
        <div className="card-body min-h-60">
          <CompetitorsTableMercadeo fairId={fair.id} />
        </div>
      </div>

      {/* DAFO */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Análisis DAFO</h2>
        </div>
        <div className="card-body">
          <DAFOTable fairId={fair.id} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Principales logros */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Principales Logros</h2>
          </div>
          <div className="card-body">
            <AchievementsTable fairId={fair.id} />
          </div>
        </div>

        {/* Áreas de mejora */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Áreas de Mejora</h2>
          </div>
          <div className="card-body">
            <ImprovementAreasTable fairId={fair.id} />
          </div>
        </div>
      </div>

      {/* Valoración general */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Valoración General de la Participación</h2>
        </div>
        <div className="card-body">
          <Valoration fairId={fair.id} />
        </div>
      </div>
    </>
  );
}
