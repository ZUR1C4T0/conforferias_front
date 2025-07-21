import { Icon } from "@iconify/react";
import Link from "next/link";
import { secureFetch } from "@/lib/axios";

export default async function PositionsPage() {
  const positions = await secureFetch<Position[]>({
    url: "/positions",
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-3xl">Cargos</h1>
        <Link href="/dashboard/positions/create" className="btn btn-primary">
          <Icon icon="tabler:plus" className="size-5" /> Crear cargo
        </Link>
      </div>

      <div className="space-y-4">
        {positions.length === 0 ? (
          <div className="card">
            <div className="card-body justify-center">
              <p className="text-center text-base-content/50">
                No hay cargos disponibles
              </p>
            </div>
          </div>
        ) : (
          positions.map((position) => (
            <Link
              key={position.id}
              className="card hover:-translate-y-0.5 transition-transform hover:cursor-pointer hover:bg-base-200"
              href={`/dashboard/positions/${position.id}`}
            >
              <div className="card-body">
                <div className="flex items-center gap-4">
                  <Icon icon="tabler:briefcase-2" className="size-15" />
                  <div className="grow space-y-2">
                    <h2 className="card-title">{position.name}</h2>
                    <span className="badge badge-primary badge-soft rounded-full">
                      Detalles
                      <Icon icon="tabler:arrow-right" className="size-5" />
                    </span>
                  </div>
                  <span className="badge badge-primary rounded-full" title="Usuarios">
                    <Icon icon="tabler:user" className="size-5" />{" "}
                    {position._count.users}
                  </span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}
