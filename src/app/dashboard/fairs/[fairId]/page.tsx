import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { secureFetch } from "@/lib/axios";
import { getRole } from "@/lib/getRole";
import CompetitorsTable from "./CompetitorsTable";
import AchievementsTable from "./components/AchievementsTable";
import ActivitiesTable from "./components/ActivitiesTable";
import ContactsTable from "./components/ContactsTable";
import DAFOTable from "./components/DAFOTable";
import EvaluateFair from "./components/EvaluateFair";
import PostFairActionsTable from "./components/PostFairActionsTable";
import TrendsTable from "./components/TrendsTable";
import ImprovementAreasTable from "./components/ImprovementAreasTable";

export default async function FairPage({ params }: NextPageContext) {
  const role = await getRole();
  const { fairId } = await params;
  const fair = await secureFetch<Fair>({
    url: `/fairs/${fairId}`,
    method: "GET",
  });

  const canAssign = role === "ADMIN" || role === "MERCADEO";
  const canCreate = role === "REPRESENTANTE";

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="col-span-full flex items-start gap-4">
        <Link href="./" className="btn btn-secondary btn-soft btn-circle">
          <Icon icon="tabler:arrow-left" className="size-5" />
        </Link>
        <Image
          src={fair.logoUrl}
          alt={fair.name}
          className="size-10"
          width={100}
          height={100}
        />
        <h1 className="mt-1 grow font-semibold text-3xl">{fair.name}</h1>
        {canAssign && (
          <Link
            href={`./${fairId}/assign-representative`}
            className="btn btn-primary"
          >
            <Icon icon="tabler:users-group" className="size-5" />{" "}
            <span className="hidden sm:inline">Asignar representantes</span>
          </Link>
        )}
      </div>

      {/* <div className="card">
        <div className="card-body">
          <h2 className="card-title">Información general</h2>
          <p></p>
        </div>
      </div> */}

      <div className="card card-border col-span-full">
        <div className="card-header flex gap-2">
          <h2 className="card-title grow">Contactos</h2>
          {canCreate && (
            <Link
              href={`./${fairId}/contacts/create`}
              className="btn btn-primary btn-soft"
            >
              <Icon icon="tabler:plus" className="size-5" />{" "}
              <span className="hidden sm:inline">Crear contacto</span>
            </Link>
          )}
        </div>
        <div className="card-body h-80 overflow-y-auto">
          <ContactsTable fairId={fair.id} />
        </div>
      </div>

      <div className="card card-border">
        <div className="card-header flex gap-2">
          <h2 className="card-title grow">Actividades paralelas</h2>
          {canCreate && (
            <Link
              href={`./${fairId}/activities/create`}
              className="btn btn-primary btn-soft"
            >
              <Icon icon="tabler:plus" className="size-5" />{" "}
              <span className="hidden 2xl:inline">Crear actividad</span>
            </Link>
          )}
        </div>
        <div className="card-body h-80 overflow-y-auto">
          <ActivitiesTable fairId={fair.id} />
        </div>
      </div>

      <div className="card card-border">
        <div className="card-header flex gap-2">
          <h2 className="card-title grow">Tendencias observadas</h2>
          <Link
            href={`./${fairId}/trends/create`}
            className="btn btn-primary btn-soft"
          >
            <Icon icon="tabler:plus" className="size-5" />{" "}
            <span className="hidden 2xl:inline">Registrar tendencia</span>
          </Link>
        </div>
        <div className="card-body h-80 overflow-y-auto">
          <TrendsTable fairId={fair.id} />
        </div>
      </div>

      <div className="card card-border col-span-full">
        <div className="card-header flex gap-2">
          <h2 className="card-title grow">Competidores</h2>
          <Link
            href={`./${fairId}/competitors/create`}
            className="btn btn-primary btn-soft"
          >
            <Icon icon="tabler:plus" className="size-5" />{" "}
            <span className="hidden sm:inline">Registrar competidor</span>
          </Link>
        </div>
        <div className="card-body h-80 overflow-y-auto">
          <CompetitorsTable fairId={fair.id} />
        </div>
      </div>

      <div className="card card-border col-span-full">
        <div className="card-header flex gap-2">
          <h2 className="card-title grow">DAFO</h2>
          <Link
            href={`./${fairId}/dafo/create`}
            className="btn btn-primary btn-soft"
          >
            <Icon icon="tabler:plus" className="size-5" />{" "}
            <span className="hidden sm:inline">Agregar elemento DAFO</span>
          </Link>
        </div>
        <div className="card-body">
          <DAFOTable fairId={fair.id} />
        </div>
      </div>

      <div className="card card-border col-span-full">
        <div className="card-header flex gap-2">
          <h2 className="card-title grow">Acciones Postferia</h2>
          <Link
            href={`./${fairId}/post-fair-actions/create`}
            className="btn btn-primary btn-soft"
          >
            <Icon icon="tabler:plus" className="size-5" />{" "}
            <span className="hidden sm:inline">Crear acción</span>
          </Link>
        </div>
        <div className="card-body h-80 overflow-y-auto">
          <PostFairActionsTable fairId={fair.id} />
        </div>
      </div>

      <div className="card card-border">
        <div className="card-header">
          <h2 className="card-title">Valoración general de la participción</h2>
        </div>
        <div className="card-body">
          <EvaluateFair fairId={fair.id} />
        </div>
      </div>

      <div className="card card-border">
        <div className="card-header flex gap-2">
          <h2 className="card-title grow">Principales logros</h2>
          <Link
            href={`./${fairId}/achievements/create`}
            className="btn btn-primary btn-soft"
          >
            <Icon icon="tabler:plus" className="size-5" />{" "}
            <span className="hidden sm:inline">Crear logro</span>
          </Link>
        </div>
        <div className="card-body h-80 overflow-y-auto">
          <AchievementsTable fairId={fair.id} />
        </div>
      </div>

      <div className="card card-border">
        <div className="card-header flex gap-2">
          <h2 className="card-title grow">Areas de mejora</h2>
          <Link
            href={`./${fairId}/improvement-areas/create`}
            className="btn btn-primary btn-soft"
          >
            <Icon icon="tabler:plus" className="size-5" />{" "}
            <span className="hidden sm:inline">Crear área de mejora</span>
          </Link>
        </div>
        <div className="card-body h-80 overflow-y-auto">
          <ImprovementAreasTable fairId={fair.id} />
        </div>
      </div>

      <div className="card card-border">
        <div className="card-header">
          <h2 className="card-title">
            Recomendaciones para futuras participaciones
          </h2>
        </div>
      </div>
    </div>
  );
}
