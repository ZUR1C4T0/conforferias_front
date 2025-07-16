"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { Notyf } from "notyf";
import { useForm } from "react-hook-form";
import z from "zod";
import { SubmitButton } from "@/components/SubmitButton";
import { createActivity } from "./createActivity";

export const schema = z.object({
  type: z.enum(
    ["CHARLA_TECNICA", "RUEDA_DE_NEGOCIOS", "OTRO"],
    "Seleccione un tipo de actividad",
  ),
  description: z.string().trim().nonempty("Descripción es obligatoria"),
  attendees: z.number().nullable().optional(),
});

const defaultValues: z.infer<typeof schema> = {
  type: "" as "CHARLA_TECNICA" | "RUEDA_DE_NEGOCIOS" | "OTRO",
  description: "",
  attendees: null,
};

export default function CreateActivityForm({ fairId }: { fairId: string }) {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onSubmit",
  });

  const activityTypeMap: Record<
    "CHARLA_TECNICA" | "RUEDA_DE_NEGOCIOS" | "OTRO",
    string
  > = {
    CHARLA_TECNICA: "Charla técnica",
    RUEDA_DE_NEGOCIOS: "Rueda de negocios",
    OTRO: "Otro",
  };

  const onSubmit = async (data: z.infer<typeof schema>) => {
    const notyf = new Notyf();
    if (!fairId) return;
    const result = await createActivity(fairId, data);
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
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <span className="label-text">Tipo de actividad</span>
            <ul
              className={
                "flex w-full flex-col divide-base-content/25 rounded-box border border-base-content/25 *:w-full *:cursor-pointer max-sm:divide-y sm:flex-row sm:divide-x"
              }
            >
              {Object.entries(activityTypeMap).map(([key, value]) => (
                <li key={key}>
                  <label className="flex cursor-pointer items-center gap-2 p-3 hover:bg-base-content/5 active:bg-base-content/10">
                    <input
                      type="radio"
                      className={
                        "radio radio-primary ms-3" +
                        (form.formState.errors.type ? " is-invalid" : "")
                      }
                      value={key}
                      {...form.register("type")}
                    />
                    <span className="label-text text-base">{value}</span>
                  </label>
                </li>
              ))}
            </ul>
            <span className="helper-text">
              {form.formState.errors.type?.message}
            </span>
          </div>

          <div>
            <label htmlFor="description" className="label-text">
              Descripción
            </label>
            <textarea
              id="description"
              className={`textarea ${form.formState.errors.description ? "is-invalid" : ""}`}
              rows={3}
              {...form.register("description")}
            />
            <span className="helper-text">
              {form.formState.errors.description?.message}
            </span>
          </div>

          <div>
            <label htmlFor="attendees" className="label-text">
              Cuantos asistieron? (Opcional)
            </label>
            <input
              type="number"
              id="attendees"
              className={`input ${form.formState.errors.attendees ? "is-invalid" : ""}`}
              {...form.register("attendees", { valueAsNumber: true })}
            />
            <span className="helper-text">
              {form.formState.errors.attendees?.message}
            </span>
          </div>

          <SubmitButton>
            <Icon icon="tabler:check" className="size-4" /> Guardar Actividad
          </SubmitButton>
        </form>
      </div>
    </div>
  );
}
