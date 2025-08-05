import { Icon } from "@iconify/react";
import { secureFetch } from "@/lib/axios";

export async function Valoration({ fairId }: { fairId: string }) {
  const evaluations = await secureFetch<Evaluation[]>({
    url: `/fairs/${fairId}/evaluations`,
    method: "GET",
  });

  const average =
    evaluations.reduce((acc, evaluation) => acc + evaluation.score, 0) /
    evaluations.length;

  const percentage = average * 10;

  return (
    <div className="flex flex-col gap-8 md:flex-row">
      <div className="flex shrink-0">
        <div
          className="radial-progress mx-auto text-neutral"
          style={
            {
              "--value": percentage,
              "--size": "10rem",
              "--thickness": "1rem",
            } as React.CSSProperties
          }
          role="progressbar"
        >
          <div className="font-bold text-2xl">
            {average.toLocaleString(undefined, { maximumFractionDigits: 1 })} /
            10
          </div>
        </div>
      </div>
      <ul className="divide-y divide-base-200">
        {evaluations.map((evaluation) => (
          <li
            key={evaluation.id}
            className="flex items-start p-2 hover:bg-base-100"
          >
            <span className="mr-3 shrink-0 rounded-full bg-secondary p-1 text-secondary-content">
              <Icon icon="tabler:star" className="size-3" />
            </span>

            <p className="whitespace-pre-line text-sm">
              <b>{evaluation.score}/10.</b> {evaluation.explanation}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
