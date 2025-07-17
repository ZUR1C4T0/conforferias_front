import { Icon } from "@iconify/react";
import { secureFetch } from "@/lib/axios";
import { DafoType } from "@/lib/constants";

const typeConfig = {
  [DafoType.DEBILIDAD]: {
    title: "Debilidades",
    icon: "tabler:alert-circle",
    color: "error",
    bgColor: "bg-error/10",
  },
  [DafoType.AMENAZA]: {
    title: "Amenazas",
    icon: "tabler:alert-triangle",
    color: "warning",
    bgColor: "bg-warning/10",
  },
  [DafoType.FORTALEZA]: {
    title: "Fortalezas",
    icon: "tabler:thumb-up",
    color: "success",
    bgColor: "bg-success/10",
  },
  [DafoType.OPORTUNIDAD]: {
    title: "Oportunidades",
    icon: "tabler:bolt",
    color: "info",
    bgColor: "bg-info/10",
  },
};

export default async function DAFOTable({ fairId }: { fairId: string }) {
  const dafoData = await secureFetch<DAFO[]>({
    url: `/fairs/${fairId}/dafo`,
    method: "GET",
  });

  const groupedDafo = dafoData.reduce(
    (acc, item) => {
      acc[item.type].push(item);
      return acc;
    },
    {
      [DafoType.DEBILIDAD]: [],
      [DafoType.AMENAZA]: [],
      [DafoType.FORTALEZA]: [],
      [DafoType.OPORTUNIDAD]: [],
    } as Record<DafoType, DAFO[]>,
  );

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {(Object.keys(typeConfig) as DafoType[]).map((type) => (
        <div key={type} className="card card-border">
          <div className={`card-header ${typeConfig[type].bgColor}`}>
            <div className="flex items-center gap-2">
              <Icon
                icon={typeConfig[type].icon}
                className={`text-${typeConfig[type].color} size-5`}
              />
              <h2 className="card-title">{typeConfig[type].title}</h2>
            </div>
          </div>
          <div className="card-body p-0">
            {groupedDafo[type].length === 0 ? (
              <div className="p-4 text-center text-base-content/50">
                No hay {typeConfig[type].title.toLowerCase()} registradas
              </div>
            ) : (
              <ul className="divide-y divide-base-200">
                {groupedDafo[type].map((item) => (
                  <li key={item.id} className="p-4 hover:bg-base-100">
                    <p className="whitespace-pre-line">{item.description}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
