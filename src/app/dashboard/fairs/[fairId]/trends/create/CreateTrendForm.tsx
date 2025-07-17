"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { Notyf } from "notyf";
import { useForm } from "react-hook-form";
import z from "zod";
import { SubmitButton } from "@/components/SubmitButton";
import { createTrend } from "./createTrend";

export const schema = z.object({
  title: z
    .string()
    .min(1, "El título es obligatorio")
    .max(100, "Máximo 100 caracteres"),
  details: z.string().nullable(),
});

const defaultValues: z.infer<typeof schema> = {
  title: "",
  details: null,
};

export default function CreateTrendForm({ fairId }: { fairId: string }) {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onBlur",
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    const notyf = new Notyf();
    const result = await createTrend(fairId, data);
    if (result.success) {
      notyf.success(result.message);
      router.push("../");
    } else {
      notyf.error(result.message);
    }
  };

  return (
    <div className="card card-border">
      <div className="card-body">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Campo Título */}
          <div>
            <label htmlFor="title" className="label-text">
              Título
            </label>
            <input
              type="text"
              id="title"
              className={`input ${form.formState.errors.title ? "is-invalid" : ""}`}
              {...form.register("title")}
            />
            <span className="helper-text">
              {form.formState.errors.title?.message}
            </span>
          </div>

          {/* Campo Detalles */}
          <div>
            <label htmlFor="details" className="label-text">
              Detalles (Opcional)
            </label>
            <textarea
              id="details"
              className={`textarea ${form.formState.errors.details ? "is-invalid" : ""}`}
              rows={5}
              placeholder="Describa la tendencia observada..."
              {...form.register("details")}
            />
            <span className="helper-text">
              {form.formState.errors.details?.message}
            </span>
          </div>

          <SubmitButton>
            <Icon icon="tabler:check" className="size-5" /> Crear Tendencia
          </SubmitButton>
        </form>
      </div>
    </div>
  );
}
