"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { Notyf } from "notyf";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { SubmitButton } from "@/components/SubmitButton";
import { updateEvaluation } from "../actions/updateEvaluation";

export const schema = z.object({
  score: z
    .string()
    .pipe(z.transform((value) => parseInt(value)))
    .pipe(
      z.number().min(1, "Puntuación requerida").max(10, "Puntuación requerida"),
    ),
  explanation: z.string().trim().nonempty("Explicación requerida"),
});

export default function EvaluateForm({
  fairId,
  evaluation,
}: {
  fairId: string;
  evaluation: Evaluation | null;
}) {
  const defaultValues = {
    score: String(evaluation?.score ?? 0),
    explanation: evaluation?.explanation ?? "",
  };
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onSubmit",
  });

  useEffect(() => {
    if (evaluation) {
      form.reset({
        score: String(evaluation.score),
        explanation: evaluation.explanation,
      });
    }
  }, [evaluation, form.reset]);

  const onSubmit = async (data: z.infer<typeof schema>) => {
    const notyf = new Notyf();
    const result = await updateEvaluation(fairId, data);
    if (result.success) {
      notyf.success(result.message);
    } else {
      notyf.error(result.message);
    }
  };

  return (
    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
      <div>
        <span className="mb-1 text-base text-base-content">
          Seleccione una puntuación
        </span>
        <ul className="flex w-full divide-base-content/25 rounded-box border border-base-content/25 *:w-full *:cursor-pointer max-sm:divide-y sm:divide-x">
          {Array.from({ length: 10 }, (_, i) => (
            <li
              // biome-ignore lint/suspicious/noArrayIndexKey: 1
              key={i}
              className="has-checked:bg-primary/50 has-checked:text-primary-content"
            >
              <label className="text-center hover:bg-base-200">
                <input
                  type="radio"
                  className={form.formState.errors.score ? "is-invalid" : ""}
                  value={i + 1}
                  {...form.register("score")}
                  hidden
                />
                <span className="label-text text-sm">{i + 1}</span>
              </label>
            </li>
          ))}
        </ul>
        <span className="helper-text">
          {form.formState.errors.score?.message}
        </span>
      </div>

      <div>
        <label htmlFor="explanation" className="label-text">
          Explicación
        </label>
        <textarea
          id="explanation"
          className={`textarea ${form.formState.errors.explanation ? "is-invalid" : ""}`}
          rows={3}
          placeholder="Escribe una breve explicación..."
          {...form.register("explanation")}
        />
        <span className="helper-text">
          {form.formState.errors.explanation?.message}
        </span>
      </div>

      <SubmitButton>
        <Icon icon="tabler:check" className="size-5" /> Guardar
      </SubmitButton>
    </form>
  );
}
