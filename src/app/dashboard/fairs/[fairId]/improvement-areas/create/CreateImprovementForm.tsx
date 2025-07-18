"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { Notyf } from "notyf";
import { useForm } from "react-hook-form";
import z from "zod";
import { SubmitButton } from "@/components/SubmitButton";
import { createImprovement } from "./createImprovement";

export const schema = z.object({
  content: z
    .string()
    .trim()
    .nonempty("La descripción es obligatoria")
    .max(1000, "Máximo 1000 caracteres"),
});

export default function CreateImprovementForm({ fairId }: { fairId: string }) {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      content: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    const notyf = new Notyf();
    const result = await createImprovement(fairId, data);
    if (result.success) {
      notyf.success(result.message);
      form.reset();
    } else {
      notyf.error(result.message);
    }
  };

  return (
    <div className="card card-border">
      <div className="card-body">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="content" className="label-text">
              Descripción del área de mejora
            </label>
            <textarea
              id="content"
              className={`textarea ${form.formState.errors.content ? "is-invalid" : ""}`}
              rows={5}
              placeholder="Describa las oportunidades de mejora identificadas..."
              {...form.register("content")}
            />
            <div className="mt-1 flex justify-between">
              {form.formState.errors.content ? (
                <span className="helper-text text-error">
                  {form.formState.errors.content.message}
                </span>
              ) : (
                <span className="helper-text">
                  Mínimo 1 carácter, máximo 1000
                </span>
              )}
              <span className="text-base-content/50 text-sm">
                {form.watch("content")?.length || 0}/1000
              </span>
            </div>
          </div>

          <SubmitButton>
            <Icon icon="tabler:check" className="size-5" /> Registrar Mejora
          </SubmitButton>
        </form>
      </div>
    </div>
  );
}
