import { secureFetch } from "@/lib/axios";

export default async function RecommendationsTable({
  fairId,
}: {
  fairId: string;
}) {
  const recommendations = await secureFetch<Recommendation[]>({
    url: `/fairs/${fairId}/recommendations`,
    method: "GET",
  });

  return (
    <ul className="divide-y divide-base-200">
      {recommendations.map((recommendation) => (
        <li key={recommendation.id} className="p-4 hover:bg-base-100">
          <p className="whitespace-pre-line text-sm">
            {recommendation.content}
          </p>
        </li>
      ))}
    </ul>
  );
}
