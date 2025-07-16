"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { Notyf } from "notyf";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import countries from "@/assets/countries.json";
import { useFlyonUI } from "@/hooks/useFlyonUI";
import type { Profile } from "../../create/page";
import type { Contact } from "../page";
import { updateContact } from "./updateContact";

export const schema = z.object({
  name: z.string().nonempty("Nombre es obligatorio"),
  email: z.email("Email inválido").nonempty("Email es obligatorio"),
  phone: z.string().nonempty("Teléfono es obligatorio"),
  profileId: z.string().nonempty("Perfil es obligatorio"),
  otherProfile: z.string().nullable(),
  company: z.string().nullable(),
  companyNit: z.string().nullable(),
  country: z.string().nonempty("País es obligatorio"),
  city: z.string().nullable(),
  interestProducts: z.string().nullable(),
  estimatedPotential: z.enum(["BAJO", "MEDIO", "ALTO"]),
});

export default function EditContactForm({
  contact,
  profiles,
}: {
  contact: Contact;
  profiles: Profile[];
  fairId: string;
}) {
  const { loaded } = useFlyonUI();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      profileId: contact.profileId,
      otherProfile: contact.otherProfile,
      company: contact.company,
      companyNit: contact.companyNit,
      country: contact.country,
      city: contact.city,
      interestProducts: contact.interestProducts,
      estimatedPotential: contact.estimatedPotential as
        | "BAJO"
        | "MEDIO"
        | "ALTO",
    },
    mode: "onBlur",
  });

  const selectedProfileId = form.watch("profileId");
  const isOtherProfileSelected =
    profiles.find((p) => p.id === selectedProfileId)?.name === "Otros";

  // Configuración del combobox de países
  useEffect(() => {
    if (loaded) {
      const $combobox = document.getElementById("country-combobox");
      if (!$combobox) return;

      const combobox = window.HSComboBox.getInstance($combobox, true);
      combobox?.element.on("select", ({ country }: { country: string }) => {
        form.setValue("country", country);
      });
    }
  }, [loaded, form.setValue]);

  const onSubmit = async (data: z.infer<typeof schema>) => {
    const notyf = new Notyf();
    const result = await updateContact(contact.id, data);
    if (result.success) {
      notyf.success(result.message);
      router.push("./");
      router.refresh();
    } else {
      notyf.error(result.message);
    }
  };

  return (
    <div className="card card-border">
      <div className="card-body">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {/* Campos del formulario (similar al CreateContactForm) */}
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

          {/* Repetir para los demás campos... */}
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

          <div>
            <label htmlFor="country" className="label-text">
              País
            </label>
            <div
              id="country-combobox"
              className="relative"
              data-combo-box='{"minSearchLength":1}'
            >
              <div className="relative">
                <input
                  type="text"
                  id="country"
                  className={`input ${form.formState.errors.country ? "is-invalid" : ""}`}
                  placeholder="Buscar país..."
                  defaultValue={contact.country}
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
              {form.formState.errors.city?.message ?? null}
            </span>
          </div>

          <div className="col-span-full">
            <span className="mb-1 text-base text-base-content">
              Potencial estimado
            </span>
            <ul className="flex w-full flex-col divide-base-content/25 rounded-box border border-base-content/25 *:w-full *:cursor-pointer max-sm:divide-y sm:flex-row sm:divide-x">
              {(["BAJO", "MEDIO", "ALTO"] as const).map((potential) => (
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

          <div className="col-span-full">
            <label htmlFor="interestProducts" className="label-text">
              Productos de interés (Opcional)
            </label>
            <textarea
              id="interestProducts"
              className={`textarea ${form.formState.errors.interestProducts ? "is-invalid" : ""}`}
              rows={3}
              {...form.register("interestProducts")}
            />
            <span className="helper-text">
              {form.formState.errors.interestProducts?.message}
            </span>
          </div>

          <div className="col-span-full flex justify-end gap-2">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!form.formState.isDirty || form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                <>
                  <Icon icon="tabler:check" className="size-5" /> Guardar
                  Cambios
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
