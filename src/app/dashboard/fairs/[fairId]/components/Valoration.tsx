import { Star } from "lucide-react";
import { secureFetch } from "@/lib/axios";

export async function Valoration({ fairId }: { fairId: string }) {
  const evaluations = await secureFetch<Evaluation[]>({
    url: `/fairs/${fairId}/evaluations`,
    method: "GET",
  });
  const hasEvaluations = evaluations && evaluations.length > 0;
  const average = hasEvaluations
    ? evaluations.reduce((acc, evaluation) => acc + evaluation.score, 0) /
      evaluations.length
    : 0;
  const percentage = average * 10;

  return (
    <div className="flex flex-col gap-8 md:flex-row">
      <div className="flex shrink-0 items-center justify-center p-4">
        <RadialProgress value={percentage} average={average} />
      </div>

      <ul className="flex-1 divide-y divide-border">
        {evaluations.map((evaluation) => (
          <li
            key={evaluation.id}
            className="flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-muted/50"
          >
            <div className="flex shrink-0 items-center justify-center rounded-full bg-primary/10 p-1.5 text-primary">
              <Star className="size-4" />
            </div>

            <div className="text-foreground text-sm">
              <span className="font-bold">{evaluation.score}/10. </span>
              <span className="whitespace-pre-line text-muted-foreground">
                {evaluation.explanation}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function RadialProgress({
  value,
  average,
}: {
  value: number;
  average: number;
}) {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="relative flex size-40 items-center justify-center">
      <svg className="size-full -rotate-90 transform" viewBox="0 0 140 140">
        <title>
          {average.toLocaleString(undefined, { maximumFractionDigits: 1 })} / 10
        </title>
        <circle
          cx="70"
          cy="70"
          r={radius}
          className="fill-transparent stroke-muted"
          strokeWidth="12"
        />
        <circle
          cx="70"
          cy="70"
          r={radius}
          className="fill-transparent stroke-primary transition-all duration-500 ease-in-out"
          strokeWidth="12"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center text-foreground">
        <span className="font-bold text-3xl">
          {average.toLocaleString(undefined, { maximumFractionDigits: 1 })}
        </span>
        <span className="text-muted-foreground text-sm">/ 10</span>
      </div>
    </div>
  );
}
