"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { Notyf } from "notyf";
import { useForm } from "react-hook-form";
import z from "zod";
import { SubmitButton } from "@/components/SubmitButton";
import { DafoType } from "@/lib/constants";
import { createDafoElement } from "./createDafoElement";

export const schema = z.object({
  type: z.enum(DafoType, "Seleccione un tipo"),
  description: z
    .string()
    .trim()
    .nonempty("La descripción no puede estar vacía"),
});

const defaultValues: z.infer<typeof schema> = {
  type: "" as DafoType,
  description: "",
};

export default function CreateDafoForm({ fairId }: { fairId: string }) {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onBlur",
  });

  const typeIcons = {
    [DafoType.DEBILIDAD]: "tabler:alert-circle",
    [DafoType.AMENAZA]: "tabler:alert-triangle",
    [DafoType.FORTALEZA]: "tabler:thumb-up",
    [DafoType.OPORTUNIDAD]: "tabler:bolt",
  };

  const typeColorClasses = {
    [DafoType.DEBILIDAD]: "peer-checked:border-error peer-checked:bg-error/10",
    [DafoType.AMENAZA]:
      "peer-checked:border-warning peer-checked:bg-warning/10",
    [DafoType.FORTALEZA]:
      "peer-checked:border-success peer-checked:bg-success/10",
    [DafoType.OPORTUNIDAD]: "peer-checked:border-info peer-checked:bg-info/10",
  };

  const typeTextClasses = {
    [DafoType.DEBILIDAD]: "text-error",
    [DafoType.AMENAZA]: "text-warning",
    [DafoType.FORTALEZA]: "text-success",
    [DafoType.OPORTUNIDAD]: "text-info",
  };

  const onSubmit = async (data: z.infer<typeof schema>) => {
    const notyf = new Notyf();
    const result = await createDafoElement(fairId, data);
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
          {/* Selección de tipo DAFO */}
          <div>
            <span className="label-text">Tipo DAFO</span>
            <ul className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {Object.values(DafoType).map((type) => (
                <li key={type}>
                  <label className="flex flex-col items-center">
                    <input
                      type="radio"
                      className="peer hidden"
                      value={type}
                      {...form.register("type")}
                    />
                    <div
                      className={`card card-border w-full cursor-pointer ${typeColorClasses[type]}`}
                    >
                      <div className="card-body p-4 text-center">
                        <Icon
                          icon={typeIcons[type]}
                          className={`mx-auto size-6 ${typeTextClasses[type]}`}
                        />
                        <span className="mt-2 capitalize">
                          {type.toLowerCase()}
                        </span>
                      </div>
                    </div>
                  </label>
                </li>
              ))}
            </ul>
            <span className="helper-text text-error">
              {form.formState.errors.type?.message}
            </span>
          </div>

          {/* Campo Descripción */}
          <div>
            <label htmlFor="description" className="label-text">
              Descripción *
            </label>
            <textarea
              id="description"
              className={`textarea ${form.formState.errors.description ? "is-invalid" : ""}`}
              rows={5}
              placeholder="Describa el elemento DAFO..."
              {...form.register("description")}
            />
            <span className="helper-text text-error">
              {form.formState.errors.description?.message}
            </span>
          </div>

          <SubmitButton>
            <Icon icon="tabler:check" className="size-5" /> Crear Elemento
          </SubmitButton>
        </form>
      </div>
    </div>
  );
}
