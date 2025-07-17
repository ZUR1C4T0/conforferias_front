import { secureFetch } from "@/lib/axios";

export default async function TrendsTable({ fairId }: { fairId: string }) {
  const trends = await secureFetch<Trend[]>({
    url: `/fairs/${fairId}/trends`,
    method: "GET",
  });

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <tbody>
          {trends.length === 0 ? (
            <tr>
              <td className="py-8 text-center text-base-content/50">
                No se han registrado tendencias para esta feria
              </td>
            </tr>
          ) : (
            trends.map((trend) => (
              <tr key={trend.id} className="row-hover">
                <td>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-base">{trend.title}</h3>
                    {trend.details && (
                      <p className="whitespace-pre-line text-base-content/80">
                        {trend.details}
                      </p>
                    )}
                  </div>
                </td>
                {/* <td>
                  <button
                    type="button"
                    className="btn btn-sm btn-primary btn-soft"
                  >
                    <Icon icon="tabler:pencil" className="size-5" />
                  </button>
                </td> */}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
