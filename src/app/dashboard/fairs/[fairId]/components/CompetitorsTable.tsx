import { Icon } from "@iconify/react";
import Link from "next/link";
import { secureFetch } from "@/lib/axios";

export default async function CompetitorsTable({ fairId }: { fairId: string }) {
  const competitors = await secureFetch<Competitor[]>({
    url: `/fairs/${fairId}/competitors`,
    method: "GET",
  });

  return (
    <div className="overflow-x-auto">
      <table className="table overflow-x-auto">
        <thead>
          <tr>
            <th>Empresa</th>
            <th>País</th>
            <th>Ciudad</th>
            <th>
              <i>Detalles</i>
            </th>
          </tr>
        </thead>
        <tbody>
          {!competitors.length && (
            <tr>
              <td colSpan={4} className="text-center">
                No hay competidores registrados
              </td>
            </tr>
          )}

          {competitors.map((competitor) => (
            <tr key={competitor.id} className="row-hover">
              <td>{competitor.company}</td>
              <td>{competitor.country}</td>
              <td>{competitor.city || "-"}</td>
              <td>
                <Link
                  href={`./${fairId}/competitors/${competitor.id}`}
                  className="btn btn-info btn-soft"
                >
                  <Icon icon="tabler:arrow-right" className="size-5" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
