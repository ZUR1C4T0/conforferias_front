"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { Notyf } from "notyf";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import countries from "@/assets/countries.json";
import { SubmitButton } from "@/components/SubmitButton";
import { useFlyonUI } from "@/hooks/useFlyonUI";
import { createFair } from "./createFair";

export const schema = z
  .object({
    name: z
      .string()
      .nonempty("El nombre es requerido")
      .max(100, "Máximo 100 caracteres"),
    startDate: z.string().nonempty("La fecha de inicio es requerida"),
    endDate: z.string().nonempty("La fecha de fin es requerida"),
    country: z
      .string()
      .nonempty("El país es requerido")
      .max(100, "Máximo 100 caracteres"),
    city: z.optional(z.string().max(100, "Máximo 100 caracteres")),
    standNumber: z
      .string()
      .nonempty("El número de stand es requerido")
      .max(100, "Máximo 100 caracteres"),
    areaM2: z
      .number({ error: "El área debe ser un número" })
      .positive("El área debe ser mayor a 0")
      .max(1000, "Máximo 1000 m2"),
    totalInvestment: z.optional(
      z.number().min(0, "El monto no puede ser negativo"),
    ),
    logo: z
      .any()
      .refine((files) => files?.length > 0, "El logo es obligatorio")
      .refine(
        (files) => files?.[0]?.type.startsWith("image/"),
        "El logo debe ser una imagen",
      )
      .refine((files) => files?.[0]?.size <= 5 * 1024 * 1024, "Máximo 5MB"),
  })
  .refine((data) => new Date(data.startDate) <= new Date(data.endDate), {
    path: ["endDate"],
    message: "La fecha de fin no puede ser anterior a la de inicio",
  });

const defaultValues: z.infer<typeof schema> = {
  name: "",
  startDate: "",
  endDate: "",
  country: "",
  city: undefined,
  standNumber: "",
  areaM2: NaN,
  totalInvestment: 0,
  logo: undefined,
};

export default function CreateFairform() {
  const router = useRouter();
  const { loaded } = useFlyonUI();
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onBlur",
  });

  useEffect(() => {
    if (loaded) {
      const $combobox = document.getElementById("country-combobox");
      if (!$combobox) return;
      const combobox = window.HSComboBox.getInstance($combobox, true);
      if (!combobox) return;
      if ("element" in combobox) {
        combobox?.element.on("select", ({ country }: { country: string }) => {
          form.clearErrors("country");
          form.setValue("country", country);
        });
      }
    }
  }, [loaded, form]);

  const onSubmit = async (data: z.infer<typeof schema>) => {
    const notyf = new Notyf();
    const result = await createFair(data);
    if (!result.success) {
      return notyf.error(result.message);
    } else {
      notyf.success(result.message);
      router.push("./");
    }
  };

  useEffect(() => {
    if (loaded) {
      const $modal = document.querySelector<HTMLElement>("#create-fair-modal");
      if (!$modal) return;
      const modal = window.HSOverlay.getInstance($modal, true);
      if (!modal) return;
      if ("element" in modal) {
        modal?.element.on("close", () => form.reset());
      }
    }
  }, [loaded, form.reset]);

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-4 lg:grid-cols-2"
    >
      <div>
        <label className="label-text" htmlFor="name">
          Nombre de la feria
        </label>
        <input
          type="text"
          id="name"
          className={`input ${form.formState.errors.name ? "is-invalid" : ""}`}
          {...form.register("name")}
        />
        <span className="helper-text">
          {form.formState.errors.name?.message ?? null}
        </span>
      </div>

      <div>
        <label className="label-text" htmlFor="startDate">
          Fecha de inicio
        </label>
        <input
          type="date"
          id="startDate"
          className={`input ${form.formState.errors.startDate ? "is-invalid" : ""}`}
          {...form.register("startDate")}
        />
        <span className="helper-text">
          {form.formState.errors.startDate?.message ?? null}
        </span>
      </div>

      <div>
        <label className="label-text" htmlFor="endDate">
          Fecha de fin
        </label>
        <input
          type="date"
          id="endDate"
          className={`input ${form.formState.errors.endDate ? "is-invalid" : ""}`}
          {...form.register("endDate")}
        />
        <span className="helper-text">
          {form.formState.errors.endDate?.message ?? null}
        </span>
      </div>

      <div>
        <label className="label-text" htmlFor="country">
          País
        </label>
        <div
          id="country-combobox"
          className="relative"
          data-combo-box='{"minSearchLength":1, "outputEmptyTemplate": "<div class=\"dropdown-item\">No se encontraron resultados...</div>"}'
        >
          <div className="relative">
            <input
              type="text"
              id="country"
              className={`input ${form.formState.errors.country ? "is-invalid" : ""}`}
              placeholder="Buscar país"
              data-combo-box-input
              {...form.register("country")}
            />
            <Icon
              icon="tabler:caret-up-down"
              className="-translate-y-1/2 absolute end-3 top-1/2 size-4 shrink-0 text-base-content"
              data-combo-box-toggle
            />
          </div>
          <div
            className="absolute z-50 max-h-44 w-full space-y-0.5 overflow-y-auto rounded-box bg-base-100 p-2 shadow-base-300/20 shadow-lg"
            style={{ display: "none" }}
            data-combo-box-output
          >
            {countries.map((country) => (
              <div
                key={country}
                className="dropdown-item combo-box-selected:dropdown-active cursor-pointer"
                // biome-ignore lint/a11y/noNoninteractiveTabindex: Es un combobox
                tabIndex={0}
                data-combo-box-output-item
                data-combo-box-item-stored-data={`{"country":"${country}"}`}
              >
                <div className="flex items-center justify-between">
                  <span
                    data-combo-box-search-text={country}
                    data-combo-box-value
                  >
                    {country}
                  </span>
                  <Icon
                    icon="tabler:check"
                    className="combo-box-selected:block hidden size-4 shrink-0 text-primary"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <span className="helper-text">
          {form.formState.errors.country?.message ?? null}
        </span>
      </div>

      <div>
        <label className="label-text" htmlFor="city">
          Ciudad (Opcional)
        </label>
        <input
          type="text"
          id="city"
          className={`input ${form.formState.errors.city ? "is-invalid" : ""}`}
          {...form.register("city")}
        />
        <span className="helper-text">
          {form.formState.errors.city?.message ?? null}
        </span>
      </div>

      <div>
        <label className="label-text" htmlFor="standNumber">
          Número de Stand
        </label>
        <input
          type="text"
          id="standNumber"
          className={`input ${form.formState.errors.standNumber ? "is-invalid" : ""}`}
          {...form.register("standNumber")}
        />
        <span className="helper-text">
          {form.formState.errors.standNumber?.message ?? null}
        </span>
      </div>

      <div>
        <label className="label-text" htmlFor="areaM2">
          Área (m²)
        </label>
        <input
          type="number"
          step="any"
          id="areaM2"
          className={`input ${form.formState.errors.areaM2 ? "is-invalid" : ""}`}
          min={0}
          {...form.register("areaM2", { valueAsNumber: true })}
        />
        <span className="helper-text">
          {form.formState.errors.areaM2?.message ?? null}
        </span>
      </div>

      <div>
        <label className="label-text" htmlFor="totalInvestment">
          Inversión Total
        </label>
        <input
          type="number"
          id="totalInvestment"
          className={`input ${form.formState.errors.totalInvestment ? "is-invalid" : ""}`}
          min={0}
          {...form.register("totalInvestment", { valueAsNumber: true })}
        />
        <span className="helper-text">
          {form.formState.errors.totalInvestment?.message ?? null}
        </span>
      </div>

      <div>
        <label className="label-text" htmlFor="logo">
          Logo de la feria
        </label>
        <input
          type="file"
          id="logo"
          className={`input ${form.formState.errors.logo ? "is-invalid" : ""}`}
          {...form.register("logo")}
          accept="image/png, image/jpeg, image/jpg"
        />
        <span className="helper-text">
          {form.formState.errors.logo?.message?.toString() || null}
        </span>
        <span className="helper-text">El tamaño máximo es de 5MB</span>
      </div>

      <div className="col-span-full">
        <SubmitButton>
          <Icon icon="tabler:plus" className="size-5" /> Crear Feria
        </SubmitButton>
      </div>
    </form>
  );
}
