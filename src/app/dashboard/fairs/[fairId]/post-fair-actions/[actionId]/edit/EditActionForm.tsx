"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { Notyf } from "notyf";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { ActionStatus } from "@/lib/constants";
import { updatePostFairAction } from "./updatePostFairAction";

export const schema = z.object({
  limitDate: z.string().nonempty("Fecha límite requerida"),
  status: z.enum(ActionStatus),
});

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

export default function EditActionForm({
  action,
  fairId,
}: {
  action: PostFairAction;
  fairId: string;
}) {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      limitDate: action.limitDate.split("T")[0], // Formato YYYY-MM-DD
      status: action.status,
    },
    mode: "onBlur",
  });

  useEffect(() => {
    form.reset({
      limitDate: action.limitDate.split("T")[0], // Formato YYYY-MM-DD
      status: action.status,
    });
  }, [action, form.reset]);

  const onSubmit = async (data: z.infer<typeof schema>) => {
    const notyf = new Notyf();
    const result = await updatePostFairAction(action.id, data);
    if (result.success) {
      notyf.success(result.message);
      router.push("../../");
    } else {
      notyf.error(result.message);
    }
  };

  return (
    <div className="card card-border">
      <div className="card-header">
        <h2 className="card-title">{action.action}</h2>
      </div>
      <div className="card-body">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Campo Fecha Límite */}
          <div>
            <label htmlFor="limitDate" className="label-text">
              Fecha límite *
            </label>
            <input
              type="date"
              id="limitDate"
              className={`input ${form.formState.errors.limitDate ? "is-invalid" : ""}`}
              {...form.register("limitDate")}
            />
            <span className="helper-text text-error">
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

          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={form.formState.isSubmitting || !form.formState.isDirty}
          >
            {form.formState.isSubmitting ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              <>
                <Icon icon="tabler:check" className="size-5" /> Guardar Cambios
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
