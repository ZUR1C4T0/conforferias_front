"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { Notyf } from "notyf";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type z from "zod";
import countries from "@/assets/countries.json";
import { SubmitButton } from "@/components/SubmitButton";
import { useFlyonUI } from "@/hooks/useFlyonUI";
import { createCompetitor } from "./createCompetitor";
import { defaultValues, schema } from "./form";

export default function CreateCompetitorForm({ fairId }: { fairId: string }) {
  const { loaded } = useFlyonUI();
  const router = useRouter();
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
    const result = await createCompetitor(fairId, data);
    if (result.success) {
      notyf.success(result.message);
      router.push("../");
    } else {
      notyf.error(result.message);
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-4 md:grid-cols-2"
    >
      <div>
        <label htmlFor="company" className="label-text">
          Nombre de la competencia
        </label>
        <input
          type="text"
          id="company"
          className={`input ${form.formState.errors.company ? "is-invalid" : ""}`}
          {...form.register("company")}
        />
        <span className="helper-text">
          {form.formState.errors.company?.message}
        </span>
      </div>

      <div>
        <label htmlFor="country" className="label-text">
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
              placeholder="Buscar país..."
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
            style={{ display: "none" }}
            className="absolute z-50 max-h-44 w-full space-y-0.5 overflow-y-auto rounded-box bg-base-100 p-2 shadow-base-300/20 shadow-lg"
            data-combo-box-output
          >
            {countries.map((country) => (
              <div
                key={country}
                className="dropdown-item combo-box-selected:dropdown-active cursor-pointer"
                // biome-ignore lint/a11y/noNoninteractiveTabindex: is a combobox
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
          {form.formState.errors.country?.message}
        </span>
      </div>

      <div>
        <label htmlFor="city" className="label-text">
          Ciudad (Opcional)
        </label>
        <input
          type="text"
          id="city"
          className={`input ${form.formState.errors.city ? "is-invalid" : ""}`}
          {...form.register("city")}
        />
        <span className="helper-text">
          {form.formState.errors.city?.message}
        </span>
      </div>

      <div className="col-span-full">
        <label htmlFor="products" className="label-text">
          Productos destacados
        </label>
        <textarea
          id="products"
          className={`textarea ${form.formState.errors.featuredProducts ? "is-invalid" : ""}`}
          rows={5}
          {...form.register("featuredProducts")}
        />
        <span className="helper-text">
          {form.formState.errors.featuredProducts?.message}
        </span>
      </div>

      <div>
        <label htmlFor="strengths" className="label-text">
          Fortalezas
        </label>
        <textarea
          id="strengths"
          className={`textarea ${form.formState.errors.strengths ? "is-invalid" : ""}`}
          rows={3}
          {...form.register("strengths")}
        />
        <span className="helper-text">
          {form.formState.errors.strengths?.message}
        </span>
      </div>

      <div>
        <label htmlFor="weaknesses" className="label-text">
          Debilidades
        </label>
        <textarea
          id="weaknesses"
          className={`textarea ${form.formState.errors.weaknesses ? "is-invalid" : ""}`}
          rows={3}
          {...form.register("weaknesses")}
        />
        <span className="helper-text">
          {form.formState.errors.weaknesses?.message}
        </span>
      </div>

      <div className="col-span-full">
        <SubmitButton>
          <Icon icon="tabler:check" className="size-4" /> Guardar Competidor
        </SubmitButton>
      </div>
    </form>
  );
}
