import { secureFetch } from "@/lib/axios";

export async function CompetitorsTableMercadeo({ fairId }: { fairId: string }) {
  const competitors = await secureFetch<Competitor[]>({
    url: `/fairs/${fairId}/competitors`,
    method: "GET",
  });

  return (
    <table className="table">
      <tbody>
        {competitors.length === 0 && (
          <tr>
            <td className="text-center">No hay competidores registrados</td>
          </tr>
        )}
        {competitors.map((competitor) => (
          <tr key={competitor.id}>
            <td className="px-0 sm:px-5">
              <div className="flex flex-col gap-3 text-wrap">
                <div>
                  <span className="font-light text-gray-500 text-xs">
                    {competitor.city && `${competitor.city}, `}
                    {competitor.country}
                  </span>
                  <h3 className="mt-1 font-bold text-gray-800 text-xl">
                    {competitor.company}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {competitor.featuredProducts}
                </p>
                <div className="my-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-lg bg-success-content p-3">
                    <h4 className="mb-2 font-semibold text-sm text-success">
                      Fortalezas
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {competitor.strengths}
                    </p>
                  </div>

                  <div className="rounded-lg bg-error-content p-3">
                    <h4 className="mb-2 font-semibold text-error text-sm">
                      Debilidades
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {competitor.weaknesses}
                    </p>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
