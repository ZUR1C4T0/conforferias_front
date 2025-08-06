import { secureFetch } from "@/lib/axios";
import EvaluateForm from "./EvaluateForm";

export default async function EvaluateFair({ fairId }: { fairId: string }) {
  let evaluation: Evaluation | null = null;
  try {
    evaluation = await secureFetch<Evaluation | null>({
      url: `/fairs/${fairId}/evaluations/own`,
      method: "GET",
    });
  } catch {
    evaluation = null;
  }

  return (
    <div className="overflow-x-auto">
      <EvaluateForm fairId={fairId} evaluation={evaluation} />
    </div>
  );
}
