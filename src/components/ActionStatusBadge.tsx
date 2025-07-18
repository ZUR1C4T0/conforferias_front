import { Icon } from "@iconify/react";
import { ActionStatus } from "@/lib/constants";

export function ActionStatusBadge({ status }: { status: ActionStatus }) {
  const statusConfig = {
    [ActionStatus.PENDIENTE]: {
      label: "Pendiente",
      icon: "tabler:clock",
      color: "warning",
    },
    [ActionStatus.EN_PROGRESO]: {
      label: "En progreso",
      icon: "tabler:progress",
      color: "info",
    },
    [ActionStatus.COMPLETADA]: {
      label: "Completada",
      icon: "tabler:circle-check",
      color: "success",
    },
    [ActionStatus.CANCELADA]: {
      label: "Cancelada",
      icon: "tabler:circle-x",
      color: "error",
    },
  };

  return (
    <span className={`badge badge-${statusConfig[status].color}`}>
      <Icon icon={statusConfig[status].icon} className="mr-1 size-3.5" />
      {statusConfig[status].label}
    </span>
  );
}
