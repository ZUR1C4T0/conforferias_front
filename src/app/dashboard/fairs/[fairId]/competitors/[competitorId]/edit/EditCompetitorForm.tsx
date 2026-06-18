"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type z from "zod";
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
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { schema } from "./form";
import { updateCompetitor } from "./updateCompetitor";

export default function EditCompetitorForm({
  fairId,
  competitor,
}: {
  fairId: string;
  competitor: Competitor;
}) {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      company: competitor.company,
      country: competitor.country,
      city: competitor.city,
      featuredProducts: competitor.featuredProducts,
      strengths: competitor.strengths,
      weaknesses: competitor.weaknesses,
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    const result = await updateCompetitor(fairId, competitor.id, data);
    if (result.success) {
      toast.success(result.message);
      router.push("./");
    } else {
      toast.error(result.message);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="@container">
      <FieldGroup className="grid @lg:grid-cols-2">
        <Field data-invalid={!!form.formState.errors.company}>
          <FieldLabel htmlFor="company">Nombre de la empresa</FieldLabel>
          <Input
            type="text"
            id="company"
            {...form.register("company")}
            aria-invalid={!!form.formState.errors.company}
          />
          <FieldError errors={[form.formState.errors.company]} />
        </Field>

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
              onBlur={() => form.trigger("country")}
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
            type="text"
            id="city"
            {...form.register("city")}
            aria-invalid={!!form.formState.errors.city}
          />
          <FieldError errors={[form.formState.errors.city]} />
        </Field>

        <Field
          className="col-span-full"
          data-invalid={!!form.formState.errors.featuredProducts}
        >
          <FieldLabel htmlFor="featuredProducts">
            Productos destacados
          </FieldLabel>
          <Textarea
            id="featuredProducts"
            {...form.register("featuredProducts")}
            aria-invalid={!!form.formState.errors.featuredProducts}
          />
          <FieldError errors={[form.formState.errors.featuredProducts]} />
        </Field>

        <Field data-invalid={!!form.formState.errors.strengths}>
          <FieldLabel htmlFor="strengths">Fortalezas</FieldLabel>
          <Textarea
            id="strengths"
            {...form.register("strengths")}
            aria-invalid={!!form.formState.errors.strengths}
          />
          <FieldError errors={[form.formState.errors.strengths]} />
        </Field>

        <Field data-invalid={!!form.formState.errors.weaknesses}>
          <FieldLabel htmlFor="weaknesses">Debilidades</FieldLabel>
          <Textarea
            id="weaknesses"
            {...form.register("weaknesses")}
            aria-invalid={!!form.formState.errors.weaknesses}
          />
          <FieldError errors={[form.formState.errors.weaknesses]} />
        </Field>

        <Field className="col-span-full">
          <Button type="submit" disabled={form.formState.isSubmitting}>
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
