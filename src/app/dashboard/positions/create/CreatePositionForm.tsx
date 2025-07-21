"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { Notyf } from "notyf";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { SubmitButton } from "@/components/SubmitButton";
import { createPosition } from "./createPosition";
import { defaultValues, schema } from "./form";

export default function CreatePositionForm() {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onBlur",
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    const notyf = new Notyf();
    const result = await createPosition(data);
    if (result.success) {
      notyf.success(result.message);
      form.reset();
    } else {
      notyf.error(result.message);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      {/* Campo Nombre */}
      <div>
        <label htmlFor="name" className="label-text">
          Nombre *
        </label>
        <input
          type="text"
          id="name"
          className={`input ${form.formState.errors.name ? "is-invalid" : ""}`}
          placeholder="Nombre del cargo..."
          {...form.register("name")}
        />
        <span className="helper-text">
          {form.formState.errors.name?.message}
        </span>
      </div>

      {/* Campo Descripción */}
      <div>
        <label htmlFor="description" className="label-text">
          Descripción
        </label>
        <textarea
          id="description"
          className={`textarea ${form.formState.errors.description ? "is-invalid" : ""}`}
          rows={5}
          placeholder="Describa el cargo..."
          {...form.register("description")}
        />
        <span className="helper-text">
          {form.formState.errors.description?.message}
        </span>
      </div>

      <SubmitButton>
        <Icon icon="tabler:check" className="size-5" /> Crear Cargo
      </SubmitButton>
    </form>
  );
}
