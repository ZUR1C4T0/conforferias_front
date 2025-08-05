import { Icon } from "@iconify/react";
import Link from "next/link";
import AchievementsTable from "./AchievementsTable";
import CompetitorsTable from "./CompetitorsTable";
import ContactsTable from "./ContactsTable";
import DAFOTable from "./DAFOTable";
import EvaluateFair from "./EvaluateFair";
import ImprovementAreasTable from "./ImprovementAreasTable";
import TrendsTable from "./TrendsTable";

export default function FairPageRep({ fair }: { fair: Fair }) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* --- Contactos --- */}
      <div className="card card-border col-span-full">
        <div className="card-header flex gap-2">
          <h2 className="card-title grow">
            <Icon icon="tabler:users-group" className="inline" /> Contactos
          </h2>
          <Link
            href={`./${fair.id}/contacts/create`}
            className="btn btn-success"
          >
            <Icon icon="tabler:plus" className="size-5" />{" "}
            <span className="hidden sm:inline">Crear</span>
          </Link>
        </div>
        <div className="card-body h-80 overflow-y-auto">
          <ContactsTable fairId={fair.id} />
        </div>
      </div>

      {/* --- Competidores --- */}
      <div className="card card-border col-span-full">
        <div className="card-header flex gap-2">
          <h2 className="card-title grow">
            <Icon icon="tabler:buildings" className="inline" /> Competidores
          </h2>
          <Link
            href={`./${fair.id}/competitors/create`}
            className="btn btn-success"
          >
            <Icon icon="tabler:plus" className="size-5" />{" "}
            <span className="hidden sm:inline">Agregar</span>
          </Link>
        </div>
        <div className="card-body h-80 overflow-y-auto">
          <CompetitorsTable fairId={fair.id} />
        </div>
      </div>

      {/* --- DAFO --- */}
      <div className="card card-border col-span-full">
        <div className="card-header flex gap-2">
          <h2 className="card-title grow">
            <Icon icon="tabler:blocks" className="inline" /> DAFO
          </h2>
          <Link href={`./${fair.id}/dafo/create`} className="btn btn-success">
            <Icon icon="tabler:plus" className="size-5" />{" "}
            <span className="hidden sm:inline">Agregar</span>
          </Link>
        </div>
        <div className="card-body">
          <p className="mb-2 text-sm">
            DAFO de la marca Confortfresh en el evento
          </p>
          <DAFOTable fairId={fair.id} />
        </div>
      </div>

      {/* --- Logros --- */}
      <div className="card card-border">
        <div className="card-header flex gap-2">
          <h2 className="card-title grow">
            <Icon icon="tabler:trophy" className="inline" /> Principales logros
          </h2>
          <Link
            href={`./${fair.id}/achievements/create`}
            className="btn btn-success"
          >
            <Icon icon="tabler:plus" className="size-5" />{" "}
            <span className="hidden 2xl:inline">Agregar</span>
          </Link>
        </div>
        <div className="card-body h-80 overflow-y-auto">
          <AchievementsTable fairId={fair.id} />
        </div>
      </div>

      {/* --- Areas de mejora --- */}
      <div className="card card-border">
        <div className="card-header flex gap-2">
          <h2 className="card-title grow">
            <Icon icon="tabler:settings-up" className="inline" /> Areas de
            mejora
          </h2>
          <Link
            href={`./${fair.id}/improvement-areas/create`}
            className="btn btn-success"
          >
            <Icon icon="tabler:plus" className="size-5" />{" "}
            <span className="hidden 2xl:inline">Agregar</span>
          </Link>
        </div>
        <div className="card-body h-80 overflow-y-auto">
          <ImprovementAreasTable fairId={fair.id} />
        </div>
      </div>

      {/* --- Tendencias --- */}
      <div className="card card-border">
        <div className="card-header flex gap-2">
          <h2 className="card-title grow">
            <Icon icon="tabler:trending-up" className="inline" /> Tendencias
            observadas
          </h2>
          <Link href={`./${fair.id}/trends/create`} className="btn btn-success">
            <Icon icon="tabler:plus" className="size-5" />{" "}
            <span className="hidden 2xl:inline">Agregar</span>
          </Link>
        </div>
        <div className="card-body h-80 overflow-y-auto">
          <TrendsTable fairId={fair.id} />
        </div>
      </div>

      {/* --- Valoración --- */}
      <div className="card card-border">
        <div className="card-header">
          <h2 className="card-title">
            <Icon icon="tabler:stars" className="inline" /> Valoración general
            de la feria
          </h2>
        </div>
        <div className="card-body">
          <EvaluateFair fairId={fair.id} />
        </div>
      </div>
    </div>
  );
}
