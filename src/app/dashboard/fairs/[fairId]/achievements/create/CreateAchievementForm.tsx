"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { Notyf } from "notyf";
import { useForm } from "react-hook-form";
import type z from "zod";
import { SubmitButton } from "@/components/SubmitButton";
import { createAchievement } from "./createAchievement";
import { schema } from "./form";

export default function CreateAchievementForm({ fairId }: { fairId: string }) {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { content: "" },
    mode: "onSubmit",
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    const notyf = new Notyf();
    const result = await createAchievement(fairId, data);
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
              Descripción del logro *
            </label>
            <textarea
              id="content"
              className={`textarea ${form.formState.errors.content ? "is-invalid" : ""}`}
              rows={5}
              placeholder="Describa el logro obtenido en la feria..."
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
            <Icon icon="tabler:check" className="size-5" /> Crear Logro
          </SubmitButton>
        </form>
      </div>
    </div>
  );
}
