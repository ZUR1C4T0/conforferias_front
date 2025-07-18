import { Icon } from "@iconify/react";
import Link from "next/link";
import { ActionStatusBadge } from "@/components/ActionStatusBadge";
import { secureFetch } from "@/lib/axios";
import { ActionStatus } from "@/lib/constants";
import { formatDate } from "@/utils/formatDate";

export default async function PostFairActionsTable({
  fairId,
}: {
  fairId: string;
}) {
  const actions = await secureFetch<PostFairAction[]>({
    url: `/fairs/${fairId}/post-fair-actions`,
    method: "GET",
  });

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Acción</th>
            <th>Estado</th>
            <th>Fecha Límite</th>
            <th className="text-right">Editar</th>
          </tr>
        </thead>
        <tbody>
          {actions.length === 0 ? (
            <tr>
              <td colSpan={4} className="py-8 text-center">
                <div className="flex flex-col items-center text-base-content/50">
                  <Icon icon="tabler:pencil" className="size-8" />
                  <p className="mt-2">No hay acciones postferia registradas</p>
                </div>
              </td>
            </tr>
          ) : (
            actions.map((action) => (
              <tr
                key={action.id}
                className="transition-colors hover:bg-base-200"
              >
                <td className="max-w-xs">
                  <p className="line-clamp-2">{action.action}</p>
                </td>
                <td>
                  <ActionStatusBadge status={action.status} />
                </td>
                <td>
                  <div className="flex items-center gap-1">
                    <Icon
                      icon="tabler:calendar-due"
                      className="size-4 text-base-content/70"
                    />
                    <span>{formatDate(action.limitDate)}</span>
                  </div>
                  {new Date(action.limitDate) < new Date() &&
                    action.status !== ActionStatus.COMPLETADA && (
                      <span className="badge badge-error badge-xs mt-1">
                        Vencida
                      </span>
                    )}
                </td>
                <td className="text-right">
                  <Link
                    href={`./${fairId}/post-fair-actions/${action.id}/edit`}
                    className="btn btn-primary btn-soft"
                  >
                    <Icon icon="tabler:pencil" className="size-5" />
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
