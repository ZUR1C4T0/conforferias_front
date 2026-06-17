"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import countries from "@/assets/countries.json";
import { Button } from "@/components/ui/button";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Amount, AmountLabels, Potential } from "@/lib/constants";
import type { Profile } from "../../create/page";
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
  estimatedPotential: z.enum(Potential),
  amount: z.enum(Amount).optional().nullable(),
});

export default function EditContactForm({
  contact,
  profiles,
}: {
  contact: Contact;
  profiles: Profile[];
  fairId: string;
}) {
  const router = useRouter();
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
  const form = useForm({
    resolver: zodResolver(superSchema),
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
      estimatedPotential: contact.estimatedPotential as Potential,
      amount: (contact.sale?.amount as Amount | null) ?? null,
    },
    mode: "onBlur",
  });

  const selectedProfileId = form.watch("profileId");
  const isOtherProfileSelected =
    profiles.find((p) => p.id === selectedProfileId)?.name === "Otros";

  const onSubmit = async (data: z.infer<typeof schema>) => {
    const result = await updateContact(contact.fairId, contact.id, data);
    if (result.success) {
      toast.success(result.message);
      router.push("./");
      router.refresh();
    } else {
      toast.error(result.message);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="@Container">
      <FieldGroup>
        <FieldSet>
          <FieldLegend>Información básica</FieldLegend>
          <FieldGroup className="grid @lg:grid-cols-2">
            <Field data-invalid={!!form.formState.errors.name}>
              <FieldLabel htmlFor="name">Nombre completo</FieldLabel>
              <Input
                type="text"
                id="name"
                {...form.register("name")}
                aria-invalid={!!form.formState.errors.name}
              />
              <FieldError errors={[form.formState.errors.name]} />
            </Field>

            <Field data-invalid={!!form.formState.errors.email}>
              <FieldLabel htmlFor="email">Correo electrónico</FieldLabel>
              <Input
                type="email"
                id="email"
                {...form.register("email")}
                aria-invalid={!!form.formState.errors.email}
              />
              <FieldError errors={[form.formState.errors.email]} />
            </Field>

            <Field data-invalid={!!form.formState.errors.phone}>
              <FieldLabel htmlFor="phone">Número de teléfono</FieldLabel>
              <Input
                type="tel"
                id="phone"
                {...form.register("phone")}
                aria-invalid={!!form.formState.errors.phone}
              />
              <FieldError errors={[form.formState.errors.phone]} />
            </Field>
          </FieldGroup>
        </FieldSet>

        <FieldSeparator />

        <FieldSet>
          <FieldLegend>Información profesional</FieldLegend>
          <FieldGroup className="grid @lg:grid-cols-2">
            <Field data-invalid={!!form.formState.errors.profileId}>
              <FieldLabel htmlFor="profile">Perfil</FieldLabel>
              <Select
                value={form.watch("profileId")}
                onValueChange={(value) =>
                  form.setValue("profileId", value, {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }
              >
                <SelectTrigger id="profile">
                  <SelectValue placeholder="Seleccione un perfil" />
                </SelectTrigger>
                <SelectContent>
                  {profiles.map((profile) => (
                    <SelectItem key={profile.id} value={profile.id}>
                      {profile.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldError errors={[form.formState.errors.profileId]} />
            </Field>

            <Field data-invalid={!!form.formState.errors.otherProfile}>
              <FieldLabel htmlFor="otherProfile">
                Especifique el perfil
              </FieldLabel>
              <Input
                type="text"
                id="otherProfile"
                disabled={!isOtherProfileSelected}
                {...form.register("otherProfile")}
                aria-invalid={!!form.formState.errors.otherProfile}
              />
              <FieldError errors={[form.formState.errors.otherProfile]} />
            </Field>

            <Field data-invalid={!!form.formState.errors.company}>
              <FieldLabel htmlFor="company">Empresa (Opcional)</FieldLabel>
              <Input
                type="text"
                id="company"
                {...form.register("company")}
                aria-invalid={!!form.formState.errors.company}
              />
              <FieldError errors={[form.formState.errors.company]} />
            </Field>

            <Field data-invalid={!!form.formState.errors.companyNit}>
              <FieldLabel htmlFor="companyNit">
                NIT de la empresa (Opcional)
              </FieldLabel>
              <Input
                type="text"
                id="companyNit"
                {...form.register("companyNit")}
                aria-invalid={!!form.formState.errors.companyNit}
              />
              <FieldError errors={[form.formState.errors.companyNit]} />
            </Field>
          </FieldGroup>
        </FieldSet>

        <FieldSeparator />

        <FieldSet>
          <FieldLegend>Información de ubicación</FieldLegend>
          <FieldGroup className="grid @lg:grid-cols-2">
            <Field data-invalid={!!form.formState.errors.country}>
              <FieldLabel htmlFor="country">País</FieldLabel>
              <Combobox
                items={countries}
                value={form.watch("country")}
                onValueChange={(value) =>
                  form.setValue("country", value ?? "", {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }
                autoHighlight
              >
                <ComboboxInput
                  id="country"
                  placeholder="Seleccione un país"
                  aria-invalid={!!form.formState.errors.country}
                  showClear
                />
                <ComboboxContent>
                  <ComboboxEmpty>No se encontraron resultados...</ComboboxEmpty>
                  <ComboboxList>
                    {(country) => (
                      <ComboboxItem key={country} value={country}>
                        {country}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
              <FieldError errors={[form.formState.errors.country]} />
            </Field>

            <Field data-invalid={!!form.formState.errors.city}>
              <FieldLabel htmlFor="city">Ciudad (Opcional)</FieldLabel>
              <Input
                id="city"
                type="text"
                {...form.register("city")}
                aria-invalid={!!form.formState.errors.city}
              />
              <FieldError errors={[form.formState.errors.city]} />
            </Field>
          </FieldGroup>
        </FieldSet>

        <FieldSeparator />

        <FieldSet>
          <FieldLegend>Potencial y negociación</FieldLegend>
          <FieldGroup>
            <Field data-invalid={!!form.formState.errors.estimatedPotential}>
              <FieldLabel>Potencial estimado</FieldLabel>
              <RadioGroup
                className="@sm:grid-cols-3"
                value={form.watch("estimatedPotential")}
                onValueChange={(value) =>
                  form.setValue("estimatedPotential", value as Potential, {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }
              >
                {Object.values(Potential).map((potential) => (
                  <FieldLabel
                    key={potential}
                    htmlFor={`potential-${potential}`}
                  >
                    <Field orientation="horizontal">
                      <FieldContent>{potential}</FieldContent>
                      <RadioGroupItem
                        value={potential}
                        id={`potential-${potential}`}
                        aria-invalid={
                          !!form.formState.errors.estimatedPotential
                        }
                      />
                    </Field>
                  </FieldLabel>
                ))}
              </RadioGroup>
              <FieldError errors={[form.formState.errors.estimatedPotential]} />
            </Field>

            <Field data-invalid={!!form.formState.errors.amount}>
              <FieldLabel htmlFor="amount">
                Valor estimado de la negociación (Opcional)
              </FieldLabel>
              <RadioGroup
                className="@md:grid-cols-2"
                value={form.watch("amount")}
                onValueChange={(value) =>
                  form.setValue("amount", value as Amount, {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }
              >
                {Object.values(Amount).map((amount) => (
                  <FieldLabel key={amount} htmlFor={`amount-${amount}`}>
                    <Field orientation="horizontal">
                      <FieldContent>
                        <FieldTitle>{AmountLabels[amount]}</FieldTitle>
                        <FieldDescription>{amount}</FieldDescription>
                      </FieldContent>
                      <RadioGroupItem
                        id={`amount-${amount}`}
                        value={amount}
                        aria-invalid={!!form.formState.errors.amount}
                      />
                    </Field>
                  </FieldLabel>
                ))}
              </RadioGroup>
              <FieldError errors={[form.formState.errors.amount]} />
            </Field>
          </FieldGroup>
        </FieldSet>

        <Field>
          <Button
            type="submit"
            disabled={!form.formState.isDirty || form.formState.isSubmitting}
          >
            {form.formState.isSubmitting && (
              <Spinner data-icon="inline-start" />
            )}
            Guardar cambios
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
