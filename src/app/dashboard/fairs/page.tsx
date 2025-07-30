import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { secureFetch } from "@/lib/axios";
import { getRole } from "@/lib/getRole";

export default async function FairsPage() {
  const fairs = await secureFetch<Fair[]>({
    url: "/fairs",
  });
  const role = await getRole();
  const canCreateFair = role === "ADMIN" || role === "MERCADEO";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-3xl">Ferias</h1>
        {canCreateFair && (
          <Link href="/dashboard/fairs/create" className="btn btn-primary">
            <Icon icon="tabler:plus" className="size-5" /> Crear feria
          </Link>
        )}
      </div>

      <div className="space-y-4">
        {fairs.length === 0 ? (
          <div className="card">
            <div className="card-body justify-center">
              <p className="text-center text-base-content/50">
                No hay ferias disponibles
              </p>
            </div>
          </div>
        ) : (
          fairs.map((fair) => (
            <Link
              key={fair.id}
              href={`./fairs/${fair.id}`}
              className="card hover:-translate-y-0.5 transition-transform hover:cursor-pointer hover:bg-base-100"
            >
              <div className="card-body">
                <div className="flex items-center gap-4">
                  <Image
                    src={fair.logoUrl}
                    alt={fair.name}
                    className="size-15"
                    width={100}
                    height={100}
                  />
                  <div className="grow space-y-2">
                    <h2 className="card-title">{fair.name}</h2>
                  </div>
                  <span className="badge badge-primary badge-outline rounded-full">
                    Detalles
                    <Icon icon="tabler:arrow-right" className="size-5" />
                  </span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
