"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { useParams } from "next/navigation";
import { Notyf } from "notyf";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import countries from "@/assets/countries.json";
import { SubmitButton } from "@/components/SubmitButton";
import { useFlyonUI } from "@/hooks/useFlyonUI";
import { Amount, AmountLabels, Potential } from "@/lib/constants";
import { createContact } from "../actions/createContact";
import type { Profile } from "../page";

export const schema = z.object({
  name: z.string().nonempty("Nombre es obligatorio"),
  email: z
    .email("Formato de correo inválido")
    .nonempty("Correo es obligatorio"),
  phone: z.string().nonempty("Teléfono es obligatorio"),
  profileId: z.string().nonempty("Perfil es obligatorio"),
  otherProfile: z.string().nullable(),
  company: z.string().nullable(),
  companyNit: z.string().nullable(),
  country: z.string().nonempty("País es obligatorio"),
  city: z.string().nullable(),
  estimatedPotential: z.enum(Potential),
  amount: z.enum(Amount).optional().nullable(),
});

export default function CreateContactForm({
  profiles,
}: {
  profiles: Profile[];
}) {
  const { loaded } = useFlyonUI();
  const { fairId } = useParams();
  const superSchema = schema.refine(
    (data) => {
      const otherProfile = profiles.find((p) => p.name === "Otros");
      if (data.profileId === otherProfile?.id && !data.otherProfile) {
        return false;
      }
      return true;
    },
    {
      message: "Debe especificar el perfil si selecciona 'Otros'",
      path: ["otherProfile"],
    },
  );
  const defaultValues: z.infer<typeof superSchema> = {
    name: "",
    email: "",
    phone: "",
    profileId: "",
    otherProfile: null,
    company: null,
    companyNit: null,
    country: "",
    city: null,
    estimatedPotential: Potential.BAJO,
    amount: null,
  };

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onBlur",
  });

  useEffect(() => {
    if (loaded) {
      const $combobox = document.getElementById("combobox");
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

  const selectedProfileId = form.watch("profileId");
  const isOtherProfileSelected =
    profiles.find((p) => p.id === selectedProfileId)?.name === "Otros";

  const onSubmit = async (data: z.infer<typeof schema>) => {
    const notyf = new Notyf();
    if (typeof fairId !== "string") {
      return notyf.error("Parametro 'fairId' inválido");
    }
    const created = await createContact(fairId, data);
    if (!created) {
      return notyf.error("Error al crear el contacto");
    }
    form.reset();
    notyf.success("Contacto creado exitosamente");
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
    >
      <div className="col-span-full">
        <h2 className="font-semibold text-base-content/60 text-xl">
          Información básica
        </h2>
      </div>

      <div>
        <label htmlFor="name" className="label-text">
          Nombre completo
        </label>
        <input
          type="text"
          id="name"
          className={`input ${form.formState.errors.name ? "is-invalid" : ""}`}
          {...form.register("name")}
        />
        <span className="helper-text">
          {form.formState.errors.name?.message}
        </span>
      </div>

      <div>
        <label htmlFor="email" className="label-text">
          Correo electrónico
        </label>
        <input
          type="email"
          id="email"
          className={`input ${form.formState.errors.email ? "is-invalid" : ""}`}
          {...form.register("email")}
        />
        <span className="helper-text">
          {form.formState.errors.email?.message}
        </span>
      </div>

      <div>
        <label htmlFor="phone" className="label-text">
          Número de teléfono
        </label>
        <input
          type="tel"
          id="phone"
          className={`input ${form.formState.errors.phone ? "is-invalid" : ""}`}
          {...form.register("phone")}
        />
        <span className="helper-text">
          {form.formState.errors.phone?.message}
        </span>
      </div>

      <div className="col-span-full">
        <h2 className="font-semibold text-base-content/60 text-xl">
          Información Profecional
        </h2>
      </div>

      <div>
        <label htmlFor="profile" className="label-text">
          Perfil
        </label>
        <select
          id="profile"
          className={`select ${form.formState.errors.profileId ? "is-invalid" : ""}`}
          {...form.register("profileId")}
        >
          <option value="" disabled>
            Seleccione un perfil
          </option>
          {profiles.map((profile) => (
            <option key={profile.id} value={profile.id}>
              {profile.name}
            </option>
          ))}
        </select>
        <span className="helper-text">
          {form.formState.errors.profileId?.message}
        </span>
      </div>

      {isOtherProfileSelected && (
        <div>
          <label htmlFor="otherProfile" className="label-text">
            Especifique el perfil
          </label>
          <input
            type="text"
            id="otherProfile"
            className={`input ${form.formState.errors.otherProfile ? "is-invalid" : ""}`}
            {...form.register("otherProfile")}
          />
          <span className="helper-text">
            {form.formState.errors.otherProfile?.message}
          </span>
        </div>
      )}

      <div>
        <label htmlFor="company" className="label-text">
          Empresa (Opcional)
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
        <label htmlFor="companyNit" className="label-text">
          NIT de la empresa (Opcional)
        </label>
        <input
          type="text"
          id="companyNit"
          className={`input ${form.formState.errors.companyNit ? "is-invalid" : ""}`}
          {...form.register("companyNit")}
        />
        <span className="helper-text">
          {form.formState.errors.companyNit?.message}
        </span>
      </div>

      <div className="col-span-full">
        <h2 className="font-semibold text-base-content/60 text-xl">
          Información de ubicación
        </h2>
      </div>

      <div>
        <label htmlFor="country" className="label-text">
          País
        </label>
        <div
          id="combobox"
          className="relative"
          data-combo-box='{"minSearchLength":1, "outputEmptyTemplate": "<div class=\"dropdown-item\">No se encontraron resultados...</div>"}'
        >
          <div className="relative">
            <input
              type="text"
              id="country"
              className={`input ${form.formState.errors.country ? "is-invalid" : ""}`}
              placeholder="Buscar país..."
              {...form.register("country")}
              data-combo-box-input
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

      <div className="col-span-full">
        <h2 className="font-semibold text-base-content/60 text-xl">
          Potencial y negociación
        </h2>
      </div>

      <div className="col-span-full">
        <span className="mb-1 text-base text-base-content">
          Potencial estimado
        </span>
        <ul className="flex w-full flex-col divide-base-content/25 rounded-box border border-base-content/25 *:w-full *:cursor-pointer max-sm:divide-y sm:flex-row sm:divide-x">
          {Object.values(Potential).map((potential) => (
            <li key={potential}>
              <label className="flex cursor-pointer items-center gap-2 p-3 hover:bg-base-content/5 active:bg-base-content/10">
                <input
                  type="radio"
                  className="radio radio-primary ms-3"
                  value={potential}
                  {...form.register("estimatedPotential")}
                />
                <span className="label-text text-base">{potential}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="col-span-full mt-4">
        <span className="mb-1 text-base text-base-content">
          Valor estimado de la negociación (Opcional)
        </span>
        <ul className="flex w-full flex-col divide-base-content/25 rounded-box border border-base-content/25 *:w-full *:cursor-pointer max-sm:divide-y sm:flex-row sm:divide-x">
          {Object.values(Amount).map((amount) => (
            <li key={amount}>
              <label className="flex cursor-pointer items-center gap-2 p-3 hover:bg-base-content/5 active:bg-base-content/10">
                <input
                  type="radio"
                  className="radio radio-primary ms-3"
                  value={amount}
                  {...form.register("amount")}
                />
                <span className="label-text text-base">
                  {AmountLabels[amount]}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="col-span-full">
        <SubmitButton>Crear contacto</SubmitButton>
      </div>
    </form>
  );
}
