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
        <li key={improvementArea.id} className="p-4 hover:bg-base-100">
          <p className="whitespace-pre-line text-sm">
            {improvementArea.content}
          </p>
        </li>
      ))}
    </ul>
  );
}
