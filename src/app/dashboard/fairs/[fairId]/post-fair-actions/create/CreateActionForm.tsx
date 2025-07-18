"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { Notyf } from "notyf";
import { useForm } from "react-hook-form";
import z from "zod";
import { SubmitButton } from "@/components/SubmitButton";
import { ActionStatus } from "@/lib/constants";
import { createPostFairAction } from "./createPostFairAction";

export const schema = z.object({
  action: z.string().trim().nonempty("La acción es obligatoria"),
  limitDate: z.string().nonempty("La fecha límite es obligatoria"),
  status: z.enum(ActionStatus).optional(),
});

const defaultValues: z.infer<typeof schema> = {
  action: "",
  limitDate: "",
  status: ActionStatus.PENDIENTE,
};

const statusOptions = [
  {
    value: ActionStatus.PENDIENTE,
    label: "Pendiente",
    icon: "tabler:clock",
    colorClasses: "has-checked:bg-warning/20 has-checked:text-warning",
  },
  {
    value: ActionStatus.EN_PROGRESO,
    label: "En progreso",
    icon: "tabler:progress",
    colorClasses: "has-checked:bg-info/20 has-checked:text-info",
  },
  {
    value: ActionStatus.COMPLETADA,
    label: "Completada",
    icon: "tabler:circle-check",
    colorClasses: "has-checked:bg-success/20 has-checked:text-success",
  },
  {
    value: ActionStatus.CANCELADA,
    label: "Cancelada",
    icon: "tabler:circle-x",
    colorClasses: "has-checked:bg-error/20 has-checked:text-error",
  },
];

export default function CreateActionForm({ fairId }: { fairId: string }) {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onBlur",
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    const notyf = new Notyf();
    const result = await createPostFairAction(fairId, data);
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
          {/* Campo Acción */}
          <div>
            <label htmlFor="action" className="label-text">
              Descripción
            </label>
            <textarea
              id="action"
              className={`textarea ${form.formState.errors.action ? "is-invalid" : ""}`}
              rows={3}
              placeholder="Describa la acción a realizar..."
              {...form.register("action")}
            />
            <span className="helper-text">
              {form.formState.errors.action?.message}
            </span>
          </div>

          {/* Campo Fecha Límite */}
          <div className="max-w-sm">
            <label htmlFor="limitDate" className="label-text">
              Fecha límite
            </label>
            <input
              type="date"
              id="limitDate"
              className={`input ${form.formState.errors.limitDate ? "is-invalid" : ""}`}
              min={new Date().toISOString().split("T")[0]}
              {...form.register("limitDate")}
            />
            <span className="helper-text">
              {form.formState.errors.limitDate?.message}
            </span>
          </div>

          {/* Campo Estado */}
          <div>
            <div className="label-text">Estado</div>
            <ul className="flex w-full flex-col divide-base-content/25 rounded-box border border-base-content/25 *:w-full *:cursor-pointer max-sm:divide-y sm:flex-row sm:divide-x">
              {statusOptions.map((option) => (
                <li
                  key={option.value}
                  className={
                    "hover:cursor-pointer hover:bg-base-200 active:bg-base-300/25 " +
                    option.colorClasses
                  }
                >
                  <label className="flex items-center gap-2 p-3">
                    <input
                      type="radio"
                      className="ms-2 hidden"
                      value={option.value}
                      {...form.register("status")}
                    />
                    <Icon icon={option.icon} className="size-4" />
                    <span className="label-text text-sm">{option.label}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <SubmitButton>
            <Icon icon="tabler:check" className="size-5" /> Crear Acción
          </SubmitButton>
        </form>
      </div>
    </div>
  );
}
