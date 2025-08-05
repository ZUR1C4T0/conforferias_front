import { Icon } from "@iconify/react";
import { secureFetch } from "@/lib/axios";

export default async function ImprovementAreasTable({
  fairId,
}: {
  fairId: string;
}) {
  const improvementAreas = await secureFetch<ImprovementArea[]>({
    url: `/fairs/${fairId}/improvements`,
    method: "GET",
  });

  return (
    <ul className="divide-y divide-base-200">
      {improvementAreas.map((improvementArea) => (
        <li
          key={improvementArea.id}
          className="flex items-start p-2 hover:bg-base-100"
        >
          <span className="mr-3 shrink-0 rounded-full bg-warning p-1 text-warning-content">
            <Icon icon="tabler:alert-triangle" className="size-3" />
          </span>
          <p className="whitespace-pre-line text-sm">
            {improvementArea.content}
          </p>
        </li>
      ))}
    </ul>
  );
}
