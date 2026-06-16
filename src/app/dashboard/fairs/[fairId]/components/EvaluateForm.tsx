"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Notyf } from "notyf";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { updateEvaluation } from "../actions/updateEvaluation";

export const schema = z.object({
  score: z
    .string()
    .pipe(z.transform((value) => parseInt(value, 10)))
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

  const currentScore = form.watch("score");

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Field data-invalid={!!form.formState.errors.score}>
          <FieldLabel>Seleccione una puntuación</FieldLabel>
          <ButtonGroup className="scroll w-full overflow-x-auto">
            {Array.from({ length: 10 }, (_, i) => {
              const value = String(i + 1);
              const isChecked = currentScore === value;

              return (
                <Button
                  key={value}
                  variant={isChecked ? "default" : "outline"}
                  className="w-full flex-1"
                  asChild
                >
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      className="sr-only"
                      value={value}
                      {...form.register("score")}
                      aria-invalid={!!form.formState.errors.score}
                    />
                    {value}
                  </label>
                </Button>
              );
            })}
          </ButtonGroup>
          {form.formState.errors.score && (
            <FieldError errors={[form.formState.errors.score]} />
          )}
        </Field>

        <Field data-invalid={!!form.formState.errors.explanation}>
          <FieldLabel htmlFor="explanation">Explicación</FieldLabel>
          <Textarea
            id="explanation"
            placeholder="Escribe una breve explicación..."
            className="min-h-24"
            {...form.register("explanation")}
            aria-invalid={!!form.formState.errors.explanation}
          />
          {form.formState.errors.explanation && (
            <FieldError errors={[form.formState.errors.explanation]} />
          )}
        </Field>

        <Field orientation="horizontal">
          <Button
            type="submit"
            disabled={!form.formState.isDirty || form.formState.isSubmitting}
          >
            {form.formState.isSubmitting && (
              <Spinner data-icon="inline-start" />
            )}
            Guardar
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
