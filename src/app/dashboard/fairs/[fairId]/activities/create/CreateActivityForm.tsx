"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type z from "zod";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import type { ActivityType } from "@/lib/constants";
import { createActivity } from "./createActivity";
import { defaultValues, schema } from "./form";

const activityTypeMap: Record<
  "CHARLA_TECNICA" | "RUEDA_DE_NEGOCIOS" | "OTRO",
  string
> = {
  CHARLA_TECNICA: "Charla técnica",
  RUEDA_DE_NEGOCIOS: "Rueda de negocios",
  OTRO: "Otro",
};

export default function CreateActivityForm({ fairId }: { fairId: string }) {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onSubmit",
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    if (!fairId) return;
    const result = await createActivity(fairId, data);
    if (result.success) {
      toast.success(result.message);
      router.push("../");
    } else {
      toast.error(result.message);
    }
  };

  return (
    <form className="@container" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Field data-invalid={!!form.formState.errors.type}>
          <FieldLabel>Tipo de actividad</FieldLabel>
          <RadioGroup
            className="grid @lg:grid-cols-3"
            value={form.watch("type")}
            onValueChange={(value) =>
              form.setValue("type", value as ActivityType, {
                shouldValidate: true,
                shouldDirty: true,
              })
            }
          >
            {Object.entries(activityTypeMap).map(([key, value]) => (
              <FieldLabel
                key={key}
                htmlFor={`type-${key}`}
                className="cursor-pointer"
              >
                <Field orientation="horizontal">
                  <FieldContent>
                    <FieldTitle className="font-normal text-base">
                      {value}
                    </FieldTitle>
                  </FieldContent>
                  <RadioGroupItem
                    value={key}
                    id={`type-${key}`}
                    aria-invalid={!!form.formState.errors.type}
                  />
                </Field>
              </FieldLabel>
            ))}
          </RadioGroup>
          <FieldError errors={[form.formState.errors.type]} />
        </Field>

        <Field data-invalid={!!form.formState.errors.description}>
          <FieldLabel htmlFor="description">Descripción</FieldLabel>
          <Textarea
            id="description"
            placeholder="Describa la actividad realizada..."
            {...form.register("description")}
            aria-invalid={!!form.formState.errors.description}
          />
          <FieldError errors={[form.formState.errors.description]} />
        </Field>

        <Field data-invalid={!!form.formState.errors.attendees}>
          <FieldLabel htmlFor="attendees">
            ¿Cuántos asistieron? (Opcional)
          </FieldLabel>
          <Input
            type="number"
            id="attendees"
            placeholder="Ej. 8"
            {...form.register("attendees", { valueAsNumber: true })}
            aria-invalid={!!form.formState.errors.attendees}
          />
          <FieldError errors={[form.formState.errors.attendees]} />
        </Field>

        <Field>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && (
              <Spinner data-icon="inline-start" />
            )}
            Guardar
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
